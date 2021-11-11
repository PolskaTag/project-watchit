import cv2
import threading
import numpy as np

class VideoGet():

    def __init__(self, src, height=640, width=480):
        self.cap = cv2.VideoCapture(src)
        # self.cap.set(cv2.CAP_PROP_FPS, 30)  
        self.started = False
        self.grabbed, self.frame = self.cap.read()
        self.read_lock = threading.Lock()

    def set(self, property, value):
        self.cap.set(property, value)

    def start(self):
        if self.started:
            print('[!] Threaded video capturing has already been started.')
            return None
        self.started = True
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.start()
        return self

    def update(self):
        while self.started:
            grabbed, frame = self.cap.read()
            if not np.any(frame):
                self.stop()
            with self.read_lock:
                self.grabbed = grabbed
                self.frame = frame

    def read(self):
        with self.read_lock:
            frame = self.frame.copy()
            grabbed = self.grabbed
        return grabbed, frame

    def stop(self):
        self.started = False
        self.cap.release()
        self.thread.join()

    def __exit__(self, exec_type, exc_value, traceback):
        self.cap.release()

# from threading import Thread
# import cv2

# class VideoGet:
#     """
#     Class that continuously gets frames from a VideoCapture object
#     with a dedicated thread.
#     """

#     def __init__(self, src=0):
#         self.stream = cv2.VideoCapture(src)
#         (self.grabbed, self.frame) = self.stream.read()
#         self.stopped = False

#     def start(self):
#         Thread(target=self.get, args=()).start()
#         return self

#     def get(self):
#         while not self.stopped:
#             if not self.grabbed:
#                 self.stop()
#             else:
#                 (self.grabbed, self.frame) = self.stream.read()

#     def stop(self):
#         self.stopped = True

class VideoPut():

    def __init__(self, filepath, width=640, height=480):
        fourcc = cv2.VideoWriter_fourcc(*"MJPG")
        self.writer = cv2.VideoWriter(filepath, fourcc, 30, (width, height))
        self.write_lock = threading.Lock()
        self.started = False

    def set(self, property, value):
        self.cap.set(property, value)

    def start(self):
        if self.started:
            print('[!] Threaded video capturing has already been started.')
            return None
        self.started = True
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.start()
        return self

    def update(self):
        while self.started:
            grabbed, frame = self.cap.read()
            if not np.any(frame):
                self.stop()
            with self.write_lock:
                self.grabbed = grabbed
                self.frame = frame

    def read(self):
        with self.write_lock:
            frame = self.frame.copy()
            grabbed = self.grabbed
        return grabbed, frame

    def stop(self):
        self.started = False
        self.cap.release()
        self.thread.join()

    def __exit__(self, exec_type, exc_value, traceback):
        self.cap.release()