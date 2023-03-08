from flask import Flask, session, render_template,request,redirect,jsonify,Blueprint
import pyrebase
from firebase_admin import credentials, firestore
import firebase_admin
import sys
import os
import re
import dns.resolver

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
db=firestore.client()
userdb1_ref = db.collection('userdb1')


@RegisterRoutes.route('/register',methods=['POST'])
def register():
     
        name = request.json.get('fullname')
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')


        #check for duplicate username/email, then check if email is valid
        
        if len(userdb1_ref.where('username', '==',username).limit(1).get()) == 1:
            return jsonify({'message': 'username is taken'})
        elif len(userdb1_ref.where('email', '==',email).limit(1).get()) == 1:
            return jsonify({'message': 'email is taken'})
        else:
            try:
                if email:
                    domain = email.split('@')[1]
                    dns.resolver.query(domain, 'MX')

                    data = {
                        'name': name,
                        'username': username,
                        'password': password,
                        'email': email
                    }
                    message = 'Registration successful'

                    response = {
                        'message':message,
                        'data':data
                    }
                    #create user
                    doc_ref = userdb1_ref.document(username)
        
                    
                    auth.create_user_with_email_and_password(email,password)
                    doc_ref.set({
                    'name': name,
                    'username': username,
                    'password': password,
                    'email': email
                    }, merge=True)
                    return jsonify(response)
                else:
                    return jsonify({'message': 'email is invalid'})
                     
            except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
                return jsonify({'message': 'email is invalid'})
            

@RegisterRoutes.route('/create_profile',methods=['POST','GET'])
def create_profile():
    if request.method == 'GET':
        session['user'] = request.args.get('username')
        username = session.get('user')
        print(username)
    elif request.method == 'POST':
        data = request.get_json()
        username = data['username']
        gender = data['gender']
        birthday = data['birthday']
        organization = data['organization']
        aboutme = data['aboutme']
        educationLevel = data['educationLevels']
        learningStyle = data['learningStyles'] 
        studyInterests = data['studyInterests']
        #edit their profile 
        doc_ref = userdb1_ref.document(username)
        
        doc_ref.set({
        'gender': gender,
        'birthday': birthday,
        'organization': organization,
        'about_me': aboutme,
        'educationLevel': educationLevel,
        'learningStyle': learningStyle,
        'studyInterests': studyInterests
         }, merge=True)
        
        #print(username)
        
        print("username:",username, gender,birthday,organization,aboutme,educationLevel,learningStyle,studyInterests)
        return jsonify({'message': 'profile creation sent'})

  # Your code to create the profile...
