import requests
from pydub import AudioSegment
from pydub.playback import play

def runEmailUda(dictionary):
    """
    Triggers the email notification action

    :params dictionary: provides target email and message to be sent.
    """
    
    domain = 'http://18.207.245.254:5000'
    requests.post(f'{domain}/notification', json={"email": dictionary['recipient'], "watcherName": dictionary['body']})

def intruder(filepath='project-watchit/device/resources/sounds/intruder.mp3'):
    play(AudioSegment.from_mp3(filepath))

def lights():
    return None

def runLogsUda(dictionary):
    domain = 'http://18.207.245.254:5000'
    requests.post(f'{domain}/logging')
    
def runVideoUDA():
    return None
  
def dofuncts(function_list):
    for func in function_list:
        func[0](*func[1:])
