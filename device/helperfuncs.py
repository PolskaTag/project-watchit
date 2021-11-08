import socket

def filesplit(filename):
    """
    Read in a text file and return a list of objects that model can identify.
    """
    with open(r'project-watchit\device\model\coco.txt', 'r') as f:
        LABELS = f.read().split('\n')

    if not f:
        print("ERROR: Unable to open file.")
        return None
    return LABELS

def main():

    host = '192.168.86.27'
    port = 8080

    s = socket.socket(socket.AF_INET,
                  socket.SOCK_STREAM)

    s.connect((host,port))

    return s
