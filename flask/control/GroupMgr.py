from flask import request, jsonify, Blueprint
from app import auth, db, userdb, groupdb
from firebase_admin import firestore

GroupRoutes = Blueprint("GroupRoutes", __name__)
FindGroupRoutes = Blueprint("FindGroupRoutes", __name__)

grpdb1_ref = db.collection("groupdb1")


@FindGroupRoutes.route("/find_groups", methods=["POST"])
def find_groups():
    # subname = request.json.get('searchText')
    subname = ""  # hardcode first
    if len(subname) > 0:  # user searched something
        # query = grpdb1_ref.where('name', 'array_contains',subname)
        # query = grpdb1_ref.orderByChild('name').startAt(subname).endAt(subname+"~")
        # results1 = query.get()

        toSearch = []
        data = grpdb1_ref.where("privacy", "==", "Public").get()
        for doc in data:
            name = doc.get("name")
            priv = doc.get("privacy")
            if subname in name:
                toSearch.append(name)

        if len(toSearch) > 0:
            results1 = grpdb1_ref.where("name", "in", toSearch)
            # return jsonify({'message': 'Group found'})

        else:  # toSearch is empty
            return jsonify({"message": "No such Group - search"})

    else:  # user did not search so retrieve entire databases
        results1 = grpdb1_ref.where("privacy", "==", "Public")
        # return jsonify({'message': 'Group found'})

    # Get the filters chosen
    # filterTags = request.json.get('filterTags')  #array of strings
    filterTags = ["chemistry"]  # hardcode first
    toSearch = []

    data = results1.get()
    for doc in data:
        subjects = doc.get("subjects")
        educationLevels = doc.get("education_level")
        learningStyles = doc.get("learning_style")
        regions = doc.get("region")

        allChara = subjects + educationLevels + learningStyles + regions

        if set(filterTags).issubset(set(allChara)):
            toSearch.append(doc.get("name"))

    if len(toSearch) > 0:
        query = results1.where("name", "in", toSearch)
        results2 = query  # results1 = query.get()
        # return jsonify({'message': 'Group found'})

    else:  # toSearch is empty
        return jsonify({"message": "No such Group - search2"})

    if len(results2.get()) > 0:
        return jsonify({"message": "Group found"})


@GroupRoutes.route("/update_group", methods=["GET", "POST"])
def update_group():
    if request.method == "GET":
        data = []
        docs = groupdb.stream()
        for doc in docs:
            data.append(doc.to_dict())
        print(data)
        return jsonify(data)

    elif request.method == "POST":
        data = request.get_json()
        groupId = data["groupId"]

        doc_ref = groupdb.document(groupId)
        doc_ref.update(data)

        return jsonify({"message": "group updated"})
    
    
@GroupRoutes.route("/create_group", methods=["POST"])
def create_group():
    data = request.get_json()
    username = data['username']
    doc_ref = groupdb.document()
    doc_ref.set(data)
    doc_ref.update({
        'groupId': doc_ref.id,
        'owner' : username,
    })
    doc = doc_ref.get()
    current_array = doc.to_dict().get('members', [])

    # Append the new value to the array
    updated_array = current_array + [username]

    # Update the document with the new array value
    doc_ref.update({
        'members': updated_array
    })
    
    doc_ref.update({
    'username': firestore.DELETE_FIELD
    })
    
    return jsonify({"message": "group created"})


@GroupRoutes.route("/get_group/<groupId>", methods=["GET"])
def get_group(groupId):
    if request.method == "GET":
        group_doc_ref = groupdb.document(groupId)
        group_doc = group_doc_ref.get()
        if group_doc.exists:
            return jsonify(group_doc.to_dict())


@GroupRoutes.route("/get_group_members/<groupId>", methods=["GET"])
def get_group_members(groupId):
    if request.method == "GET":
        group_doc_ref = groupdb.document(groupId)
        group_doc = group_doc_ref.get()

        members = group_doc.get("members")

        membersData = []
        # firestore has an array size limit of 10 for the "in" query, so have to split into chunks
        chunkSize = 10

        chunks = [
            members[item : item + chunkSize]
            for item in range(0, len(members), chunkSize)
        ]

        for chunk in chunks:
            docs = userdb.where("username", "in", chunk).get()
            for doc in docs:
                data = doc.to_dict()
                membersData.append(
                    {
                        "username": data["username"],
                        "name": data["name"],
                        "organization": data["organization"],
                    }
                )

        return jsonify({"members": membersData})
