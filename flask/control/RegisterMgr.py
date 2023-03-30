from flask import request, jsonify, Blueprint
import dns.resolver
from app import userdb


RegisterRoutes = Blueprint("RegisterRoutes", __name__)


@RegisterRoutes.route("/register", methods=["POST"])
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
