import requests


#This class take the currently logged in user and find his details and make it available.
class LoggedInUser:
    
    def __init__(self, user):
        self.name = user['username']
        self.user = user
        self.token = self.__getToken()

    #get user token, so we can access their db information
    def __getToken(self):
        login = requests.post("http://localhost:5000/login", json=self.user)
        loginDetails = login.json()
        userToken = loginDetails["token"]
        return userToken

    #this function returns videoID number found in the users db
    def __maxVideoID(self, videoArray):
        maxVideoIDCheck = 0
        if videoArray == 0:
            return 0
        for videos in videoArray:  
            for videoDetails in videos:
                if int(videoDetails["videoID"]) > maxVideoIDCheck:
                   maxVideoIDCheck = int(videoDetails["videoID"])
              
        return maxVideoIDCheck   

    #this function makes an api call to get user videos
    def __getUserVideos(self):
        header = {"x-access-token": self.token}
        response = requests.get(f'http://localhost:5000/videoIDs/{self.name}',headers=header)
        videos = response.json()
        #print(videos)
        return videos  

    #function to call, to get max number for user videos
    def getMaxVideoIDNumber(self):
        return self.__maxVideoID(self.__getUserVideos())   

p = LoggedInUser({"username": "capstone", "password": "apple123"})

print(p.getMaxVideoIDNumber())
#print(p.getToken())

   



