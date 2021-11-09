#pygame is preinstalled on RaspberryPi
from pygame import mixer

def playSound(): 
    #Initialize pygame mixer
    mixer.init()

    #Load the sounds
    #sounds needs to downloaded already
    sound = mixer.Sound('./resources/sounds/applause-1.wav')

    #Play Sound
    sound.play()