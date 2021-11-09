import socket
import time
# from threading import Thread
import errno
import os

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

def main():
    send_message()

if __name__ == '__main__':
    main()