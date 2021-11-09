import socket
from time import sleep
import helperfuncs
from collections import defaultdict
import pymongo

def readFromMongo():
    """
    Query mongoDB using user credentials to look for rules tuple pair, (object, function)
    """
    data = [('Object1', 'Function1')]
    return data

actions = readFromMongo()
functions = defaultdict(0)
for k,v in actions:
    functions[k] = v

host = '192.168.86.23'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()

data = c.recv(1024)

while data != 'q':
    print('Received:' + data.decode())
    #Value of key is function
    if function[data]:
        functions[data]()
    data = c.recv(1024)
    if not data:
        break
c.close()

# if __name__ == '__main__':
#     Main()