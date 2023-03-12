from flask import Flask, session, render_template, request, redirect, jsonify, Blueprint
import sys
import os
from app import auth, db, userdb

# sys.path.insert(0, '../entity')
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from entity.user import User


LoginRoutes = Blueprint("LoginRoutes", __name__)


@LoginRoutes.route("/")
def test():
    return "server is running"


@LoginRoutes.route("/login", methods=["POST"])
def login():
    if "user" in session:
        return "Hi, {}".format(session["user"])
    else:
        username = request.json.get("username")
        password = request.json.get("password")

        query = userdb.where("username", "==", username).limit(1)
        results = query.get()
        if len(results) == 0:
            return jsonify({"message": "Username not found"})
        else:
            for result in results:
                email = result.get("email")
            try:
                user = auth.sign_in_with_email_and_password(email, password)
                session["user"] = username
                return jsonify({"message": "login successful"})
            except Exception as e:
                print(e)
                return jsonify(
                    {
                        "message": "username found, wrong password"
                        + " "
                        + username
                        + " "
                        + password
                        + " "
                        + email
                    }
                )


# test with username: User11 , Password: P@ssw0rd


@LoginRoutes.route("/currentuser")
def get_current_user():
    user = session.get("user")
    # if not user:
    #     return jsonify({'error': 'Unauthorized'}), 401
    return jsonify({"user": user})


@LoginRoutes.route("/logout")
def logout():
    # remove the username from the session if it is there
    session.pop("user", None)
    return jsonify({"message": "logged out"})
