import boto3

from presigned import generate_presigned_url

s3_client = boto3.client('s3') 

temp = generate_presigned_url(s3_client, 'put_Object', {'Bucket': args.bucket, 'Key': args.key})

