from login_service.api import app

if __name__ == "__main__":
    # Run the Flask application on localhost (127.0.0.1) and port 8000
    app.run(host="127.0.0.1", port=8000, debug=True)