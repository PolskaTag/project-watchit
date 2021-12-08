import cv2
from collections import defaultdict
import numpy as np
import pifuncs as pf

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

def addFuncts(watcherId, watcherSelected, objectLabel):

    functions = {"log" : pf.runLogsUda, "email" : pf.runEmailUda}
    actions = defaultdict(list)

    thisWatcher = watcherId[watcherSelected]

    if thisWatcher['udaList'][0]['udaType'] == "email":
        for udas in watcherId[watcherSelected]['udaList']:
            actions[objectLabel].append((functions[thisWatcher['udaList'][0]['udaType']],thisWatcher['udaList'][0]['params']))
            actions[objectLabel].append((functions[thisWatcher['udaList'][1]['udaType']],thisWatcher['udaList']))
    else:
        for udas in watcherId[watcherSelected]['udaList']:
            actions[objectLabel].append((functions[thisWatcher['udaList'][0]['udaType']],thisWatcher['udaList']))

    return actions


if __name__ == "__main__":
    None