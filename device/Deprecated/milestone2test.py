# import the necessary packages
import numpy as np
import cv2
from threading import Thread
import helperfuncs as hf
import socket
import errno
import time

#Setup sockets for communication with Pi
s = hf.gen_sock()
s.setblocking(False)
if not s:
    print("Unable to establish connection.")
    exit(1)

#Read in labels for model and assign them a color for bounding boxes. 
LABELS = hf.filesplit(r'project-watchit\device\model\coco.txt')
if not LABELS:
    exit(1)

COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),
	dtype="uint8")

min_confidence = 0.6
min_threshold = 0.6

net = cv2.dnn.readNetFromDarknet(r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.cfg', 
                                r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.weights')

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

ln = net.getUnconnectedOutLayersNames()

# vs = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
#                     payload=(int)96" ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink' , cv2.CAP_GSTREAMER)

vs = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
                    encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! nvh264dec ! \
                        videoconvert ! appsink', cv2.CAP_GSTREAMER)

fourcc = cv2.VideoWriter_fourcc(*"MJPG")
writer = cv2.VideoWriter("output.avi", fourcc, 10, (1280, 1280))

# writer = None
record = False
(W, H) = (None, None)
frame_count = 0

# start = time.time()
end_time = time.time()

# loop over frames from the video file stream
while True:
    # read the next frame from the file
    grabbed, frame = vs.read()
    
    # if the frame was not grabbed, then we have reached the end
    # of the stream
    if not grabbed:
        break

    frame_count += 1

    if frame_count == 3:
        frame_count = 0

        # if the frame dimensions are empty, grab them
        if W is None or H is None:
            (H, W) = frame.shape[:2]

        # construct a blob from the input frame and then perform a forward
        # pass of the YOLO object detector, giving us our bounding boxes
        # and associated probabilities
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320),
            swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        # initialize our lists of detected bounding boxes, confidences,
        # and class IDs, respectively
        boxes = []
        confidences = []
        classIDs = []
        # loop over each of the layer outputs
        for output in layerOutputs:
            # loop over each of the detections
            for detection in output:
                # extract the class ID and confidence (i.e., probability)
                # of the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # filter out weak predictions by ensuring the detected
                # probability is greater than the minimum probability
                if confidence > min_confidence:
                    #send message to Pi
                    # s.send(LABELS[classIDs[i]].encode())
                    # scale the bounding box coordinates back relative to
                    # the size of the image, keeping in mind that YOLO
                    # actually returns the center (x, y)-coordinates of
                    # the bounding box followed by the boxes' width and
                    # height
                    box = detection[0:4] * np.array([W, H, W, H])
                    (centerX, centerY, width, height) = box.astype("int")
                    # use the center (x, y)-coordinates to derive the top
                    # and and left corner of the bounding box
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))
                    # update our list of bounding box coordinates,
                    # confidences, and class IDs
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)
        # apply non-maxima suppression to suppress weak, overlapping
        # bounding boxes
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, min_threshold)
        # ensure at least one detection exists
        if len(idxs) > 0:
            # loop over the indexes we are keeping
            for i in idxs.flatten():
                # extract the bounding box coordinates
                (x, y) = (boxes[i][0], boxes[i][1])
                (w, h) = (boxes[i][2], boxes[i][3])
                # draw a bounding box rectangle and label on the frame
                color = [int(c) for c in COLORS[classIDs[i]]]
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                text = f"{LABELS[classIDs[i]]}: {confidences[i]:.4f}"
                cv2.putText(frame, text, (x, y - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
                # Thread(target=s.send, args=(LABELS[classIDs[i]].encode(), )).start()
                # if LABELS[classIDs[i]] == "banana":
                #     Thread(target=send_message).start()

    if not record:
        try:
            msg = s.recv(1024).decode()
        except socket.error as e:
            err = e.args[0]
            if err == errno.EAGAIN or err == errno.EWOULDBLOCK:
                print('No data available')
                continue
            else:
                # a "real" error occurred
                print(e)
                exit(1)
        else:
            # got a message, do something :)   
            # if not writer and msg == 'Record':
            if msg == 'Record':
                record = True
                
    # if record:
    #     start = time.time()
    #     #Stay within this loop and read frames this way.
    #     #If statemen within main function to check instead
    #     while time.time() - start < 10:
    #         ret, frame = vs.read()
    #         writer.write(frame)
    #         cv2.imshow('frame',frame)
    #         cv2.waitKey(1)
    #     record = False

    cv2.imshow('frame',frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# s.close()
writer.release()
vs.release()

    # if record:
    #     start = time.time()
    #     while time.time() - start < 10:
    #     # initialize our video writer
    #         fourcc = cv2.VideoWriter_fourcc(*"MJPG")
    #         writer = cv2.VideoWriter("output.avi", fourcc, 10,
    #             (frame.shape[1], frame.shape[0]), True)
    #     # some information on processing single frame
    #     # write the output frame to disk
    #         cv2.imshow('frame',frame)
    #         writer.write(frame)
    #     record = False