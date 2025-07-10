from pymongo import MongoClient

# Replace the <username>, <password>, <dbname>, and <your-cluster-url> with your details
connection_string = "mongodb+srv://DevTeam:dmdNL56OmiiAJb1exy@innobeehive.mgjtm.mongodb.net/?retryWrites=true&w=majority&appName=InnoBeeHive"

def get_database():
    # Replace the connection string with your MongoDB Atlas URI
    client = MongoClient(connection_string)
    try:
        # Connect to the database and return it
        db = client['user_database']  # Replace with your database name
        print("Connected to MongoDB Atlas")
        return db
    except Exception as e:
        print("Error connecting to MongoDB Atlas:", e)
        raise