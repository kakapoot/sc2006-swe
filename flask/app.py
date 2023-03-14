from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
import os

dir_path = os.path.abspath(os.path.dirname(__file__))
parent_path = os.path.abspath(os.path.join(dir_path, os.pardir))
cred = credentials.Certificate(dir_path + "/key/key.json")
firebase_admin.initialize_app(cred)

from entity import *

import pyrebase
from flask import Flask, session, render_template, request, redirect, jsonify
from flask_cors import CORS

# from flask_session import Session


dir_path = os.path.abspath(os.path.dirname(__file__))

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

GOOGLE_APPLICATION_CREDENTIALS = dir_path + "/key/application_default_credentials.json"
os.environ["GCLOUD_PROJECT"] = "sc2006-e3ff1"


# initialise flask app
app = Flask(__name__)
CORS(app)
app.secret_key = "secret"
app.config["SESSION_TYPE"] = "filesystem"

from control.LoginMgr import LoginRoutes
from control.RegisterMgr import RegisterRoutes
from control.GroupMgr import FindGroupRoutes
from control.Util import UtilRoutes
from control.GroupMgr import GroupRoutes
from control.UserMgr import UserRoutes

app.register_blueprint(RegisterRoutes)
app.register_blueprint(LoginRoutes)
app.register_blueprint(FindGroupRoutes)
app.register_blueprint(UtilRoutes)
app.register_blueprint(GroupRoutes)
app.register_blueprint(UserRoutes)


if __name__ == "__main__":
    app.run(debug=True)
