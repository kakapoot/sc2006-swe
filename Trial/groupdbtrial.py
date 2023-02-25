from entity.group import Group
import pyrebase
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
import os

dir_path = os.path.abspath(os.path.dirname(__file__))

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

GOOGLE_APPLICATION_CREDENTIALS = dir_path + "/key/application_default_credentials.json"
os.environ["GCLOUD_PROJECT"] = "sc2006-e3ff1"

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

name = "Wholesome Study Group"
group_code = "ABCD"
privacy = "Private"
capacity = "20"
study_area = "Lee Kong Chian Reference Library"
description = "let's study hard together"
subjects = ["Physics", "Biology", "Chemistry"]
education_level = "University"
region = "Central"
learning_style = "Visual"
members = ["john3"]

group1 = Group(
    name,
    group_code,
    privacy,
    capacity,
    study_area,
    description,
    subjects,
    education_level,
    region,
    learning_style,
    members
)

print(group1.get_subjects())
group1.set_subjects("math")
print(group1.get_subjects())
group1.remove_subjects("math")
print(group1.get_subjects())
print(group1.get_members())
group1.set_members("jane3")
print(group1.get_members())
group1.remove_members("jane3")
print(group1.get_members())