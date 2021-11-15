import requests
from pydub import AudioSegment
from pydub.playback import play

def runEmailUda(email, watcherName):
    domain = 'http://34.201.36.147:5000'
    requests.post(f'{domain}/notification', json={"email": email, "watcherName": watcherName})

def intruder(filepath='project-watchit\device\resources\sounds\intruder.mp3'):
    play(AudioSegment.from_mp3(filepath))

def lights():
    return None