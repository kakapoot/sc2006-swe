from flask import Flask, session, render_template,request,redirect,jsonify,Blueprint
import pyrebase
from firebase_admin import credentials, firestore
import firebase_admin
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from entity.user import User

RegisterRoutes = Blueprint('RegisterRoutes', __name__)
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