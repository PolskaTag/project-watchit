import socket
from time import sleep
import helperfuncs
from collections import defaultdict

#Change host to your Pi using ipcofig 
#Can make script to automate this process
host = '192.168.86.23'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024).decode()

while data != 'q':
    print('Received:' + data)
    if not data:
        break
    elif data == 'car':
        s.send(b"Record")
    data = c.recv(1024).decode()

c.close()

# if __name__ == '__main__':
#     Main()

# class Receiver():

#     def __init__(self, host="192.168.86.23", port=5200):
#         self.host = host
#         self.port = port
#         self.socket = socket.socket()
#         self.message = ""

#     def start(self):

#         socket.bind(host, port)
#         s.listen(1)
#         c, addr = s.accept()
        
#         while True:
#             self.message = c.recv(1024)

#     def stop(self):
#         self.socket.close()