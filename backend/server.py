from flask import Flask, jsonify, request
import tensorflow as tf
from tensorflow import keras
import numpy as np
import os
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from bson import Binary
import shutil
import cv2                  #opencv computer vision stuff
import imghdr               #determines the type of image
from matplotlib import pyplot as plt
from keras import Sequential, layers, metrics, models

#--------------------------------------------------------COMMANDS FOR WINDOWS
#deactivate to exit env
#.\env\scripts\activate to reenter env

#need to pip install tensorflow (may get error since its development env, you need to just enable long path on windows)

#to run server, "python -m flask --app .\server.py run"
#--------------------------------------------------------

app = Flask(__name__)

model = None
data_dir = '.\\modelbase\\data'
image_size = (256, 256)

CORS(app)
app.config['SECRET_KEY'] = 'Key'
socketio = SocketIO(app, cors_allowed_origins="*")

#establishing mongodb connection
mongo_client = MongoClient('mongodb://localhost:27017/')    #default connection string, shouldn't change
db = mongo_client['Images'] #replace with database name
collectionAi = db['aiImages']   #replace with collection name, mongodb's equivalent of a table
collectionReal = db['realImages'] 
collectionTest = db['testImages']



# model = None
# data_dir = '.\\modelbase\\data'
# image_size = (256, 256)

def load_model():
    global model
    model = models.load_model('.\\modelbase\\models\\realAiModel.h5') #make sure the relative path is correct, just clicking relative path doesnt work
    print("Model loaded successfully!")

@app.route('/') #route decorator
def index():
    return 'Hello World'

#summary: socket io connection event and pass off user info to all connected clients
@socketio.on("userConnect")
def handle_connect(data):
    emit("usersconnected", data, broadcast=True)
    print("Users connected: " + data)

#summary: socket io disconnect event
@socketio.on("userDisconnect")
def handle_disconnect(data):
    emit("usersdisconnected", data , broadcast=True)
    print("Users disconnected: " + data)
    
