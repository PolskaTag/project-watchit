import socket
from time import sleep

# from pydub import AudioSegment
# from pydub.playback import play

# song = AudioSegment.from_mp3("project-watchit/device/Testing/banana.mp3")



host = '192.168.86.23'
port = 8080
s = socket.socket()
s.bind((host, port))
# s.setblocking(False)

s.listen(1)
c, addr = s.accept()
# while True:
data = c.recv(1024)
counter = 0

while data != 'q':
    print('Received:' + data.decode())
    data = c.recv(1024)
    if not data:
        break
    sleep(1)
    counter += 1
    print(counter)
    # data = str(data).upper()
    # c.send(data)
c.close()

# if __name__ == '__main__':
#     Main()