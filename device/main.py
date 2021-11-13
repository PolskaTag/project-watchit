import cv2
import numpy as np
import helperfuncs as hf
import socket
from listener import Listener
import time

# cap = cv2.VideoCapture(r'project-watchit\device\model\car_Trim.mp4')

# cap = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
#                     encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! nvh264dec ! \
#                         videoconvert ! appsink', cv2.CAP_GSTREAMER)

cap = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
    payload=(int)96" ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink' , cv2.CAP_GSTREAMER)

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

host = "192.168.86.23"
port = 8080

s = socket.socket(socket.AF_INET,
            socket.SOCK_STREAM)

s.connect((host,port))
s.setblocking(False)

temp = Listener(s)

LABELS = hf.filesplit(r'project-watchit\device\model\coco.txt')
if not LABELS:
    exit(1)

min_confidence = 0.6

fourcc = cv2.VideoWriter_fourcc(*"MJPG")
writer = cv2.VideoWriter("output.avi", fourcc, 30, (frame_width, frame_height))

net = cv2.dnn.readNetFromDarknet(r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.cfg', 
                                r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.weights')

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

ln = net.getUnconnectedOutLayersNames()

start = time.time()

# record = False

i = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)

    if i >= 10:
        i = 0
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

    temp.start()

    if temp.record:
        frames = 0
        print("Recording")
        while frames < 60:
            print(frames)
            ret, frame = cap.read()
            writer.write(frame)
            cv2.imshow('frame', frame)
            cv2.waitKey(1)
            frames += 1
        temp.record = False
        
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    i += 1

writer.release()
temp.stop()
s.close()
cap.release()
cv2.destroyAllWindows()