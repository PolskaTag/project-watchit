import socket
import time
import helperfuncs as hf
from collections import defaultdict
import json
import requests
import threading

temp = hf.userdata()
userId = temp['userId']
token = temp['token']
domain = 'http://34.201.36.147:5000'

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})

# functions = {"email" : hf.notifications}
# actions = defaultdict(list)

# watcherId = watchers.json()
# print(watcherId[0]['udaList'])
# counter = 0
# for udas in watcherId[0]['udaList']:
#     actions[f'banana{counter}'] = ((functions[udas['udaType']],(udas['params'])))
#     counter += 1

# print(actions)

host = '192.168.86.23'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024).decode()

start = time.time()

while data != 'q':
    print('Received:' + data)
    if not data:
        break
    #Cooldown period, video will not record until program has been up for twenty seconds and twenty seconds since last recording.
    elif data == 'person' and time.time() - start > 20:
        start = time.time()
        c.send(b"Record")

    data = c.recv(1024).decode()

c.close()