import pyrebase
from firebase_admin import credentials, firestore, initialize_app

class User:
    def __init__(self, name, email, username, gender=None, birthday=None, organization=None, about=None, subjects=None, education_level=None, learning_style=None, groups=None):
        self.name = name
        self.email = email
        self.username = username
        self.gender = gender
        self.birthday = birthday
        self.organization = organization
        self.about = about
        self.subjects = subjects or []
        self.education_level = education_level
        self.learning_style = learning_style
        self.groups = groups or []
        
        # initialize Firestore client
        self.db = firestore.Client()
        
        # set document reference to user's username
        
        self.doc_ref = self.db.collection('userdb1').document(self.username)
        # check if user exists in database, if not create new document with default fields
        if not self.doc_ref.get().exists:
            self.doc_ref.set({
                'name': self.name,
                'username': self.username,
                'gender': self.gender,
                'birthday': self.birthday,
                'organization': self.organization,
                'about': self.about,
                'subjects': self.subjects,
                'education_level': self.education_level,
                'learning_style': self.learning_style,
                'groups': self.groups
            })
    
    # setters that update database and change document reference if username is changed
    def set_username(self, username):
        if username != self.username:
            # delete old document
            self.db.collection('userdb1').document(self.username).delete()
            
            # create new document with new username
            self.username=username
            if not self.doc_ref.get().exists:
                self.username=username
                self.doc_ref = self.db.collection('userdb1').document(self.username)
                self.doc_ref.set({
                    'name': self.name,
                    'username': self.username,
                    'gender': self.gender,
                    'birthday': self.birthday,
                    'organization': self.organization,
                    'about': self.about,
                    'subjects': self.subjects,
                    'education_level': self.education_level,
                    'learning_style': self.learning_style,
                    'groups': self.groups
                })
            
            
    
    def set_email(self, email):
        self.doc_ref.update({'email': email})
        self.email = email
    
    def set_gender(self, gender):
        self.doc_ref.update({'gender': gender})
        self.gender = gender
    
    def set_birthday(self, birthday):
        self.doc_ref.update({'birthday': birthday})
        self.birthday = birthday
    
    def set_organization(self, organization):
        self.doc_ref.update({'organization': organization})
        self.organization = organization
    
    def set_about(self, about):
        self.doc_ref.update({'about': about})
        self.about = about
    
    def set_subjects(self, subjects):
        if isinstance(subjects,list):
            self.subjects.extend(subjects)
        else:
            self.subjects.append(subjects)

        self.doc_ref.update({'subjects': subjects})
        

    def remove_subjects(self, subjects):
        
        if isinstance(subjects,list):
            for i in subjects:
                if i in self.subjects:
                    self.subjects.remove(i)
        else:
            self.subjects.remove(subjects)

        self.doc_ref.update({'subjects': subjects})
        

    def set_education_level(self, education_level):
        self.doc_ref.update({'education_level': education_level})
        self.education_level = education_level
    
    def set_learning_style(self, learning_style):
        self.doc_ref.update({'learning_style': learning_style})
        self.learning_style = learning_style
    
    def set_groups(self, groups):
        if isinstance(groups, list):
            self.groups.extend(groups)
        else:
            self.groups.append(groups)

        self.doc_ref.update({'groups': self.groups})
        

    def remove_groups(self, groups):
        if isinstance(groups, list):
            for i in groups:
                if i in self.groups:
                    self.groups.remove(i)
        else:
            self.groups.remove(groups)

        self.doc_ref.update({'groups': self.groups})
    
    # getters 
    def get_username(self):
        return self.username
    
    def get_email(self):
        return self.email
    
    def get_username(self):
        return self.username

    def get_gender(self):
        return self.gender
    
    def get_birthday(self):
        return self.birthday
    
    def get_organization(self):
        return self.organization
    
    def get_about(self):
        return self.about
    
    def get_subjects(self):
        return self.subjects
    
    def get_education_level(self):
        return self.education_level
    
    def get_learning_style(self):
        return self.learning_style
    
    def get_groups(self):
        return self.groups
    
   