#summary: initializes the binary classification model already stored.
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
        image_binary = image_data.read()
        
        #store the image in MongoDB
        collectionTest.insert_one({
            'filename': image_data.filename,
            'content_type': image_data.content_type,
            'data': Binary(image_binary)        #***may need to use GridFS for files exceeding 16 MB
        })
        print('Image stored in MongoDB')

        img = tf.image.decode_image(image_binary, channels=3)
        img = tf.image.resize(img, (256, 256)) #need to convert the image to 256 256 to pass into model
        img = np.expand_dims(img / 255.0, axis=0)
        
        prediction = model.predict(img)
        return jsonify({"prediction": prediction.tolist()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def remakeDirAndSaveImages(directory_path):
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)
    else:
        #reset given directory
        reset_directory(directory_path)

    if(directory_path == '.\\modelbase\\data\\artificial' ):
        neededCollection = collectionAi
    elif(directory_path == '.\\modelbase\\data\\real' ):
        neededCollection = collectionReal
    else:
        neededCollection = collectionTest

    #fetch and save images from MongoDB
    for image_doc in neededCollection.find(): #NEED TO CHANGE THIS, NEEDS TO BE PROPER COLLECTION
        image_data = image_doc['data']
        filename = image_doc['filename']

        #convert binary data to numpy array
        nparr = np.frombuffer(image_data, np.uint8)

        #decode image using opencv
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is not None:

            #save the image to the specified directory
            output_path = os.path.join(directory_path, filename)
            cv2.imwrite(output_path, img)
            print(f'Saved image: {output_path}')
        else:
            print(f'Failed to decode image: {filename}')

#code for resetting a given directory (deletes it and remakes if exists, makes if doesnt exist)
def reset_directory(directory_path):
    """Delete the directory if it exists and recreate it."""
    #check if the directory exists
    if os.path.exists(directory_path):
        #remove the directory and all its contents
        shutil.rmtree(directory_path)           #this is having issues - cannot delete if other processes are accessing dir?
        print(f"Deleted existing directory: {directory_path}")

    #recreate the directory
    os.makedirs(directory_path)
    print(f"Recreated directory: {directory_path}")

def modelRetrainer():
    gpus = tf.config.experimental.list_physical_devices('GPU')
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
    print(len(gpus)) #no nvidia gpu unfortunately....

    data_dir = '.\\modelbase\\data'                               #directory name
    image_exts = ['jpeg', 'jpg', 'bmp', 'png']

    #delete dodgy files
    for image_class in os.listdir(data_dir):                    #image class is /happy or /sad
        for image in os.listdir(os.path.join(data_dir, image_class)):   #image is an image like sadness.jpg
            #print(image)
            image_path = os.path.join(data_dir, image_class, image)     #image path
            try:
                img = cv2.imread(image_path)                            #read the image using opencv, produces numpy array 
                tip = imghdr.what(image_path)                           #determines the image type
                if tip not in image_exts:
                    print('Image not in ext list {}'.format(image_path))
                    os.remove(image_path)                               #deletes the file
            except Exception as e:
                print('Issue with image {}'.format(image_path))         

    #load data into dataset (using tensorflow dataset api)
    data = tf.keras.utils.image_dataset_from_directory(data_dir)        #reads images from the directory, labels the images, decodes them into tensors and resizes them to a common shape, creates a dataset
    #print(data)

    # data_iterator = data.as_numpy_iterator()        #creates an iterator
    # batch = data_iterator.next()                    #grabbing a batch back from data pipeline
    #print(batch[1])                                 #len(batch) returns 2. A batch consists of samples, which are 1. the images loaded from the directories and 2. the labels
                                                    #prints [1 1 1 1 1 1 1 1 1 0 0 1 0 1 1 1 1 1 0 1 0 1 1 1 1 1 1 0 0 0 1 1], 1 and 0's assigned in alphabetical order
                                                    #hence, happy is assigned 0, sad assigned 1

    #scale data
    data = data.map(lambda x,y: (x/255, y))     #map will apply the anonymous function to each batch (an set of images and set of labels) for each set of images and labels, apply the transformation
    data_iterator = data.as_numpy_iterator()        #creates an iterator
    batch = data_iterator.next()                    #grabbing a batch back from data pipeline
    #print(batch)                                    #CAN MOVE THIS TO BEFORE TO MAKE SIMPLER

    print(len(data))    #how many batches are available

    #partitioning training set
    train_size = int(len(data)*.7) #setting size of the training model, validation model, and test model (70% of of the data)
    val_size = int(len(data)*.2)+1  #training data is going to be used to train the model, validation is used to validate the model (fine tune the model), test partition is used post training
    test_size = int(len(data)*.1)+1
    print(train_size, val_size, test_size) #should add up to the size of data object
                                        #2 * 32 + 1 * 32 + 1 * 32

    train = data.take(train_size)           #take defines how many batches we are going to take for that partition
    val = data.skip(train_size).take(val_size)  #skip the batches that we already allocated to the training partition, and allocate the next batches
    test = data.skip(train_size+val_size).take(test_size)

    #---------------------------------------------------------------    BUILDING THE CONVOLUTIONAL MODEL
    model = Sequential()

    #                convolution has 16 filters, 3 pixels by 3 pixels, a stride of 1 (moves forward by 1 pixel) ---you can changes these, these are architectural decisions
    #                relu activation just takes all of the output from a layer and passes it through a relu function
    #                the keras.utils.image_dataset_from_directory() function reshapes the images to this size
    model.add(layers.Conv2D(16, (3,3), 1, activation='relu', input_shape=(256,256,3)))         #adds a convolutional layer   (model.add adds layers) --- the first layer needs an input
    model.add(layers.MaxPooling2D())                                                           #adding max pooling layer   (scans across the relu activation and returns a number)
                                                                                        #*** maxpooling halves the input because it looks at a 2x2 block of input, and its stride is also 2x2
    model.add(layers.Conv2D(32, (3,3), 1, activation='relu'))  #32 filters, 3 by 3 pixels, stride of 1
    model.add(layers.MaxPooling2D())

    model.add(layers.Conv2D(16, (3,3), 1, activation='relu')) 
    model.add(layers.MaxPooling2D())

    model.add(layers.Flatten())                                #flattening the 3 layers down (from input shape you can see there are 3 channel values (RGB), flatten into 1)

    model.add(layers.Dense(256, activation='relu'))            #fully connected layers (condensing the output)
    model.add(layers.Dense(1, activation='sigmoid'))

    model.compile('adam', loss=tf.losses.BinaryCrossentropy(), metrics=['accuracy'])    #adam is the optimizer we want, loss is BinaryCrossentropy since its a binary classification problem
    model.summary()                                                                     #accuracy will tell us how well we are classifying as 0 or 1

    #------ TRAINING THE MODEL
    logdir='.\\modelbase\\logs'           #path to log directory
    tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=logdir)   #saves model at checkpoint, callback is not a callback function, in tensorflow its an object that can perform specific actions at various stages of training
                                                                            # at start or end of an epoch, before or after a single batch is processed, when training begins or ends
                                                                            #the checkpoint is important, because if you end up overtraining / overfitting and the accuracy worsens, you can return to previous checkpoint

    hist = model.fit(train, epochs=16, validation_data=val, callbacks=[tensorboard_callback])   #fit is the training method, predict is the prediction method
                    # train is the training data, epoch is how long we train for (1 epoch is 1 run over the dataset) 
                    #val is the validation data we set up before
                    #pass through callback


    #---------------------- EVALUATING PERFORMANCE
    # fig = plt.figure()
    # plt.plot(hist.history['loss'], color='teal', label='loss')      #takes an array and plots it on a graph
    # plt.plot(hist.history['val_loss'], color='orange', label='val_loss')    #loss quantifies the difference between the predicted values and true values. Accuracy is proportion of correct guesses
    # fig.suptitle('Loss', fontsize=20)
    # plt.legend(loc="upper left")
    # plt.show()

    # fig = plt.figure()
    # plt.plot(hist.history['accuracy'], color='teal', label='accuracy')      #takes an array and plots it on a graph
    # plt.plot(hist.history['val_accuracy'], color='orange', label='val_accuracy')    #loss quantifies the difference between the predicted values and true values. Accuracy is proportion of correct guesses
    # fig.suptitle('Loss', fontsize=20)
    # plt.legend(loc="upper left")
    # plt.show()

    pre = metrics.Precision()
    re = metrics.Precision()
    acc = metrics.BinaryAccuracy()

    for batch in test.as_numpy_iterator():
        X, y = batch
        yhat = model.predict(X)
        pre.update_state(y, yhat)
        re.update_state(y, yhat)
        acc.update_state(y, yhat)

    print(f'Precision:{pre.result().numpy()}, Recall:{re.result().numpy()}, Accuracy:{acc.result().numpy()}')


    img = cv2.imread('.\\modelbase\\aiart1.jpg')        #TEST IF YOU HAVE FILE
    # plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))              plt is not built for backend since it has GUI
    # plt.show() 

    resize = tf.image.resize(img, (256, 256))
    # plt.imshow(resize.numpy().astype(int))
    # plt.show()

    np.expand_dims(resize, 0)
    yhat = model.predict(np.expand_dims(resize/255, 0))     #the 
    print(yhat)


    #on startup, do a get request that launches this code. Then, each get req can do a model.predict


    model.save(os.path.join('.\\modelbase\\models', 'realAiModel.h5'))  #h5 is a serialization file format
    new_model = models.load_model(os.path.join('.\\modelbase\\models', 'realAiModel.h5'))

    print("xd")
    xhat = model.predict(np.expand_dims(resize/255, 0))     #the 
    print(xhat)

