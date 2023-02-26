from flask import Flask, session, render_template,request,redirect,jsonify,Blueprint
import pyrebase
from firebase_admin import credentials, firestore
import firebase_admin
import sys
import os

#sys.path.insert(0, '../entity')
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from entity.user import User



LoginRoutes = Blueprint('LoginRoutes', __name__)
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
db=firestore.client()
userdb1_ref = db.collection('userdb1')

@LoginRoutes.route('/')
def test():
    return 'server is running'

@LoginRoutes.route('/login',methods=['POST'])
def login():
     if('user' in session):
         return 'Hi, {}'.format(session['user'])
     else:
        username = request.json.get('username')
        password = request.json.get('password')

        query = userdb1_ref.where('username', '==',username).limit(1)
        results = query.get()
        if len(results) == 0:
            return jsonify({'message': 'Username not found'})
        else:
            for result in results:
                email = result.get('email')
            try:
                user = auth.sign_in_with_email_and_password(email,password)
                session['user']=username
                return jsonify({'message': 'login successful'})
            except:
                return jsonify({'message': 'username found, wrong password'})


# test with username: User1 , Password: 123456        
        
@LoginRoutes.route('/logout')
def logout():
   # remove the username from the session if it is there
   session.pop('user', None) 


