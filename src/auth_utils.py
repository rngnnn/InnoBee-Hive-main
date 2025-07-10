import jwt
from flask import request, jsonify
from functools import wraps
from mongoDB import get_database  # Import database connection function

# Connect to the MongoDB database
db = get_database()
users_collection = db['users']

# Decorator to check JWT token
def token_required(app_secret_key):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({"error": "Token is missing!"}), 403
            try:
                data = jwt.decode(token, app_secret_key, algorithms=["HS256"])
                current_user = users_collection.find_one({"_id": data['user_id']})
                if not current_user:
                    return jsonify({"error": "User not found!"}), 404
            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token has expired!"}), 403
            except jwt.InvalidTokenError:
                return jsonify({"error": "Invalid token!"}), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator