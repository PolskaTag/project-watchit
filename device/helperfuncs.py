import socket
import cv2
import requests
import numpy as np

def filesplit(filename):
    """
    Read in a text file and return a list of objects that model can identify.
    """
    with open(filename, 'r') as f:
        LABELS = f.read().split('\n')

    if not f:
        print("ERROR: Unable to open file.")
        return None
    return LABELS

def __userdata(username, password, url):
    r = requests.post(f"{url}/login",
                  json={"username": username, "password": password})
    return r.json()

def video_count(url="http://18.207.245.254:5000", username="capstone", password="apple123"):
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

def recordvideo(stream, writer):
    frames = 0
    while frames < 300:
        ret, frame = stream.read()
        writer.write(frame)
        cv2.imshow('frame', frame)
        cv2.waitKey(1)
        frames += 1
    writer.release()

def objectdetection(frame, model, layers, LABELS, value, min_confidence=0.6):
    blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (320, 320), swapRB=True, crop=False)
    model.setInput(blob)
    layerOutputs = model.forward(layers)
    one_class = set()
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            # if confidence > min_confidence:
            if confidence > min_confidence and classID not in one_class:
                one_class.add(classID)
                if LABELS[classID] == 'person':
                    value.value = True
    return

def main():
    return None

if __name__ == "__main__":
    main()