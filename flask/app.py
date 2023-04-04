from firebase_admin import credentials, firestore
import firebase_admin
import os
import pyrebase
from flask import Flask
from flask_cors import CORS


dir_path = os.path.abspath(os.path.dirname(__file__))
parent_path = os.path.abspath(os.path.join(dir_path, os.pardir))
cred = credentials.Certificate(dir_path + "/key/key.json")

firebase_admin.initialize_app(cred)

db = firestore.client()
config = {
    "apiKey": "AIzaSyC2KQ5F1GnZy5vb7lYdud2kPdGZYpOueXE",
    "authDomain": "sc2006-temp.firebaseapp.com",
    "databaseURL": "https://sc2006-temp-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "sc2006-temp",
    "storageBucket": "sc2006-temp.appspot.com",
    "messagingSenderId": "536059698645",
    "appId": "1:536059698645:web:5ba6c948cc9cbc3ee3b15c",
    "measurementId": "G-FERZP9VZ9T",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firestore.client()

userdb = db.collection("userdb")
groupdb = db.collection("groupdb")
tagdb = db.collection("tagdb")
placedb = db.collection("placedb")
cachedplacedb = db.collection("cachedplacedb")

# GOOGLE_APPLICATION_CREDENTIALS = dir_path + "/key/application_default_credentials.json"
# os.environ["GCLOUD_PROJECT"] = "sc2006-temp"


# initialise flask app
app = Flask(__name__)
CORS(app)
app.secret_key = "secret"
app.config["SESSION_TYPE"] = "filesystem"

from control.GroupMgr import GroupRoutes
from control.Util import UtilRoutes
from control.UserMgr import UserRoutes
from control.StudyAreaMgr import StudyAreaRoutes


app.register_blueprint(UtilRoutes)
app.register_blueprint(GroupRoutes)
app.register_blueprint(UserRoutes)
app.register_blueprint(StudyAreaRoutes)


if __name__ == "__main__":
    app.run(debug=True)
