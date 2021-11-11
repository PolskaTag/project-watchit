import cv2
from videoget import VideoGet, VideoPut

cap = VideoGet(r'project-watchit\device\model\car_Trim.mp4')
wrt = VideoPut('outpult.avi')


cap.start()

i = 0

while i < 1000:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    i += 1

cap.stop()
cv2.destroyAllWindows()