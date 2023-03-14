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
    subname = ""  #hardcode first
    if len(subname) > 0:    #user searched something
        #query = grpdb1_ref.where('name', 'array_contains',subname)
        #query = grpdb1_ref.orderByChild('name').startAt(subname).endAt(subname+"~")
        #results1 = query.get()

        toSearch = []
        data = grpdb1_ref.where('privacy', '==', 'Public').get()
        for doc in data:
            name = doc.get('name')
            priv = doc.get('privacy')
            if subname in name:   
                toSearch.append(name)

        if len(toSearch) > 0:
            results1 = grpdb1_ref.where('name', 'in', toSearch) 
            #return jsonify({'message': 'Group found'})

        else:  #toSearch is empty
            return jsonify({'message': 'No such Group - search'})
    
            

    else:   #user did not search so retrieve entire databases
         results1 = grpdb1_ref.where('privacy', '==', 'Public')
         #return jsonify({'message': 'Group found'})

    #Get the filters chosen
    #filterTags = request.json.get('filterTags')  #array of strings
    filterTags = ["chemistry"]  #hardcode first
    toSearch = []

    data = results1.get()
    for doc in data:
        subjects = doc.get('subjects') 
        educationLevels = doc.get('education_level')
        learningStyles = doc.get('learning_style')
        regions = doc.get('region')

        allChara = subjects + educationLevels + learningStyles + regions

        if set(filterTags).issubset(set(allChara)):
            toSearch.append(doc.get('name'))

    if len(toSearch) > 0:
        query = results1.where('name', 'in', toSearch)
        results2 = query        #results1 = query.get()
        #return jsonify({'message': 'Group found'})

    else:  #toSearch is empty
        return jsonify({'message': 'No such Group - search2'})

  
    if len(results2.get()) > 0:
        return jsonify({'message': 'Group found'})
