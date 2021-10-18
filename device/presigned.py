import argparse
import logging
import boto3
from botocore.exceptions import ClientError
import requests
import ntpath

logger = logging.getLogger(__name__)


def generate_presigned_url(s3_client, client_method, method_parameters, expires_in):
    """
    Generate a presigned Amazon S3 URL that can be used to perform an action.

    :param s3_client: A Boto3 Amazon S3 client.
    :param client_method: The name of the client method that the URL performs.
    :param method_parameters: The parameters of the specified client method.
    :param expires_in: The number of seconds the presigned URL is valid for.
    :return: The presigned URL.
    """
    try:
        url = s3_client.generate_presigned_url(
            ClientMethod=client_method,
            Params=method_parameters,
            ExpiresIn=expires_in
        )
        logger.info("Got presigned URL: %s", url)
    except ClientError:
        logger.exception(
            "Couldn't get a presigned URL for client method '%s'.", client_method)
        raise
    return url

def upload_video(url, filename):

    response = None

    print("Uploading file.")
    with open(filename, 'rb') as object_file:
        object_text = object_file.read()
    response = requests.put(url, data=object_text)

    print("Got response:")
    print(f"Status: {response.status_code}")
    print(response.text)
    return None

# import boto3
# import requests
# import ntpath
# from presigned import generate_presigned_url

# s3_client = boto3.client('s3') 

# filename = 'project-watchit/device/tempobject.txt'

# url = generate_presigned_url(s3_client, 'put_object', {'Bucket': 'cis4398-watchit', 'Key': ntpath.basename(filename)}, 600)

# print("Using the Requests package to send a request to the URL.")
# response = None

# print("Putting data to the URL.")
# with open(filename, 'r') as object_file:
#     object_text = object_file.read()
# response = requests.put(url, data=object_text)

# print("Got response:")
# print(f"Status: {response.status_code}")
# print(response.text)
