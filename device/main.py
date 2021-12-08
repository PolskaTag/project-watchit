import cv2
import helperfuncs as hf
import login
import pifuncs as pf
from collections import defaultdict
import multiprocessing as mp
import video_upload as vu
import os
import requests
DOMAIN = 'http://18.207.245.254:5000'

#User login prompt
userId, token = login.signIn(DOMAIN)

watchers = requests.get(f'{DOMAIN}/watchers/{userId}', headers={"x-access-token": token})

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

# Generate the labels associated with object
LABELS = hf.filesplit('project-watchit-main/device/model/coco.txt')
if not LABELS:
    exit(1)

# Set confidence required to send message and count obtains the highest current videoID
min_confidence = 0.6
count = hf.video_count(DOMAIN, userId, passWord) + 1

fourcc = cv2.VideoWriter_fourcc(*"avc1")
filename = f"{userName}-video{count}.mp4"
writer = cv2.VideoWriter(filename, fourcc, 30, (frame_width, frame_height))

net = cv2.dnn.readNetFromDarknet('project-watchit-main/device/model/yolov4-tiny.cfg', 'project-watchit-main/device/model/yolov4-tiny.weights')
ln = net.getUnconnectedOutLayersNames()

frame_cnt = 0
ret_value = mp.Value("i", False, lock=True)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)
    
    # Object detection on every 30th frame
    if frame_cnt >= 30 and ret_value.value == False:
        frame_cnt = 0
        mp.Process(target=hf.objectdetection, args=(frame, net, ln, LABELS, ret_value)).start()

    if ret_value.value:
        print("Worked")
        mp.Process(target=pf.dofuncts, args=(actions[objectLabel],)).start()
        hf.recordvideo(cap, writer)
        ret_value.value = False
        # Can pass in user name after count
        mp.Process(target=vu.upload_video, args=(count,)).start()
        count += 1
        writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))

    # Push q to exit program
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    frame_cnt += 1

writer.release()
# Remove extra file created by function
os.remove(f'{userName}-video{count}.mp4')

cap.release()
cv2.destroyAllWindows()
