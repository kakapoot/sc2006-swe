from flask import jsonify, Blueprint, request
from app import auth, db, userdb, groupdb

UserRoutes = Blueprint("UserRoutes", __name__)


@UserRoutes.route("/get_user/<username>", methods=["GET"])
def get_user(username):
    """
    This function returns the details
    of a user based on the unique username
    given
    """
    if request.method == "GET":
        user_doc_ref = userdb.document(username).get()
        user_doc_data = user_doc_ref.to_dict()
        data = {**user_doc_data}

        # remove sensitive data
        del data["password"]
        del data["email"]

        if user_doc_ref.exists:
            return jsonify(data), 200
        else:
            return jsonify({"message": "user does not exist"}), 404


@UserRoutes.route("/update_user", methods=["POST"])
def update_group():
    """
    This function updates user details in firestore
    based on the parameters provided in the form given
    """
    data = request.get_json()
    username = data["username"]

    doc_ref = userdb.document(username)
    doc_ref.update(data)

    return jsonify({"message": "user updated"})
