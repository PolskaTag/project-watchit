# from picamera import PiCamera
# from time import sleep

# camera = PiCamera()

# camera.start_preview()
# sleep(10)
# camera.stop_preview()

import cv2

cap = cv2.VideoCapture(0)

# Capture frame
ret, frame = cap.read()
if ret:
	cv2.imwrite('image.jpg', frame)

cap.release()