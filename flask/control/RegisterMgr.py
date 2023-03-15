from flask import Flask, session, render_template, request, redirect, jsonify, Blueprint
import sys
import os
import re
import dns.resolver
from app import auth, db, userdb

# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from entity.user import User

RegisterRoutes = Blueprint("RegisterRoutes", __name__)


@RegisterRoutes.route("/register", methods=["POST"])
def register():
    name = request.json.get("name")
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")

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
                    "name": name,
                    "username": username,
                    "password": password,
                    "email": email,
                }
                message = "registration successful"

                response = {"message": message, "data": data}
                # create user
                doc_ref = userdb.document(username)

                # auth.create_user_with_email_and_password(email, password)
                doc_ref.set(
                    {
                        "name": name,
                        "username": username,
                        "password": password,
                        "email": email,
                    },
                    merge=True,
                )
                return jsonify(response)
            else:
                return jsonify({"message": "email is invalid"})

        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
            return jsonify({"message": "email is invalid"})


@RegisterRoutes.route("/create_profile", methods=["POST", "GET"])
def create_profile():
    if request.method == "GET":
        session["user"] = request.args.get("username")
        username = session.get("user")
        print(username)
    elif request.method == "POST":
        data = request.get_json()
        username = data["username"]

        gender = data["gender"]
        birthday = data["birthday"]
        organization = data["organization"]
        description = data["description"]
        tags = data["tags"]
        groups = []

        # edit their profile
        doc_ref = userdb.document(username)

        doc_ref.set(
            {
                "gender": gender,
                "birthday": birthday,
                "organization": organization,
                "description": description,
                "tags": tags,
                "groups": groups,
            },
            merge=True,
        )

        # print(username)

        print(doc_ref)
        return jsonify({"message": "profile creation sent"})
