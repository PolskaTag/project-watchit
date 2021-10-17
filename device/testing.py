import presigned as pr
import boto3
import os

s3_client = boto3.client('s3') 

filepath = 'output1.avi'

url = pr.generate_presigned_url(s3_client, 'put_object', {'Bucket': 'cis4398-watchit', 'Key': filepath}, 1800)

pr.upload_video(url, filepath)