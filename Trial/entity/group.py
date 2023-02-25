import pyrebase
from firebase_admin import credentials, firestore, initialize_app

class Group:
    def __init__(self, name, group_code=None, privacy=None, capacity=None, study_area=None, description=None, subjects=None, education_level=None, region=None, learning_style=None, members=None):
        self.name = name
        self.group_code = group_code
        self.privacy = privacy
        self.capacity = capacity
        self.study_area = study_area
        self.description = description
        self.subjects = subjects or []
        self.education_level = education_level
        self.region = region
        self.learning_style = learning_style
        self.members = members or []
        
        # initialize Firestore client
        self.db = firestore.Client()
        
        # set document reference to user's username
        
        self.doc_ref = self.db.collection('groupdb1').document(self.group_code)
        # create new document with default fields
        if not self.doc_ref.get().exists:
            self.doc_ref.set({
                    'name': self.name,
                    'group_code': group_code,
                    'privacy': self.privacy,
                    'capacity': self.capacity,
                    'study_area': self.study_area,
                    'description': self.description,
                    'subjects': self.subjects,
                    'education_level': self.education_level,
                    'region': self.region,
                    'learning_style': self.learning_style,
                    'members': self.members
            })
    
    # setters that update database and change document reference if username is changed
    def set_username(self, group_code):
        if group_code != self.group_code:
            # delete old document
            self.db.collection('groupdb1').document(self.group_code).delete()
            
            # create new document with new username
            self.group_code=group_code
            if not self.doc_ref.get().exists:
                self.group_code=group_code
                self.doc_ref = self.db.collection('groupdb1').document(self.group_code)
                self.doc_ref.set({
                    'name': self.name,
                    'group_code': group_code,
                    'privacy': self.privacy,
                    'capacity': self.capacity,
                    'study_area': self.study_area,
                    'description': self.description,
                    'subjects': self.subjects,
                    'education_level': self.education_level,
                    'region': self.region,
                    'learning_style': self.learning_style,
                    'members': self.members
                })
    
    def set_name(self, name):
        self.doc_ref.update({'name': name})
        self.name = name
    
    def set_privacy(self, privacy):
        self.doc_ref.update({'privacy': privacy})
        self.privacy = privacy

    def set_capacity(self, capacity):
        self.doc_ref.update({'capacity': capacity})
        self.capacity = capacity

    def set_study_area(self, email):
        self.doc_ref.update({'email': email})
        self.email = email

    def set_description(self, description):
        self.doc_ref.update({'description': description})
        self.description = description

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

    def set_region(self, region):
        self.doc_ref.update({'region': region})
        self.region = region

    def set_learning_style(self, learning_style):
        self.doc_ref.update({'learning_style': learning_style})
        self.learning_style = learning_style
    
    def set_members(self, members):
        if isinstance(members, list):
            self.members.extend(members)
        else:
            self.members.append(members)

        self.doc_ref.update({'members': self.members})
        

    def remove_members(self, members):
        if isinstance(members, list):
            for i in members:
                if i in self.members:
                    self.members.remove(i)
        else:
            self.members.remove(members)

        self.doc_ref.update({'members': self.members})
    
    # getters
    def get_name(self):
        return self.name

    def get_group_code(self):
        return self.group_code

    def get_privacy(self):
        return self.privacy

    def get_capacity(self):
        return self.capacity

    def get_study_area(self):
        return self.study_area

    def get_description(self):
        return self.description

    def get_subjects(self):
        return self.subjects

    def get_education_level(self):
        return self.education_level

    def get_region(self):
        return self.region

    def get_learning_style(self):
        return self.learning_style

    def get_members(self):
        return self.members

