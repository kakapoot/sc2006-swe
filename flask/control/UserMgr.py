from flask import jsonify, Blueprint, request
from app import auth, db, userdb, groupdb

UserRoutes = Blueprint("UserRoutes", __name__)


# TODO : not return entire user data
@UserRoutes.route("/get_user/<username>", methods=["GET"])
def get_user(username):
    if request.method == "GET":
        user_doc_ref = userdb.document(username).get()
        if user_doc_ref.exists:
            return jsonify(user_doc_ref.to_dict())
