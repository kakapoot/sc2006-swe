from flask import request, jsonify, Blueprint
from app import auth, db, userdb, groupdb
from firebase_admin import firestore
import json

GroupRoutes = Blueprint("GroupRoutes", __name__)
FindGroupRoutes = Blueprint("FindGroupRoutes", __name__)


###################################################################################################################################


@FindGroupRoutes.route("/find_groups", methods=["POST"])
def find_groups():
    if request.method == "POST":
        data = request.get_json()
        subname = data["searchText"]
        filterTags = data["filterTags"]

    if len(subname) > 0:  # user searched something
        toSearch = []
        data = groupdb.where("privacy", "==", "public").get()
        for doc in data:
            name = doc.get("name")
            if subname in name:
                toSearch.append(name)

        if len(toSearch) > 0:
            results1 = groupdb.where("name", "in", toSearch)

        else:  # toSearch is empty
            return jsonify({})

    else:  # user did not search so retrieve entire databases
        results1 = groupdb.where("privacy", "==", "public")

    # filter data
    toSearch = []
    data = results1.get()
    for doc in data:
        tags = doc.get("tags")
        subjects = tags["subjects"]
        educationLevels = tags["educationLevels"]
        learningStyles = tags["learningStyles"]
        regions = tags["regions"]

        allChara = subjects + educationLevels + learningStyles + regions

        if set(filterTags).issubset(set(allChara)):
            toSearch.append(doc.get("name"))

    if len(toSearch) > 0:
        query = results1.where("name", "in", toSearch)
        results2 = query

    else:  # toSearch is empty
        return jsonify({})

    if len(results2.get()) > 0:
        # return json file with filtered groups' data
        filtered = results2.get()
        groups = []

        for doc in filtered:
            data = doc.to_dict()
            groups.append(
                {
                    "capacity": data["capacity"],
                    "description": data["description"],
                    "groupId": data["groupId"],
                    "members": data["members"],
                    "name": data["name"],
                    "owner": data["owner"],
                    "privacy": data["privacy"],
                    "studyArea": data["studyArea"],
                    "tags": data["tags"],
                }
            )
        return jsonify({"groups": groups})


###################################################################################################################################


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


# gets the username, name and organization of all users in the given group
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

@GroupRoutes.route("/get_my_groups/<username>", methods=["GET"])
def get_groups(username):
    # Use a query to retrieve documents where the "members" field contains the user's ID
    query = groupdb.where('members', 'array_contains', username)
    docs = query.stream()
    
    # Create a list to store the details of each group
    groups = []
    
    
    # Loop through the documents and append their data to the "groups" list
    for doc in docs:
        group_data = doc.to_dict()
        groups.append(group_data)
    
    # Return the "groups" list as a JSON response
    if len(groups) == 0:
        return jsonify({'message': 'You are not a member of any group.'}), 404
    else:
        return jsonify(groups)