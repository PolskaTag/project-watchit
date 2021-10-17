# from S3upload import upload_file

# upload_file('/mnt/c/Users/ventu/Downloads/Resume.pdf', 'cis4398-watchit') 

import pymongo_video as pv
from datetime import datetime

dbname = pv.get_database()

collection_name = dbname["Test_Videos"]

# collection_name.update_one(
#         {"email": "user@user.com"},
#         {'$unset' : {'video': ""}}
#     )

sample_video = {"Name": "Output.avi", "TimeStamp": datetime.now(), "VideoID": "1"}

pv.new_video(collection_name, "user@user.com", sample_video)