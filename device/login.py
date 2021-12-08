import getpass
import requests

def __get_userinfo():

    print('Welcome to WatchIt, please enter your username and password.')
    userName = input("Enter your User Name: ")
    passWord = getpass.getpass()
    res = {'username': userName, 'password': passWord}

    return res

def __login(domain, loginAttempt):

    login = requests.post(f'{domain}/login', json = loginAttempt)
    return login.json()

def signIn(domain):

    connected = False

    while not connected:
        cred = __get_userinfo()
        token = __login(domain, cred)
        if 'token' not in token:
            print(token['message'])
        else:
            connected = True

    return token['userID'], token['token']