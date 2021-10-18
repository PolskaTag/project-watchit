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

import os
print(f"mongodb+srv://Steven:{os.environ.get('MONGO_PASS')}@cluster.d9abx.mongodb.net/Users?retryWrites=true&w=majority")