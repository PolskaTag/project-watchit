import cv2
import numpy as np
import helperfuncs as hf
import pifuncs as pf
import threading
from collections import defaultdict
from multiprocessing import Process
import video_upload as vu
import os

cap = cv2.VideoCapture(0)

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
# print(f"FPS: {cap.get(5)}")

# # Generate the labels associated with object
LABELS = hf.filesplit('project-watchit/device/model/coco.txt')
if not LABELS:
    exit(1)

# # Set confidence required to send message and count obtains the highest current videoID
min_confidence = 0.6
count = 3001

fourcc = cv2.VideoWriter_fourcc(*"avc1")
writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))

net = cv2.dnn.readNetFromDarknet('project-watchit/device/model/yolov4-tiny.cfg', 'project-watchit/device/model/yolov4-tiny.weights')
ln = net.getUnconnectedOutLayersNames()

person = False

frame_cnt = 0

actions = defaultdict(list)
actions['person'].append((pf.intruder,))

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)

    # Object detection on every 10th frame
    if frame_cnt >= 30:
        frame_cnt = 0
        print("Processing")
        # ml = Process(target=hf.objectdetection, args=(frame, net, ln, LABELS, ))
        # ml.start()
        # ml.join()
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320),
            swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        # one_class = set()
        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # if confidence > min_confidence and classID not in one_class:
                if confidence > min_confidence:
                    # one_class.add(classID)
                    if LABELS[classID] == 'person':
                        person =True

    if person:
        hf.recordvideo(cap, writer)
    # Can pass in user name after count
        Process(target=vu.upload_video, args=(count,)).start()
        Process(target=pf.dofuncts, args=(actions['person'],)).start()
        # uploader = Process(target=vu.upload_video, args=(count,))
        # uploader.start()
        count += 1
        writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))
        person = False

    # Push q to exit program
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    frame_cnt += 1

writer.release()

# Remove extra file created by function
os.remove(f'output{count}.mp4')

cap.release()
cv2.destroyAllWindows()