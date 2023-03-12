from flask import Flask, session, render_template, request, redirect, jsonify, Blueprint
import sys
import os
import re
import flask
from app import auth, db, groupdb


FindGroupRoutes = Blueprint("FindGroupRoutes", __name__)


@FindGroupRoutes.route("/find_groups", methods=["POST"])
def find_groups():
    # subname = request.json.get('searchText')
    subname = ""  # hardcode first
    if len(subname) > 0:  # user searched something
        query = groupdb.where("name", "array-contains", subname)
        results1 = query.get()
        if len(results1) == 0:
            return jsonify({"message": "No such Group"})

    else:  # user did not search so retrieve entire databases
        results1 = groupdb.get()

    # Get the filters chosen
    # filterTags = request.json.get('filterTags')  #dictionary
    filterTags = {
        subjects: [],
        educationLevels: [],
        learningStyles: [],
        regions: [],
    }  # hardcode first
    subjects = filterTags["subjects"]  # array
    educationLevels = filterTags["educationLevels"]
    learningStyles = filterTags["learningStyles"]
    regions = filterTags["regions"]

    if not (
        len(subjects) or len(educationLevels) or len(learningStyles) or len(regions)
    ):  # no filters selected
        return jsonify({"message": "No such Group"})

    # filter each category
    query = results1.where("subjects", "array-contains", subjects)
    results2 = query.get()
    if len(results2) == 0:
        return jsonify({"message": "No such Group"})

    query = results2.where("educationLevels", "==", educationLevels)
    results3 = query.get()
    if len(results3) == 0:
        return jsonify({"message": "No such Group"})

    query = results3.where("learningStyles", "==", learningStyles)
    results4 = query.get()
    if len(results4) == 0:
        return jsonify({"message": "No such Group"})

    query = results4.where("regions", "==", regions)
    results5 = query.get()
    if len(results5) == 0:
        return jsonify({"message": "No such Group"})

    # got groups that fufill criteria
    for group in results5:
        jsonify({"message": group.get("name")})


@FindGroupRoutes.route("/update_group", methods=["GET", "POST"])
def update_group():
    if flask.request.method == "GET":
        data = []
        docs = groupdb.stream()
        for doc in docs:
            data.append(doc.to_dict())
        print(data)
        return jsonify(data)

    elif flask.request.method == "POST":
        data = request.get_json()
        groupId = data["groupId"]

        doc_ref = groupdb.document(groupId)
        doc_ref.update(data)

        return jsonify({"message": "group updated"})
