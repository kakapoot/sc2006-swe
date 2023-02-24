from entity.user import User
import pyrebase
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
import os

cred= credentials.Certificate("key/key.json")
firebase_admin.initialize_app(cred)

db=firestore.client()
config = {
    'apiKey': "AIzaSyDwu4cOwzt9YklyrbsLeSFT1XqDpdea9Ns",
    'authDomain': "sc2006-e3ff1.firebaseapp.com",
    'databaseURL': "https://sc2006-e3ff1-default-rtdb.asia-southeast1.firebasedatabase.app",
    'projectId': "sc2006-e3ff1",
    'storageBucket': "sc2006-e3ff1.appspot.com",
    'messagingSenderId': "79165116879",
    'appId': "1:79165116879:web:ff79ad07c1710be0d482ba"
  };
GOOGLE_APPLICATION_CREDENTIALS= './key/application_default_credentials.json'
os.environ["GCLOUD_PROJECT"] = "sc2006-e3ff1"

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

name = 'John Doe3'
username = 'john3'
email = 'johndoe@example.com1'
gender = 'male'
birthday = '1990-01-01'
organization = 'Example Company'
about = 'I am a software developer.'
subjects = ['Mathematics', 'Computer Science']
education_level = 'Bachelor\'s Degree'
learning_style = 'Visual'
groups = ['Study Group A', 'Programming Club']
data={'username':username,'email':email}

#db.collection('userdb1').document(username).set(data)

user1 = User(name, email, username, gender, birthday, organization, about, subjects, education_level, learning_style, groups)
# user1.set_username("john3")
print(user1.get_subjects())
user1.set_subjects("math")
print(user1.get_subjects())
user1.remove_subjects("math")
print(user1.get_subjects())
#db.collection('userdb1').document(username).delete()



#to delete all

# collection_ref = db.collection('userdb1')

# # retrieve list of all documents in collection
# docs = collection_ref.get()

# # delete each document
# for doc in docs:
#     doc.reference.delete()

# print(f"All documents in 'userdb1' collection have been deleted.")