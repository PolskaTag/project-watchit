import socket
import time
import helperfuncs as hf
import pifuncs as pf
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

functions = {"log" : pf.runLogsUda}
actions = defaultdict(list)



watcherId = watchers.json()
#print(watcherId)

for entry in range(len(watcherId)):
    print ("(",entry,")", watcherId[entry]["watcherName"])
    
watcherSelected = int(input("Select the Watcher Configuration to use: "))

actions[watcherId[watcherSelected]['object']].append((functions[watcherId[watcherSelected]['udaList'][0]['udaType']],watcherId[watcherSelected]['udaList']]))

print(watcherId[watcherSelected]["watcherName"], "has been selected.")

label = watcherId[watcherSelected]["object"]
print (label)

#for udas in watcherId[watcherSelected]['udaList']:
#    actions[label].append((functions[udas['udaType']],(udas['params'])))
    
    
# print(funcs[0][0](*funcs[0][1:]))


host = '192.168.1.28'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024).decode()

start = time.time()

while data != 'q' and time.time() - start > 20:
    #print('Received:' + data)
    if data == label:
        c.send(b"Record")
        for func in actions[label]:
            func[0](*func[1:])
    elif not data:
        break
        start = time.time()
        c.send(b"Record")
        for func in actions[label]:
            func[0](*func[1:])
    data = c.recv(1024).decode()

c.close()