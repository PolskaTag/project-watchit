import socket
import time
import helperfuncs as hf
from collections import defaultdict
import pifuncs as pf
import requests
import threading

temp = hf.userdata()
userId = temp['userId']
token = temp['token']
domain = 'http://34.201.36.147:5000'

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})

watcherId = watchers.json()


functions = {"email" : pf.runEmailUda}
actions = defaultdict(list)
actions['person'].append((pf.intruder,))

actions[watcherId[0]['object']].append((functions[watcherId[0]['udaList'][0]['udaType']],watcherId[0]['udaList'][0]['params']))


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
    # Cooldown period, video will not record until program has been up for twenty seconds and twenty seconds since last recording.
    # elif data == 'person' and time.time() - start > 20:
    if data == 'person' and time.time() - start > 20:
        c.send(b'Record')
        start = time.time()
        threading.Thread(target=pf.dofuncts, args=(actions['person'],)).start()
    elif not data:
        break
    data = c.recv(1024).decode()
c.close()