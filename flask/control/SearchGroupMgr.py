from flask import Flask, session, render_template,request,redirect,jsonify,Blueprint
import pyrebase
from firebase_admin import credentials, firestore
import firebase_admin
import sys
import os
import re

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from entity.user import User

FindGroupRoutes = Blueprint('FindGroupRoutes', __name__)
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
grpdb1_ref = db.collection('groupdb1')


@FindGroupRoutes.route('/find_groups',methods=['POST'])
def find_groups():
    #subname = request.json.get('searchText')
    subname = "hi"  #hardcode first
    if len(subname) > 0:    #user searched something
        query = grpdb1_ref.where('name', 'array-contains',subname)
        results1 = query.get()
        if len(results1) == 0:
            return jsonify({'message': 'No such Group'})

    else:   #user did not search so retrieve entire databases
         results1 = grpdb1_ref.get()  

    #Get the filters chosen
    #filterTags = request.json.get('filterTags')  #dictionary
    filterTags = {subjects:[], educationLevels:[], learningStyles:[], regions:[]}  #hardcode first
    subjects = filterTags["subjects"]  #array
    educationLevels = filterTags["educationLevels"]
    learningStyles = filterTags["learningStyles"]
    regions = filterTags["regions"]

    if not (len(subjects) or len(educationLevels) or len(learningStyles) or len(regions)):  #no filters selected
        return jsonify({'message': 'No such Group'})

    #filter each category
    query = results1.where('subjects', 'array-contains',subjects)
    results2 = query.get()
    if len(results2) == 0:
        return jsonify({'message': 'No such Group'})
    
    query = results2.where('educationLevels', '==',educationLevels)
    results3 = query.get()
    if len(results3) == 0:
        return jsonify({'message': 'No such Group'})
    
    query = results3.where('learningStyles', '==',learningStyles)
    results4 = query.get()
    if len(results4) == 0:
        return jsonify({'message': 'No such Group'})
    
    query = results4.where('regions', '==',regions)
    results5 = query.get()
    if len(results5) == 0:
        return jsonify({'message': 'No such Group'})
    
    #got groups that fufill criteria
    for group in results5:
        jsonify({'message': group.get('name')})

