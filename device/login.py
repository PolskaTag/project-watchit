import socket
import time
import pifuncs as pf
from collections import defaultdict
import requests
import getpass
import threading
import subprocess

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

subprocess.run([""])

watchers = requests.get(f'{domain}/watchers/{userId}', headers={"x-access-token": token})
#print(watchers.status_code)

watcherId = watchers.json()

functions = {"log" : pf.runLogsUda}
actions = defaultdict(list)

actions[watcherId[2]['object']].append((functions[watcherId[2]['udaList'][0]['udaType']],watcherId[2]['udaList']))


#print(watcherId)

for entry in range(len(watcherId)):
    print ("(",entry,")", watcherId[entry]["watcherName"])
    
watcherSelected = int(input("Select the Watcher Configuration to use: "))

print(watcherId[watcherSelected]["watcherName"], "has been selected.")

label = watcherId[watcherSelected]["object"]
print (label)

#for udas in watcherId[watcherSelected]['udaList']:
#    actions[label].append((functions[udas['udaType']],(udas['params'])))
    
    
# print(funcs[0][0](*funcs[0][1:]))


host = '192.168.1.36'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024).decode()

start = time.time()

while data != 'q':
    if data == label and time.time() - start > 20:
        c.send(b'Record')
        start = time.time()
        threading.Thread(target=pf.dofuncts, args=(actions[label],)).start()
    elif not data:
        break
    data = c.recv(1024).decode()

c.close()

