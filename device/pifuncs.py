import requests
from pydub import AudioSegment
from pydub.playback import play

# song = AudioSegment.from_mp3("project-watchit/device/Testing/banana.mp3")

def runEmailUda(email, watcherName):
    domain = 'http://34.201.36.147:5000'
    requests.post(f'{domain}/notification', json={"email": email, "watcherName": watcherName})

def intruder(filepath='project-watchit\device\resources\sounds\intruder.mp3'):
    play(filepath)

def lights():
    return None