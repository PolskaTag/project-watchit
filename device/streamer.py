import cv2
import numpy as np
import time
import os
import boto3
import presigned as pr
import pymongo_video as pv
from datetime import datetime

# Create a VideoCapture object
cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 480)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)
cap.set(cv2.CAP_PROP_FPS, 10)

# Check if camera opened successfully
if (cap.isOpened() == False): 
  print("Unable to read camera feed")

# Default resolutions of the frame are obtained.The default resolutions are system dependent.
# We convert the resolutions from float to integer.
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

start_count = count = 1
record = False
start = time.time()

# Define the codec and create VideoWriter object.The output is stored in 'outpy.avi' file.
out = cv2.VideoWriter(f'output{count}.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 10, (frame_width,frame_height))

while(True):
  ret, frame = cap.read()

  if ret == True: 
    
    # Display the resulting frame    
    cv2.imshow('frame',frame)

    #Press spacebar to start recoridng

    key = cv2.waitKey(1)

    # Press q on keyboard to stop recording
    if key & 0xFF == 32:
      start = time.time()
      record = True
    elif key & 0xFF == ord('q'):
      break
  
    if time.time() - start > 10 and record:
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
os.remove(f'output{count}.avi')

s3_client = boto3.client('s3') 
dbname = pv.get_database()
collection_name = dbname["Test_Videos"]

for videos in range(start_count, count):
  name = f'output{videos}.avi'
  url = pr.generate_presigned_url(s3_client, 'put_object', {'Bucket': 'cis4398-watchit', 'Key': name}, 30)
  pr.upload_video(url, name)
  pv.new_video(collection_name, 'seconduser@user.com', {'videoID' : videos, 'url' : f'https://cis4398-watchit.s3.amazonaws.com/{name}', 'name': name, 'time': datetime.now()})
