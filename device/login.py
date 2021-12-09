import getpass
import requests

def get_userinfo():

    print('Welcome to WatchIt, please enter your username and password.')
    userName = input("Enter your User Name: ")
    passWord = getpass.getpass()
    res = {'username': userName, 'password': passWord}

    return res

def login(domain, loginAttempt):

    login = requests.post(f'{domain}/login', json = loginAttempt)
    return login.json()

def __userdata(username, password, url):
    r = requests.post(f"{url}/login",
                  json={"username": username, "password": password})
    return r.json()

def video_count(url, username, password):
    """
    Find max video count so we do not overwrite existing videos.
    """
    header_params = {"x-access-token": __userdata(username, password, url)['token']}
    video_lst = requests.get(f"{url}/videoIDs/{username}", headers=header_params).json()

    max = 0
    for video in video_lst[0]:
        videoID = int(video['videoID'])
        if videoID > max:
            max = videoID
    return max