import requests
from pydub import AudioSegment
from pydub.playback import play

def runEmailUda(dictionary):
    domain = 'http://34.201.36.147:5000'
    requests.post(f'{domain}/notification', json={"email": dictionary['recipient'], "watcherName": dictionary['body']})

def intruder(filepath='device/resources/sounds/intruder.mp3'):
    play(AudioSegment.from_mp3(filepath))

def lights():
    return None

def dofuncts(function_list):
    for func in function_list:
        func[0](*func[1:])