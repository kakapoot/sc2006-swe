from flask import jsonify, Blueprint, request
from app import userdb
import dns.resolver

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


@UserRoutes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    email = data["email"]
    name = data["name"]
    gender = data["gender"]
    birthday = data["birthday"]
    organization = data["organization"]
    description = data["description"]
    tags = data["tags"]

    # check for duplicate username/email, then check if email is valid

    if len(userdb.where("username", "==", username).limit(1).get()) == 1:
        return jsonify({"message": "username is taken"})
    elif len(userdb.where("email", "==", email).limit(1).get()) == 1:
        return jsonify({"message": "email is taken"})
    else:
        try:
            if email:
                domain = email.split("@")[1]
                dns.resolver.query(domain, "MX")

                data = {
                    "username": username,
                    "password": password,
                    "email": email,
                    "name": name,
                    "gender": gender,
                    "birthday": birthday,
                    "organization": organization,
                    "description": description,
                    "tags": tags,
                }

                # create user in Firestore database
                doc_ref = userdb.document(username)

                doc_ref.set(
                    data,
                    merge=True,
                )
                return jsonify({"message": "registration successful"})
            else:
                return jsonify({"message": "email is invalid"})

        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
            return jsonify({"message": "email is invalid"})
