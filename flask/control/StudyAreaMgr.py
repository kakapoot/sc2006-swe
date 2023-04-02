from flask import request, jsonify, Blueprint
from app import placedb
from firebase_admin import firestore

StudyAreaRoutes = Blueprint("StudyAreaRoutes", __name__)


@StudyAreaRoutes.route("/get_places/<place_type>", methods=["GET"])
def get_places(place_type):
    # filter by type of place
    if place_type in ["university", "cafe", "restaurant", "library"]:
        docs = placedb.where("type", "==", place_type).stream()

    # get all places
    else:
        docs = placedb.stream()

    places = []
    for doc in docs:
        places.append(doc.to_dict())

    return jsonify({"places": places})


@StudyAreaRoutes.route("/update_places", methods=["POST"])
def update_places():
    data = request.get_json()
    places = data["places"]
    for place in places:
        place_id = place["place_id"]
        doc_ref = placedb.document(place_id)
        doc_ref.update(place)

    return jsonify(data)
