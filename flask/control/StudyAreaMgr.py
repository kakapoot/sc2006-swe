from flask import request, jsonify, Blueprint
from app import placedb
from firebase_admin import firestore

StudyAreaRoutes = Blueprint("StudyAreaRoutes", __name__)


# TODO : filter by types
@StudyAreaRoutes.route("/get_places", methods=["GET"])
def get_places():
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
