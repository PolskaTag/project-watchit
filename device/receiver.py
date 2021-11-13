import socket
from time import sleep
import helperfuncs as hf
from collections import defaultdict
import json
import requests

temp = hf.userdata()
userId = temp['userId']
token = temp['token']
domain = 'http://34.201.36.147:5000'

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})

# print()
# print(f"userId: {userId}")
# print(f"token: {token}")
# print(f"domain: {domain}")
# print(f'url: {domain}/watchers/{userId}')
# print()
# print(watchers.json())
# watcherId = watchers.json()
# print(watcherId[0]['udaList'])
# funcs = []
# for udas in watcherId[0]['udaList']:
#     funcs.append(udas['udaType'])
# print(f"Parsed functions: {funcs}")

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
    elif data == 'person':
        c.send(b"Record")
    data = c.recv(1024).decode()

c.close()