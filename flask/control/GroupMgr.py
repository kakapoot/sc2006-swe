from flask import request, jsonify, Blueprint
from app import auth, db, userdb, groupdb
from firebase_admin import firestore

GroupRoutes = Blueprint("GroupRoutes", __name__)


@GroupRoutes.route("/find_groups", methods=["POST"])
def find_groups():
    """
    This function returns groups
    that match the search text and filter tags
    """
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


@GroupRoutes.route("/update_group", methods=["POST"])
def update_group():
    """
    This function updates group details in firestore
    based on the parameters provided in the form given
    """
    data = request.get_json()
    groupId = data["groupId"]

    doc_ref = groupdb.document(groupId)
    doc_ref.update(data)

    return jsonify({"message": "group updated"})


@GroupRoutes.route("/create_group", methods=["POST"])
def create_group():
    """
    This function creates a group document in firestore
    based on the parameters provided in the form given
    """
    data = request.get_json()
    username = data["username"]
    doc_ref = groupdb.document()
    doc_ref.set(data)
    doc_ref.update(
        {
            "groupId": doc_ref.id,
            "owner": username,
        }
    )
    doc = doc_ref.get()
    current_array = doc.to_dict().get("members", [])

    # Append the new value to the array
    updated_array = current_array + [username]

    # Update the document with the new array value
    doc_ref.update({"members": updated_array})

    doc_ref.update({"username": firestore.DELETE_FIELD})

    return jsonify({"message": "group created", "groupId": doc_ref.id})


@GroupRoutes.route("/get_group/<groupId>", methods=["GET"])
def get_group(groupId):
    """
    This function returns the details of
    a group document stored in firestore based on
    the unique groupId given
    """
    if request.method == "GET":
        group_doc_ref = groupdb.document(groupId)
        group_doc = group_doc_ref.get()
        if group_doc.exists:
            return jsonify(group_doc.to_dict())


@GroupRoutes.route("/get_group_members/<groupId>", methods=["GET"])
def get_group_members(groupId):
    """
    This function returns the username, name
    and organization of all users in a group
    based on the unique groupId given
    """
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
    """
    This function returns the groups of a
    user based on the given unique username
    """
    # Use a query to retrieve documents where the "members" field contains the user's ID
    query = groupdb.where("members", "array_contains", username)
    docs = query.stream()

    # Create a list to store the details of each group
    groups = []

    # Loop through the documents and append their data to the "groups" list
    for doc in docs:
        group_data = doc.to_dict()
        groups.append(group_data)

    # Return the "groups" list as a JSON response
    if len(groups) == 0:
        return jsonify({"message": "You are not a member of any group."}), 404
    else:
        return jsonify({"groups": groups}), 200


@GroupRoutes.route("/join_private_group", methods=["POST"])
def join_private_group():
    """
    This function adds the current user
    to a private group based on the
    groupId given through the form
    """
    data = request.get_json()
    username = data["username"]
    code = data["code"]
    group_doc_ref = groupdb.document(code)

    group_doc_data = group_doc_ref.get().to_dict()

    if not group_doc_data:
        return jsonify({"message": "code is invalid"})
    if len(group_doc_data.get("members", [])) == int(group_doc_data.get("capacity", 0)):
        # The number of members in the group is equal to its capacity
        return jsonify({"message": "group is full"})

    # The number of members in the group is less than its capacity
    try:
        group_doc_ref.update({"members": firestore.ArrayUnion([username])})
        return jsonify(
            {
                "message": "group joined successfully"
                + str(len(group_doc_data.get("members", [])))
                + " "
                + str(group_doc_data.get("capacity", 0))
            }
        )
    except Exception as e:
        return jsonify({"message": "Error:" + str(e)})


@GroupRoutes.route("/get_user_rights/<username>", methods=["GET"])
def get_rights(username):
    """
    This function returns the role of a
    user in a group through the unique
    username
    """
    groupId = request.args.get("groupId")
    group_doc_ref = groupdb.document(groupId)
    group_data = group_doc_ref.get().to_dict()
    owner = group_data.get("owner")
    if owner == username:
        return jsonify({"message": "user is an owner"})
    elif group_data and username in group_data.get("members", []):
        return jsonify({"message": "user is a member"})
    else:
        return jsonify(
            {"message": "user is not owner or member"}
        )  # + ' ' + str(owner)+ ' ' +str(username)})


@GroupRoutes.route("/leave_group", methods=["POST"])
def leave_group():
    """
    This function removes the unique username
    given from the list of members in the
    groupId given
    """
    data = request.get_json()
    username = data["username"]
    groupId = data["groupId"]
    newOwner = data["newOwner"]

    group_doc_ref = groupdb.document(groupId)

    group_data = group_doc_ref.get().to_dict()
    owner = group_data.get("owner")

    try:
        group_doc_ref.update({"members": firestore.ArrayRemove([username])})

        if owner == username:
            # new group owner was selected, change group ownership
            if newOwner:
                group_doc_ref.update({"owner": newOwner})
            # no remaining members, delete group
            else:
                group_doc_ref.delete()
                return jsonify({"message": "group deleted"})

        return jsonify({"message": "left group successfully"})
    except Exception as e:
        return jsonify({"message": "Error removing member from group."})


@GroupRoutes.route("/join_public_group", methods=["POST"])
def join_group():
    """
    This function adds the unique username
    given to the list of members in the
    groupId given
    """
    data = request.get_json()
    username = data["username"]
    groupId = data["groupId"]

    group_doc_ref = groupdb.document(groupId)
    group_doc_data = group_doc_ref.get().to_dict()

    if len(group_doc_data.get("members", [])) == int(group_doc_data.get("capacity", 0)):
        # The number of members in the group is equal to its capacity
        return jsonify({"message": "group is full"})
    try:
        group_doc_ref.update({"members": firestore.ArrayUnion([username])})
        return jsonify({"message": "joined group successfully"})
    except Exception as e:
        return jsonify({"message": "Error removing member from group."})
