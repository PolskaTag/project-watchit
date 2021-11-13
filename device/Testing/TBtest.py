import requests
import os
import json
from pprint import pprint

from Tb2 import LoggedInUser
#print(os.environ.get("JWT_SECRET"))
#header = {"x-access-token": "d01cb8804c92a44b721c2fe5fb603503e8d0675dc025c69ca5562c699cb5823abcea70bbbeb81ca790e0d5759831a765eef0ff5807b713f5b8a3617fc9209571"} #{"x-access-token": os.environ.get("JWT_SECRET")}# "d01cb8804c92a44b721c2fe5fb603503e8d0675dc025c69ca5562c699cb5823abcea70bbbeb81ca790e0d5759831a765eef0ff5807b713f5b8a3617fc9209571"}
#response = requests.get("http://localhost:5000/pythonread")#, headers=header
 #)#("http://randomfox.ca/floof")

#print(response.json()

# to log the user in and get the token
user = {"username": "capstone", "password": "apple123"}
#print("user is " + user['username'])
login = requests.post("http://localhost:5000/login", json=user)
# view logins returned json
#print(login.json())
loginCreds = login.json()
t = loginCreds["token"]
#print(loginCreds["token"])


#r = requests.post("http://localhost:5000/login", json={"username": "capstone", "password": "apple123"})
#response = requests.get("http://localhost:5000/uu/capstone")
#y = json.dumps(response)
#video = json.loads(y)
#print(video['videos'])
# view logins returned json
header = {"x-access-token": t}
response = requests.get("http://localhost:5000/videos", headers=header)
h = response.json()
#print(h[0])


#this function returns videoID number found in the users db
def maxVideoID(videoArry):
    maxVideoIDCheck = 0
    for video in videoArry:  
        if video["videoID"] > maxVideoIDCheck:
            maxVideoIDCheck = video["videoID"]

    return maxVideoIDCheck

#print(maxVideoID(h[0]))    
count = 20
p = LoggedInUser({"username": "capstone", "password": "apple123"})
def gg(count):    
   
    r = int(p.getMaxVideoIDNumber()) + count
   # print(count)
    return r

print(gg(count))
#print(p.name)
#print(p.getMaxVideoIDNumber())