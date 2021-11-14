import socket
import cv2
import requests

def filesplit(filename):
    """
    Read in a text file and return a list of objects that model can identify.
    """
    with open(r'project-watchit\device\model\coco.txt', 'r') as f:
        LABELS = f.read().split('\n')

    if not f:
        print("ERROR: Unable to open file.")
        return None
    return LABELS

def userdata(url="http://34.201.36.147:5000", username="capstone", password="apple123"):
    r = requests.post(f"{url}/login",
                  json={"username": username, "password": password})
    return r.json()

def video_count(url="http://34.201.36.147:5000"):
    """
    Find max video count so we do not overwrite existing videos.
    """
    header_params = {"x-access-token": userdata()['token']}
    video_lst = requests.get(f"{url}/videos", headers=header_params).json()
    max = 0
    for video in video_lst[0]:
        videoID = int(video['videoID'])
        if videoID > max:
            max = videoID
    return max

def recordvideo(stream, writer):
    frames = 0
    while frames < 300:
        ret, frame = stream.read()
        writer.write(frame)
        cv2.imshow('frame', frame)
        cv2.waitKey(1)
        frames += 1
    writer.release()

def setupmodel(cfg=r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.cfg'
                , weights=r'C:\Users\ventu\Python\project-watchit\device\model\yolov4-p6.weights'):

    model = cv2.dnn.readNetFromDarknet(cfg, weights)

    model.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
    model.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

    return model

def startup_socket(host="192.168.86.23", port=8080):
    s = socket.socket(socket.AF_INET,
            socket.SOCK_STREAM)

    s.connect((host,port))
    s.setblocking(False)
    return s

def framegrab():
    vs = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
                    encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! nvh264dec ! \
                        videoconvert ! appsink', cv2.CAP_GSTREAMER)

    grabbed, frame = vs.read()


def main():

    print(userdata())

if __name__ == "__main__":
    main()