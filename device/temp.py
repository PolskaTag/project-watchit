import cv2

cap = cv2.VideoCapture(r'project-watchit\device\model\car_Trim.mp4')

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
frame_per_second = int(cap.get(5))

print(f"fps: {frame_per_second}")

cap.release()
cv2.destroyAllWindows()