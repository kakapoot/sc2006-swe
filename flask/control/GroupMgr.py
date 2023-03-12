from flask import jsonify, Blueprint, request
from app import auth, db, userdb, groupdb
import sys
import os

GroupRoutes = Blueprint("GroupRoutes", __name__)

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


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
