import pymongo_video as pv
import boto3
import os
from datetime import datetime
import logging
from botocore.exceptions import ClientError
import requests

logger = logging.getLogger(__name__)

def upload_video(count, filename, user):
    """
    This function is called after video is finished recording. 

    :param count: used in naming of the video, used in a strictly iterative fashion. 
    """

    s3_client = boto3.client(
                        's3',
                        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                        aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
                        )

    url = __generate_presigned_url(s3_client, "put_object", {"Bucket": os.environ.get('AWS_BUCKET_NAME'), "Key": filename, "ContentType": "video/mp4"}, 30)

    # Upload video so S3 bucket
    __upload_video(url, filename)

    # Adds entry to mongoDB user video list
    pv.new_video(user, {"videoID" : count, "url" : f"https://{os.environ.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/{filename}",
                 "name": filename, "time": datetime.now()})

def __generate_presigned_url(s3_client, client_method, method_parameters, expires_in):
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

def __upload_video(url, filename, headers={"Content-Type": "video/mp4"}):

    response = None

    print("Uploading file.")
    with open(filename, 'rb') as object_file:
        object_text = object_file.read()
    response = requests.put(url, data=object_text, headers=headers)

    print("Got response:")
    print(f"Status: {response.status_code}")
    print(response.text)
    return None