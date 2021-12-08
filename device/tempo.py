import requests

DOMAIN = 'http://18.207.245.254:5000'    

loginAttempt = {'username': "cap", 'password': "test123"}

login = requests.post(f'{DOMAIN}/login', json = loginAttempt)

print(login.json()['message'])

if 'token' not in login:
    print('ok')