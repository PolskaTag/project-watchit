import socket

def main():

    host = '192.168.86.27'
    port = 8080

    s = socket.socket(socket.AF_INET,
                  socket.SOCK_STREAM)

    s.connect((host,port))


if __name__ == '__main__':
    main()