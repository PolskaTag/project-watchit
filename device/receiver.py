import socket
from time import sleep
import helperfuncs as hf
from collections import defaultdict
import json
import requests

# temp = hf.userdata()
# userId = temp['userId']

# r = requests.get(`{domain}/watchers/{userId}/{watcherId}`, heades={"x-access-token": {token}})

# print(temp)
# exit(1)

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
        c.send(b"Record")
    data = c.recv(1024).decode()

c.close()