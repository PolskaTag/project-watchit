import cv2
import time
import os
from threading import Thread
from video_upload import upload_video
import wcamera as wc
from loggedInUser import LoggedInUser

#instantiate current logged in user
currentUser = LoggedInUser({"username": "capstone", "password": "apple123"})

# Create a VideoCapture object
cap = wc.standard_camera()

# Check if camera opened successfully
if not cap:
  exit(1)

# Default resolutions of the frame are obtained.The default resolutions are system dependent.
# We convert the resolutions from float to integer.
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

start_count = 1
count = int(currentUser.getMaxVideoIDNumber()) + 1 
record = False
start = time.time()

# Define the codec and create VideoWriter object.The output is stored in 'output{count}.avi' file.
out = cv2.VideoWriter(f'output{count}.mp4',cv2.VideoWriter_fourcc(*'mp4v'), 10, (frame_width,frame_height))

while(True):
  ret, frame = cap.read()

  if ret == True: 
    
    # Display the resulting frame    
    cv2.imshow('frame',frame)

    key = cv2.waitKey(1)

    # Press spacebar to start recording and q to quit
    if key & 0xFF == 32:
      start = time.time()
      record = True
    elif key & 0xFF == ord('q'):
      break
      q
    # Record for ten seconds then upload to S3 and update databases
    if time.time() - start > 10 and record:
      Thread(target=upload_video, args=(count, currentUser.name, )).start()
      count += 1
      out = cv2.VideoWriter(f'output{count}.mp4',cv2.VideoWriter_fourcc(*'mp4v'), 10, (frame_width,frame_height))
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
os.remove(f'output{count}.mp4')