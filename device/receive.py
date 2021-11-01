import socket
from pydub import AudioSegment
from pydub.playback import play

song = AudioSegment.from_mp3("project-watchit/device/Testing/person.mp3")

host = '192.168.86.25'
port = 8080

# create a socket at client side
# using TCP / IP protocol
s = socket.socket(socket.AF_INET,
				socket.SOCK_STREAM)

# connect it to server and port
# number on local computer.

s.bind((host, port))

# receive message string from
# server, at a time 1024 B
msg = s.recv(1024)

# repeat as long as message
# string are not empty
while msg:
    print('Received:' + msg.decode())
    msg = s.recv(1024)
    if msg == "PERSON":
        play(song)

# disconnect the client
s.close()
