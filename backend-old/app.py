# app.py

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['KEY'] = 'key'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('typing')
def handle_typing(data):
    emit('typing', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
