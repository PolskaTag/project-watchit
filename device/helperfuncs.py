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

def recordvideo(stream, writer):
    """
    Record video from incoming stream for ten seconds

    Params:
        stream: cv2.VideoCapture object
        writer: cv2.VideoWrite object
    """
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
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > min_confidence:
                if LABELS[classID] == 'person':
                    value.value = True

if __name__ == "__main__":
    None