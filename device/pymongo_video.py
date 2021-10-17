from pymongo import MongoClient

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://Steven:cuOKOVR6J0uT7ytt@cluster.d9abx.mongodb.net/Users?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Default database for user data
    return client['Users']

def new_video(collection, user, video):

    collection.update_one(
        {"email" : user},
        {"$push": {"videos": video}}
    )

    return None