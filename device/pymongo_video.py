from pymongo import MongoClient
import os

def __get_database():
    """
    Grabs the database using credentials. In production we will obtain this using environmental variables instead of hardcoding.
    """

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = f"mongodb+srv://Steven:{os.environ.get('MONGO_PASS')}@cluster.d9abx.mongodb.net/Users?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Default database for user data
    return client['Users']

def new_video(user, video):
    """
    Appends new video to mongoDB array of user

    :param collection: collection of the documents to be updated
    :param user: user email
    :param video: dictionary of video information containing {videoID, url, filename, timestamp}
    """
    dbname = __get_database()
    collection_name = dbname["users"]

    collection_name.update_one(
        {"username" : user},
        {"$push": {"videos": video}}
    )

    return None

def delete_video(user, videoID):

    dbname = __get_database()
    collection_name = dbname["users"]

    collection_name.update_one(
        {"username" : user},
        {"$pull": {"videos": {"videoID": {"$gte": 5}}}}
    )
    return None

if __name__ == "__main__":
    delete_video("capstone", 5)
