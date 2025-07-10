from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd
import os
import json
from datetime import timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
app.config['SECRET_KEY'] = 'your_secret_key_here222'
app.config['SESSION_COOKIE_NAME'] = 'session'
app.config['SESSION_COOKIE_SECURE'] = False  # Only send cookie over HTTPS.
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password'}), 400

    email = data['email'].strip()
    password = data['password'].strip()

    try:
        accounts_df = pd.read_excel('accounts.xlsx')
        accounts_df['Email'] = accounts_df['Email'].astype(str)
        accounts_df['Password'] = accounts_df['Password'].astype(str)

        user = accounts_df[(accounts_df['Email'].str.strip() == email) & (accounts_df['Password'].str.strip() == password)]

        if not user.empty:
            session['user_email'] = email
            session['logged_in'] = True
            return jsonify({'success': True}), 200
        else:
            return jsonify({'error': 'User/password combination does not exist'}), 404

    except FileNotFoundError:
        return jsonify({'error': 'Accounts file not found'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    email = session.get('user_email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        challenges_df = pd.read_excel('challenges.xlsx')
        user_challenges = challenges_df[challenges_df['Email'].str.strip() == email]

        if user_challenges.empty:
            return jsonify({'error': 'You have no challenge to manage, please create one first'}), 404

        challenge_ids = user_challenges['ChallengeID'].tolist()
        return jsonify({'challenge_ids': challenge_ids}), 200

    except FileNotFoundError:
        return jsonify({'error': 'Challenges file not found'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/load_data', methods=['POST'])
def load_data():
    data = request.get_json()
    challenge_id = data.get('challenge_id')

    if not challenge_id:
        return jsonify({'error': 'Missing challenge ID'}), 400

    email = session.get('user_email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        sections = ['Description', 'Timeline', 'Guidelines', 'FAQ', 'Updates', 'News', 'Metrics', 'SubmissionForm', 'JudgingCriteria', 'JudgingInstructions', 'Judges', 'LegalAgreement', 'Settings']
        result = {}

        for section in sections:
            file_name = f"{section}_{challenge_id}.xlsx"
            if os.path.exists(file_name):
                df = pd.read_excel(file_name)
                result[section] = df.to_dict(orient='records')

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/save_data', methods=['POST'])
def save_data():
    data = request.get_json()
    section = data.get('section')
    challenge_id = data.get('challenge_id')
    content = data.get('content')

    if not section or not challenge_id or content is None:
        return jsonify({'error': 'Missing data'}), 400

    try:
        df = pd.DataFrame(content)
        file_name = f"{section}_{challenge_id}.xlsx"
        df.to_excel(file_name, index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    email = session.get('user_email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        users_df = pd.read_excel('users.xlsx')
        users = users_df.to_dict(orient='records')
        return jsonify(users), 200

    except FileNotFoundError:
        return jsonify({'error': 'Users file not found'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send_notification', methods=['POST'])
def send_notification():
    data = request.get_json()
    subject = data.get('subject')
    message = data.get('message')
    group = data.get('group')

    if not subject or not message or not group:
        return jsonify({'error': 'Missing data'}), 400

    try:
        notifications_df = pd.DataFrame({
            'Subject': [subject],
            'Message': [message],
            'Group': [group],
            'Status': ['Sent'],
            'SentDate': [pd.Timestamp.now()],
            'Opened': [0],
            'TotalRecipients': [100],  # Placeholder value, replace with actual logic to count recipients
        })
        if os.path.exists('notifications.xlsx'):
            existing_df = pd.read_excel('notifications.xlsx')
            notifications_df = pd.concat([existing_df, notifications_df], ignore_index=True)

        notifications_df.to_excel('notifications.xlsx', index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get_notifications', methods=['GET'])
def get_notifications():
    try:
        notifications_df = pd.read_excel('notifications.xlsx')
        notifications = notifications_df.to_dict(orient='records')
        return jsonify(notifications), 200

    except FileNotFoundError:
        return jsonify({'error': 'Notifications file not found'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/judging_criteria', methods=['POST'])
def save_judging_criteria():
    data = request.get_json()
    challenge_id = data.get('challenge_id')
    criteria = data.get('criteria')

    if not challenge_id or not criteria:
        return jsonify({'error': 'Missing data'}), 400

    try:
        df = pd.DataFrame(criteria)
        file_name = f"JudgingCriteria_{challenge_id}.xlsx"
        df.to_excel(file_name, index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/judges', methods=['POST'])
def save_judges():
    data = request.get_json()
    challenge_id = data.get('challenge_id')
    judges = data.get('judges')

    if not challenge_id or not judges:
        return jsonify({'error': 'Missing data'}), 400

    try:
        df = pd.DataFrame(judges)
        file_name = f"Judges_{challenge_id}.xlsx"
        df.to_excel(file_name, index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/legal_agreement', methods=['POST'])
def save_legal_agreement():
    data = request.get_json()
    challenge_id = data.get('challenge_id')
    agreement = data.get('agreement')

    if not challenge_id or not agreement:
        return jsonify({'error': 'Missing data'}), 400

    try:
        df = pd.DataFrame([{'agreement': agreement}])
        file_name = f"LegalAgreement_{challenge_id}.xlsx"
        df.to_excel(file_name, index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/settings', methods=['POST'])
def save_settings():
    data = request.get_json()
    challenge_id = data.get('challenge_id')
    settings = data.get('settings')

    if not challenge_id or not settings:
        return jsonify({'error': 'Missing data'}), 400

    try:
        df = pd.DataFrame([settings])
        file_name = f"Settings_{challenge_id}.xlsx"
        df.to_excel(file_name, index=False)
        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
