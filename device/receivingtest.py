import socket

from pydub import AudioSegment
from pydub.playback import play

song = AudioSegment.from_mp3("project-watchit/device/Testing/banana.mp3")

host = '192.168.86.27'
port = 8080
s = socket.socket()
s.bind((host, port))

s.listen(1)
c, addr = s.accept()
# while True:
data = c.recv(1024)
while data != 'q':
    print('Received:' + data.decode())
    if data.decode() == "banana":
        play(song)
    data = c.recv(1024)
    if not data:
        break
    # data = str(data).upper()
    # c.send(data)
c.close()

# if __name__ == '__main__':
#     Main()