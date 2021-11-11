import socket
import errno
import time
import cv2

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

def gen_sock():

    host = '192.168.86.27'
    port = 8080

    s = socket.socket(socket.AF_INET,
                  socket.SOCK_STREAM)

    s.connect((host,port))

    return s

def lights():
    return None

def locks():
    return None

def alarms():
    return None


def send_message():
    host = '192.168.86.27' #The host on your client needs to be the external-facing IP address of your router. Obtain it from here https://www.whatismyip.com/
    port = 8080 
    s = socket.socket()
    s.connect((host,port))
    s.setblocking(False)
    # s.settimeout(10)

    start = time.time()
    while time.time() - start < 30:
        # while message != 'q':
        s.send(b"MESSAGE SENT")
        time.sleep(1)
        if time.time()- start > 25:
            try:
                msg = s.recv(4096)
            except socket.error as e:
                err = e.args[0]
                if err == errno.EAGAIN or err == errno.EWOULDBLOCK:
                    time.sleep(1)
                    print('No data available')
                    continue
                else:
                    # a "real" error occurred
                    print(e)
                    exit(1)
            else:
                # got a message, do something :)
                print(msg)
        # data = s.recv(1024)
        # message = b"PERSON"
    s.close()

def framegrab():
    vs = cv2.VideoCapture('udpsrc port=5200 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, \
                    encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! nvh264dec ! \
                        videoconvert ! appsink', cv2.CAP_GSTREAMER)

    grabbed, frame = vs.read()

    