import cv2 as cv

img = cv.imread('./resources/philip-square-1.jpg')
class_names = []
class_file = './model/coco.txt'

with open(class_file, 'rt') as f:
    class_names = f.read().rstrip('\n').split('\n')

config_path = './model/yolov4-tiny.cfg'
weight_path = './model/yolov4.weights'

net = cv.dnn_DetectionModel(weight_path, config_path)

net.setInputSize(320, 320)
net.setInputScale(1.0/127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

class_ids, confidence, bbox = net.detect(img, confThreshold=.5)
print(class_ids, bbox)
