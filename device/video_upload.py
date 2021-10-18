import presigned as pr
import pymongo_video as pv
import boto3
from datetime import datetime

def upload_video(count):

    name = f"output{count}.avi"

    s3_client = boto3.client('s3') 
    dbname = pv.get_database()
    collection_name = dbname["Test_Videos"]

    url = pr.generate_presigned_url(s3_client, "put_object", {"Bucket": "cis4398-watchit", "Key": name}, 30)

    pr.upload_video(url, name)
    pv.new_video(collection_name, "seconduser@user.com", {"videoID" : count, "url" : f"https://cis4398-watchit.s3.amazonaws.com/{name}", "name": name, "time": datetime.now()})