import cv2
import numpy as np
import helperfuncs as hf
import pifuncs as pf
import threading
from collections import defaultdict
from multiprocessing import Process
import multiprocessing as mp
import video_upload as vu
import os
import getpass
import requests


domain = 'http://18.207.245.254:5000'

connected = False

while connected is False:
    
    userName = input("Enter your User Name: ")
    if userName == "exit":
        exit()
    passWord = getpass.getpass()
    loginAttempt = {'username': userName, 'password': passWord}

    login = requests.post(f'{domain}/login', json = loginAttempt)
    token = login.json()['token']
    userId = login.json()['userId']
    
    if(token is not None):
         connected = True
    

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})

watcherId = watchers.json()

functions = {"log" : pf.runLogsUda, "email" : pf.runEmailUda}
actions = defaultdict(list)

for entry in range(len(watcherId)):
    print ("(",entry,")", watcherId[entry]["watcherName"])
    
watcherSelected = int(input("Select the Watcher Configuration to use: "))

print(watcherId[watcherSelected]["watcherName"], "has been selected.")

thisWatcher = watcherId[watcherSelected]

objectLabel = watcherId[watcherSelected]["object"]
print (objectLabel)

#print(watcherId[0])
#print(watcherId[watcherSelected]['udaList'])
#print(functions['udaList'][0]['udaType'])
#print(watcherId[0]['udaList'][0]['udaType'])

#actions[watcherId[0]['object']].append((functions[watcherId[0]['udaList'][0]['udaType']],watcherId[0]['udaList']))




if thisWatcher['udaList'][0]['udaType'] == "email":
    for udas in watcherId[watcherSelected]['udaList']:
        actions[objectLabel].append((functions[thisWatcher['udaList'][0]['udaType']],thisWatcher['udaList'][0]['params']))
        actions[objectLabel].append((functions[thisWatcher['udaList'][1]['udaType']],thisWatcher['udaList']))
else:
    for udas in watcherId[watcherSelected]['udaList']:
        actions[objectLabel].append((functions[thisWatcher['udaList'][0]['udaType']],thisWatcher['udaList']))


print(actions[objectLabel])


cap = cv2.VideoCapture(0)

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
# print(f"FPS: {cap.get(5)}")

# # Generate the labels associated with object
LABELS = hf.filesplit(r'/home/pi/Desktop/project-watchit-main/device/model/coco.txt')
if not LABELS:
    exit(1)

# # Set confidence required to send message and count obtains the highest current videoID
min_confidence = 0.5
count = hf.video_count(domain, userName, passWord) + 1

fourcc = cv2.VideoWriter_fourcc(*"avc1")
writer = cv2.VideoWriter(f'output{count}.mp4', fourcc, 30, (frame_width, frame_height))

net = cv2.dnn.readNetFromDarknet('/home/pi/Desktop/project-watchit-main/device/model/yolov4-tiny.cfg', '/home/pi/Desktop/project-watchit-main/device/model/yolov4-tiny.weights')
ln = net.getUnconnectedOutLayersNames()

objectTrigger = False

frame_cnt = 0

countME = 0
while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)
    
    # Object detection on every 10th frame
    if frame_cnt >= 30:
        frame_cnt = 0
        print('Processing',countME)
        countME += 1
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320), swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                if confidence > min_confidence:
                    if LABELS[classID] == objectLabel:
                        objectTrigger =True

    if objectTrigger:
        hf.recordvideo(cap, writer)
        print(objectLabel)
    # Can pass in user name after count
        Process(target=vu.upload_video, args=(count,userName)).start()
        Process(target=pf.dofuncts, args=(actions[objectLabel],)).start()
        count += 1
        writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))
        objectTrigger = False

    # Push q to exit program
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    frame_cnt += 1

writer.release()

# Remove extra file created by function
os.remove(f'output{count}.mp4')

cap.release()
cv2.destroyAllWindows()
