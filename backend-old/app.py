from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "SocketIO Server"

@socketio.on('connect')
def handle_connect():
    emit('connected', {'message': 'User connected'}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    emit('disconnected', {'message': 'User disconnected'}, broadcast=True)

@socketio.on('authenticate')
def handle_authenticate(data):
    user_info = {
        'username': data.get('name'),
        'email': data.get('email'),
        'user_id': data.get('user_id')
    }
    emit('user_authenticated', user_info, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
