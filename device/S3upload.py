import logging
import boto3
from botocore.exceptions import ClientError
import os


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    if not os.path.exists(file_name):
        return "FILE NOT FOUND"

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    # s3_client = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
    #                   aws_secret_access_key=SECRET_KEY)
    # s3_client = boto3.client(
    #     service_name='s3',
    #     region_name='us-east-1',
    #     endpoint_url='https://bucket.vpc-0ac1b5d92e63913cd.s3.us-east-1.vpce.amazonaws.com'
    #     )
    try:
        response = s3_client.upload_file(file_name, bucket, object_name, ExtraArgs={'ContentType': 'application/pdf'})
    except ClientError as e:
        logging.error(e)
        return False
    return True