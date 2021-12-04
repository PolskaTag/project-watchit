import cv2
import time
import os
import numpy as np
# from threading import Thread
# from video_upload import upload_video
import wcamera as wc
import time

with open(r'project-watchit\device\model\coco.txt', 'r') as f:
   class_names = f.read().split('\n')

colors = np.random.uniform(0, 255, size=(len(class_names), 3))

# model = cv2.dnn.readNet(model=r'project-watchit\device\\model\saved_model.pb', 
#     config=r'project-watchit\device\\model\ssd_mobilenet_v2_coco_2018_03_29.pbtxt', framework='TensorFlow')

model = cv2.dnn.readNetFromDarknet(r'project-watchit\device\model\yolov4-p6.cfg', r'project-watchit\device\model\yolov4-p6.weights')

model.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
model.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# Create a VideoCapture object
cap = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
    payload=(int)96" ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink' , cv2.CAP_GSTREAMER)

# cap = cv2.VideoCapture(r'project-watchit\device\model\car.mp4')

ln = model.getUnconnectedOutLayersNames()

# ln2 = model.getLayerNames()
# ln2 = [ln[i - 1] for i in model.getUnconnectedOutLayers()]
# print(ln)
# print(ln2)
# exit(0)

# cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
# cap.set(cv2.CAP_PROP_FPS, 15)

min_confidence_score = 0.4
min_threshold = 0.2

# Check if camera opened successfully
if not cap:
  exit(1)

# Default resolutions of the frame are obtained.The default resolutions are system dependent.
# We convert the resolutions from float to integer.
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
fps = 10

start_count = count = 1
record = False
start = time.time()

# Define the codec and create VideoWriter object.The output is stored in 'output{count}.avi' file.
out = cv2.VideoWriter(f'output{count}.avi',cv2.VideoWriter_fourcc('M','J','P','G'), fps, (frame_width,frame_height))

# initialize our lists of detected bounding boxes, confidences, and
# class IDs, respectively
boxes = []
confidences = []
classIDs = []

while(True):
    ret, frame = cap.read()
    
    if ret == True: 

        imgHeight, imgWidth, channels = frame.shape

        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (1280, 1280), swapRB=True, crop=False)

        # # Set input to the model
        model.setInput(blob)

        # # Make forward pass in model
        layeredoutputs = model.forward(ln)

        # loop over each of the layer outputs
        for output in layeredoutputs:
            # loop over each of the detections
            for detection in output:
                # extract the class ID and confidence (i.e., probability) of
                # the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # filter out weak predictions by ensuring the detected
                # probability is greater than the minimum probability
                if confidence > min_confidence_score:
                    # scale the bounding box coordinates back relative to the
                    # size of the image, keeping in mind that YOLO actually
                    # returns the center (x, y)-coordinates of the bounding
                    # box followed by the boxes' width and height
                    box = detection[0:4] * np.array([imgWidth, imgHeight, imgWidth, imgHeight])
                    (centerX, centerY, width, height) = box.astype("int")
                    # use the center (x, y)-coordinates to derive the top and
                    # and left corner of the bounding box
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))
                    # update our list of bounding box coordinates, confidences,
                    # and class IDs
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)
        
        # apply non-maxima suppression to suppress weak, overlapping
        # bounding boxes
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence_score, min_threshold)
        # ensure at least one detection exists
        if len(idxs) > 0:
            # loop over the indexes we are keeping
            for i in idxs.flatten():
                # extract the bounding box coordinates
                (x, y) = (boxes[i][0], boxes[i][1])
                (w, h) = (boxes[i][2], boxes[i][3])
                # draw a bounding box rectangle and label on the frame
                color = [int(c) for c in colors[classIDs[i]]]
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                text = "{}: {:.4f}".format(class_names[classIDs[i]],
                    confidences[i])
                cv2.putText(frame, text, (x, y - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
                    
        # Display the resulting frame    
        cv2.imshow('frame',frame)




        key = cv2.waitKey(1)

        # Press spacebar to start recording and q to quit
        if key & 0xFF == 32:
            start = time.time()
            record = True
        elif key & 0xFF == ord('q'):
            break
            
        # Record for ten seconds then upload to S3 and update databases
        if time.time() - start > 10 and record:
        #   Thread(target=upload_video, args=(count, )).start()
          count += 1
          out = cv2.VideoWriter(f'output{count}.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 10, (frame_width,frame_height))
          record = False

        # Write the frame into the file 'output.avi'
        if record:
            out.write(frame)

    # Break the loop
    else:
        break 

# When everything done, release the video capture and video write objects
cap.release()
out.release()

# Closes all the frames
cv2.destroyAllWindows()

# Remove extra file created by function
os.remove(f'output{count}.avi')