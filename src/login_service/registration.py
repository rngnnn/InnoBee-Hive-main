

import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

import mongoDB

from datetime import datetime

def register_user():
    # Get the database connection
    db = mongoDB.get_database()
    users_collection = db['users']  # Collection to store user data

    # Input user details
    name = input("Enter your name: ")
    email = input("Enter your email: ")
    password = input("Enter your password: ")

    # Check if the email already exists
    if users_collection.find_one({"email": email}):
        print("Error: Email already registered!")
        return

    # Save user data
    user_data = {
        "name": name,
        "email": email,
        "password": password,  # Ideally, hash this password before storing
        "created_at": datetime.utcnow()  # Add a timestamp
    }

    # Insert the document into the collection
    result = users_collection.insert_one(user_data)
    print(f"User registered successfully! ID: {result.inserted_id}")

if __name__ == "__main__":
    register_user()