#FOR TESTING PURPOSES. DO NOT CHANGE test_dir TO ANY OTHER FILE PATH UNLESS NECESSARY.
@app.route('/testremake', methods=['POST'])
def testremake():
    """testing deleting directory"""

    test_dir = '.\\modelbase\\data\\artificial'

    remakeDirAndSaveImages(test_dir)
    return jsonify({"message": "Images successfully remade and saved."}), 200


@app.route('/retrain', methods=['POST'])
def retrain():
    #load the images into a new directory to use to train
    ai_dir = '.\\modelbase\\data\\artificial'  # Replace with your desired output directory
    real_dir = '.\\modelbase\\data\\real'

    #-----REMAKING AI DIRECTORY AND SAVING IMAGES
    remakeDirAndSaveImages(ai_dir)
    remakeDirAndSaveImages(real_dir)

    #retrains the model
    modelRetrainer()
    return jsonify({"message": "Model successfully retrained."}), 200


image_folder = '.\\modelbase\\data\\real'

#different file extentions means that we need to check before saving the image to mongoDB
def getContentType(file_path):
    extension = os.path.splitext(file_path)[1].lower()
    if extension in ['.jpg', '.jpeg']:
        return 'image/jpeg'
    elif extension == '.png':
        return 'image/png'
    elif extension == '.bmp':
        return 'image/bmp'
    else:
        return 'application/octet-stream'  #default type for unknown formats

