import cv2

def standard_camera(width=480, height=640, fps=10):
    """
    Creates camera stream with standard parameters

    :param width: width in pixels of the camera
    :param height: height in pixels of the camera
    :param fps: fps of the camera output
    """

    cap = cv2.VideoCapture(" udpsrc port=9000 caps=“application/x-rtp, media=(string)video, \
        clock-rate=(int)90000, encoding-name=(string)H264” ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=f" \
            , cv2.CAP_GSTREAMER)
    if not cap:
        print("Failed to create camera feed")
        return None

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
    cap.set(cv2.CAP_PROP_FPS, fps)

    return cap