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
    "apiKey": "AIzaSyDwu4cOwzt9YklyrbsLeSFT1XqDpdea9Ns",
    "authDomain": "sc2006-e3ff1.firebaseapp.com",
    "databaseURL": "https://sc2006-e3ff1-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "sc2006-e3ff1",
    "storageBucket": "sc2006-e3ff1.appspot.com",
    "messagingSenderId": "79165116879",
    "appId": "1:79165116879:web:ff79ad07c1710be0d482ba",
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
# os.environ["GCLOUD_PROJECT"] = "sc2006-e3ff1"


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
