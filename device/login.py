import socket
import time
import helperfuncs as hf
import pifuncs as pif
from collections import defaultdict
import json
import requests
import getpass


domain = 'http://34.201.36.147:5000'

connected = False

while connected is False:
    
    userName = input("Enter your User Name: ")
    if userName == "exit":
        exit()
    passWord = getpass.getpass()
    loginAttempt = {'username': userName, 'password': passWord}

    login = requests.post(f'{domain}/login', json = loginAttempt)
    token = login.json()['token']
    userId = login.json()['userId']
    
    if(token is not None):
        connected = True
    

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})
#print(watchers.status_code)

#functions = {"email" : hf.notifications}
functions = {}
#actions = defaultdict(list)


watcherId = watchers.json()
# print(watcherId)

for entry in range(len(watcherId)):
    print ("(",entry,")", watcherId[entry]["watcherName"])
    
watcherSelected = int(input("Select the Watcher Configuration to use: "))

print(watcherId[watcherSelected]["watcherName"], "has been selected.")

label = watcherId[watcherSelected]["object"]
print (label)

counter = 0
for udas in watcherId[watcherSelected]['udaList']:
    actions[f'banana{counter}'] = ((functions[udas['udaType']],(udas['params'])))
    counter += 1
print(f"Parsed functions: {funcs}")

# print(funcs[0][0](*funcs[0][1:]))

exit(1)

host = '192.168.1.28'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024).decode()

start = time.time()

while data != 'q' and time.time() - start > 20:
    print('Received:' + data)
    if not data:
        break
    elif data == label:
        start = time.time()
        c.send(b"Record")
    data = c.recv(1024).decode()

c.close()