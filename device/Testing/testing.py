# import presigned as pr
# import boto3
# import os

# s3_client = boto3.client('s3') 

# filepath = 'output1.avi'

# url = pr.generate_presigned_url(s3_client, 'put_object', {'Bucket': 'cis4398-watchit', 'Key': filepath}, 1800)

# pr.upload_video(url, filepath)

# from pymongo import collection
# import pymongo_video as pv

# dbname = pv.get_database()
# collection_name = dbname["Test_Videos"]

# collection_name.update_many({ },
#                             { "$pull": { "videos": { "videoID": {"$gte" : 0}}}}
#                             )

# import os
# print(f"mongodb+srv://Steven:{os.environ.get('MONGO_PASS')}@cluster.d9abx.mongodb.net/Users?retryWrites=true&w=majority")

import presigned as pr
import pymongo_video as pv
import boto3
import os
from datetime import datetime

# def upload_video(count):
#     """
#     This function is called after video is finished recording. 

#     :param count: used in naming of the video, used in a strictly iterative fashion. 
#     """

#     name = f"output{count}.avi"

#     s3_client = boto3.client(
#                         's3',
#                         aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
#                         aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
#                         )
                        
#     dbname = pv.get_database()
#     collection_name = dbname["users"]

#     url = pr.generate_presigned_url(s3_client, "put_object", {"Bucket": os.environ.get('AWS_BUCKET_NAME'), "Key": name}, 30)

#     pr.upload_video(url, name)
#     pv.new_video(collection_name, "test123", {"videoID" : count, "url" : f"https://{os.environ.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/{name}", "name": name, "time": datetime.now()})

# count = 1
# name = f"output{count}.avi"

# dbname = pv.get_database()
# collection_name = dbname["users"]
# pv.new_video(collection_name, "test123", {"videoID" : count, "url" : f"https://{os.environ.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/{name}", "name": name, "time": datetime.now()})

count = 7

name = f"output{count}.mp4"

s3_client = boto3.client(
                    's3',
                    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                    aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
                    )

url = pr.generate_presigned_url(s3_client, "get_object", {"Bucket": os.environ.get('AWS_BUCKET_NAME'), "Key": name}, 600)
print(url)