def saveImageToMongo(file_path, collection):
    with open(file_path, 'rb') as f:
        data = f.read()
        filename = os.path.basename(file_path)
        content_type = getContentType(file_path)
        collection.insert_one({
            'filename': filename,
            'content_type': content_type, #dynamically assigning the content type using getContentType
            'data': Binary(data)
        })

#summary: for uploading single image ADD TO ACTUAL APP
@app.route('/uploadSingleImage', methods=['POST'])
def upload_single_image():
    try:
        # Ensure the image folder exists
        if not os.path.exists(image_folder):
            return jsonify({"error": "Image folder does not exist."}), 400
        
        if(image_folder == '..\\data\\artificial' ):
            neededCollection = collectionAi
        elif(image_folder == '..\\data\\real' ):
            neededCollection = collectionReal
        else:
            neededCollection = collectionTest

        # Iterate over files in the folder
        for filename in os.listdir(image_folder):
            file_path = os.path.join(image_folder, filename)

            # Only process files, ignore directories
            if os.path.isfile(file_path):
                saveImageToMongo(file_path, neededCollection)  #****CHANGE THIS COLLECTION DYNAMICALLY.

        return jsonify({"message": "All images have been uploaded to MongoDB."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#summary: endpoint to upload images to mongoDB  --NOTE: ONLY USE FOR INITIALIZING COLLECTIONS WITH DATASET. NOT FOR UPLOADING SINGLE FILES.
@app.route('/uploadImages', methods=['POST'])
def upload_images():
    try:
        # Ensure the image folder exists
        if not os.path.exists(image_folder):
            return jsonify({"error": "Image folder does not exist."}), 400
        
        #delete all existing documents in the collection TODO CHANGE
        neededCollection.delete_many({})

        if(image_folder == '.\\modelbase\\data\\artificial' ):
            neededCollection = collectionAi
        elif(image_folder == '.\\modelbase\\data\\real' ):
            neededCollection = collectionReal
        else:
            neededCollection = collectionTest

        # Iterate over files in the folder
        for filename in os.listdir(image_folder):
            file_path = os.path.join(image_folder, filename)

            # Only process files, ignore directories
            if os.path.isfile(file_path):
                saveImageToMongo(file_path, neededCollection)  #****CHANGE THIS COLLECTION DYNAMICALLY.

        return jsonify({"message": "All images have been uploaded to MongoDB."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#to run server, "python -m flask --app .\server.py run"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')