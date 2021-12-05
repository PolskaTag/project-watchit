import multiprocessing as mp
import cv2
import helperfuncs as hf
import pifuncs as pf
from collections import defaultdict
import video_upload as vu
import os

cap = cv2.VideoCapture(0)

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

# # Generate the labels associated with object
LABELS = hf.filesplit('project-watchit/device/model/coco.txt')
if not LABELS:
    exit(1)

# # Set confidence required to send message and count obtains the highest current videoID
min_confidence = 0.6
count = hf.video_count() + 1

fourcc = cv2.VideoWriter_fourcc(*"avc1")
writer = cv2.VideoWriter(f"output{count}.mp4", fourcc, 30, (frame_width, frame_height))

net = cv2.dnn.readNetFromDarknet('project-watchit/device/model/yolov4-tiny.cfg', 'project-watchit/device/model/yolov4-tiny.weights')
ln = net.getUnconnectedOutLayersNames()

frame_cnt = 0

actions = defaultdict(list)
actions['person'].append((pf.intruder,))

ret_value = mp.Value("i", False, lock=True)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)

    # Object detection on every 30th frame
    if frame_cnt >= 30 and ret_value.value == False:
        frame_cnt = 0
        print("Processing")
        mp.Process(target=hf.objectdetection, args=(frame, net, ln, LABELS, ret_value)).start()

    if ret_value.value:
        print("Worked")
        mp.Process(target=pf.dofuncts, args=(actions['person'],)).start()
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

# Remove extra file created by function
os.remove(f'output{count}.mp4')

cv2.destroyAllWindows()

print("OK")
cap.release()
print("DOK")
writer.release()
print("WOK")