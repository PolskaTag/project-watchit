import cv2
import numpy as np
import helperfuncs as hf
from listener import Listener
import threading
import video_upload as vu
import os

# cap = cv2.VideoCapture(r'project-watchit\device\model\car_Trim.mp4')

# cap = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
#                     encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! nvh264dec ! \
#                         videoconvert ! appsink', cv2.CAP_GSTREAMER)

cap = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
    payload=(int)96" ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink' , cv2.CAP_GSTREAMER)

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

#Startup sockets to communicate to and from Pi
s = hf.startup_socket()
temp = Listener(s)

#Generate the labels associated with object
LABELS = hf.filesplit(r'project-watchit\device\model\coco.txt')
if not LABELS:
    exit(1)
#Set confidence required to send message and count obtains the highest current videoID
min_confidence = 0.6
count = hf.video_count() + 1

fourcc = cv2.VideoWriter_fourcc(*"mp4v")
writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))

net = hf.setupmodel()
ln = net.getUnconnectedOutLayersNames()

frame_cnt = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)

    #Object detection on every 10th frame
    if frame_cnt >= 10:
        frame_cnt = 0
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320),
            swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        for output in layerOutputs:
            one_class = set()
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                if confidence > min_confidence and classID not in one_class:
                    one_class.add(classID)
                    s.send(LABELS[classID].encode())

    #Listens for messages from the Pi, if record command is received then the commands will execute
    temp.start()
    if temp.record:
        hf.recordvideo(cap, writer)
        #Can pass in user name after count
        threading.Thread(target=vu.upload_video, args=(count,)).start()
        count += 1
        writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))
        temp.record = False
        
    #Push q to exit program
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    frame_cnt += 1

writer.release()

# Remove extra file created by function
os.remove(f'output{count}.mp4')

temp.stop()
s.close()
cap.release()
cv2.destroyAllWindows()