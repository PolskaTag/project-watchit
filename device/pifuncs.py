import requests

def runEmailUda(email, watcherName):
    domain = 'http://34.201.36.147:5000'
    requests.post(f'{domain}/notification', json={"email": email, "watcherName": watcherName})

def playsound(filepath):
    return None

def lights():
    return None