from flask import Flask, session, render_template, request, redirect, jsonify, Blueprint
from app import auth, db, tagsdb

UtilRoutes = Blueprint("UtilRoutes", __name__)


@UtilRoutes.route("/get_tags", methods=["GET"])
def get_tags():
    tags_doc_ref = tagsdb.document("tags").get()
    if tags_doc_ref.exists:
        return jsonify(tags_doc_ref.to_dict())
