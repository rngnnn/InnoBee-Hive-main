from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import mongoDB
from auth_utils import token_required  # Import the token_required decorator
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Define the Flask app
app = Flask(__name__)

# Set the secret key from the .env file
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Connect to the MongoDB database
db = mongoDB.get_database()
users_collection = db['users']

# Register endpoint
@app.route('/register', methods=['POST'])
def register_user():
    # Parse incoming JSON request
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check if the email already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    # Hash the password using pbkdf2:sha256 method
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Save user data
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }

    # Insert the document into the collection
    result = users_collection.insert_one(user_data)

    # Create JWT token
    token = jwt.encode({
        'user_id': str(result.inserted_id),
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        "message": "User registered successfully!",
        "user_id": str(result.inserted_id),
        "token": token
    }), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login_user():
    # Parse incoming JSON request
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return jsonify({"error": "Both email and password are required"}), 400

    # Find the user by email
    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Check if the password is correct
    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create JWT token
    token = jwt.encode({
        'user_id': str(user['_id']),
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        "message": "Login successful",
        "token": token
    })

# Example protected route
@app.route('/protected', methods=['GET'])
@token_required(app.config['SECRET_KEY'])  # Use the token_required decorator
def protected_route(current_user):
    return jsonify({
        "message": f"Welcome {current_user['name']}! This is a protected route."
    })