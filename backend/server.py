from flask import Flask, jsonify, request
import tensorflow as tf
from tensorflow import keras
from keras import models
import numpy as np
import os
from flask_cors import CORS
from flask_socketio import SocketIO, emit
#--------------------------------------------------------COMMANDS FOR WINDOWS
#deactivate to exit env
#.\env\scripts\activate to reenter env

#need to pip install tensorflow (may get error since its development env, you need to just enable long path on windows)

#to run server, "python -m flask --app .\server.py run"
#--------------------------------------------------------

app = Flask(__name__)
CORS(app)
app.config['Key'] = 'Key'
socketio = SocketIO(app, cors_allowed_origins="*")

model = None
data_dir = '.\\modelbase\\data'
image_size = (256, 256)

def load_model():
    global model
    model = models.load_model('..\\models\\realAiModel.h5') #make sure the relative path is correct, just clicking relative path doesnt work
    print("Model loaded successfully!")


@app.route('/') #route decorator
def index():
    return 'Hello World'

# summary: initializes the binary classification model already stored.
@app.route('/initialize', methods=['POST'])
def initialize():
    """Initialize or reload the model."""
    try:
        load_model()
        return jsonify({"message": "Model initialized successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#summary: endpoint for predicting the label of an image. (real, or ai) Image retrieved from request, and predicted.
@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint to predict using the model."""
    if model is None:
        return jsonify({"error": "Model is not initialized."}), 400
    
    try:
        image_data = request.files['image']     #retrieve specific file from the request.files object. Matches name attribute of file input field, change later
        img = tf.image.decode_image(image_data.read(), channels=3)
        img = tf.image.resize(img, (256, 256))
        img = np.expand_dims(img / 255.0, axis=0)
        
        prediction = model.predict(img)
        return jsonify({"prediction": prediction.tolist()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#summary: socket io connection event and pass off user info to all connected clients
@socketio.on("connect")
def handle_connect(data):
    emit("usersconnected", data, broadcast=True)

#summary: socket io disconnect event
@socketio.on("disconnect")
def handle_disconnect(data):
    emit("usersdisconnected", data , broadcast=True)
    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')