import socket
import threading
import errno
import time

class Listener():
    """
    Listens for commands from the Pi to record the video.
    """

    def __init__(self, socket):
        self.socket = socket
        self.record = False

    def start(self):
        self.thread = threading.Thread(target=self.__listening).start()

    def __listening(self):
        while True:
            try:
                data = self.socket.recv(1024).decode()
            except socket.error as e:
                err = e.args[0]
                if err == errno.EAGAIN or err == errno.EWOULDBLOCK:
                    continue
                else:
                    print(e)
                    exit(1)
            else:
                if data == 'Record':
                    self.record = True
                elif data == "Close":
                    self.stop()
            time.sleep(0.5)

    def stop(self):
        self.socket.close()
        self.thread.join()