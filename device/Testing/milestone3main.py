import cv2
# from videoget import VideoGet
import numpy as np
import helperfuncs as hf
import socket
import errno
from listener import Listener
import time

cap = cv2.VideoCapture(r'project-watchit\device\model\car_Trim.mp4')
# cap = VideoGet(r'project-watchit\device\model\car_Trim.mp4')
# wrt = VideoPut('outpult.avi') 

host = "192.168.86.23"
port = 8080

s = socket.socket(socket.AF_INET,
            socket.SOCK_STREAM)

s.connect((host,port))
s.setblocking(False)

temp = Listener(s)
"""
Thread read frames 
While Loop
    if not record:
        Open Socket
        Object Detection
        returns record if detected
    if record:
        
"""

"""
Thread socket connection?   


"""

#Read in labels for model and assign them a color for bounding boxes. 
LABELS = hf.filesplit(r'project-watchit\device\model\coco.txt')
if not LABELS:
    exit(1)

min_confidence = 0.6

fourcc = cv2.VideoWriter_fourcc(*"MJPG")
writer = cv2.VideoWriter("output.avi", fourcc, 30, (1280, 720))

net = cv2.dnn.readNetFromDarknet(r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.cfg', 
                                r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.weights')

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

ln = net.getUnconnectedOutLayersNames()

(W, H) = (None, None)

start = time.time()

i = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    if i >= 10:   
        i = 0
        # if the frame dimensions are empty, grab them
        if W is None or H is None:
            (H, W) = frame.shape[:2]

        # construct a blob from the input frame and then perform a forward
        # pass of the YOLO object detector
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320),
            swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        # loop over each of the layer outputs
        for output in layerOutputs:
            one_class = set()
            # loop over each of the detections
            for detection in output:
                # extract the class ID and confidence (i.e., probability)
                # of the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # filter out weak predictions by ensuring the detected
                # probability is greater than the minimum probability
                if confidence > min_confidence and classID not in one_class:
                    one_class.add(classID)
                    #send message to Pi
                    s.send(LABELS[classID].encode())

    # if i >= 30:
    #     i = 0
    #     try:
    #         msg = s.recv(1024).decode()
    #     except socket.error as e:
    #         err = e.args[0]
    #         if err == errno.EAGAIN or err == errno.EWOULDBLOCK:
    #             print('No data available')
    #             continue
    #         else:
    #             # a "real" error occurred
    #             print(e)
    #             exit(1)
    #     else:
    #         # got a message, do something :)   
    #         # if not writer and msg == 'Record':
    #         if msg == 'Record':
    #             print("Received")

    temp.start()

    if temp.record:
        start = time.time()
        while time.time() - start < 5:
            ret, frame = cap.read()
            writer.write(frame)
            cv2.imshow('frame', frame)
            cv2.waitKey(1)
        temp.record = False
        break

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    i += 1

temp.stop()
s.close()
writer.release()
cap.release()
cv2.destroyAllWindows()