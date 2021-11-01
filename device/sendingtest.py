import socket

def send_message():
    host = '192.168.86.27' #The host on your client needs to be the external-facing IP address of your router. Obtain it from here https://www.whatismyip.com/
    port = 8080 
    s = socket.socket()
    s.connect((host,port))
    message = b"banana"
    # while message != 'q':
    s.send(message)
    # data = s.recv(1024)
    # message = b"PERSON"
    s.close()

# if __name__ == '__main__':
#     Main()