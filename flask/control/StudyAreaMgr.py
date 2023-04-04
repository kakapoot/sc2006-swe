from flask import request, jsonify, Blueprint
from app import placedb, cachedplacedb
from firebase_admin import firestore

StudyAreaRoutes = Blueprint("StudyAreaRoutes", __name__)


# Use cached database to prevent high read count in Firestore
@StudyAreaRoutes.route("/get_cached_places/<place_type>", methods=["GET"])
def get_cached_places(place_type):
    """
    This function returns a list of study areas from the database
    depending on the filter type applied
    """
    # filter by type of place
    if place_type in ["university", "cafe", "restaurant", "library"]:
        places_doc_ref = cachedplacedb.document(place_type).get()
        places_doc_data = places_doc_ref.to_dict()

    # get all places
    else:
        places_doc_ref = cachedplacedb.document("all").get()
        places_doc_data = places_doc_ref.to_dict()

    return jsonify(places_doc_data)


# Use cached database to prevent high read count in Firestore
@StudyAreaRoutes.route("/update_cached_places", methods=["POST"])
def update_cached_places():
    """
    This function updates the list of study areas in the database
    with the newly fetched place details
    """
    data = request.get_json()
    places = data["places"]

    types = {"university": [], "cafe": [], "restaurant": [], "library": []}
    all_places = []

    # add place to respective type list
    for place in places:
        # add to lists only if place type is valid
        if "type" in place and place["type"] in types:
            types[place["type"]].append(place)
            all_places.append(place)

    # update type doc
    for place_type in ["university", "cafe", "restaurant", "library"]:
        places_doc_ref = cachedplacedb.document(place_type)
        places_doc_ref.update({"places": types[place_type]})

    # update "all" doc
    all_places_doc_ref = cachedplacedb.document("all")
    all_places_doc_ref.update({"places": all_places})

    return jsonify(data)


@StudyAreaRoutes.route("/get_places/<place_type>", methods=["GET"])
def get_places(place_type):
    """
    This function returns a list of study areas from the database
    depending on the filter type applied
    """
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


# # Gets all places with place details
# @StudyAreaRoutes.route("/get_available_places", methods=["GET"])
# def get_available_places():
#     """
#     This function returns a list of study areas with pre-fetched
#     place details from the database
#     """
#     docs = placedb.order_by("name").stream()

#     places = []
#     for doc in docs:
#         places.append(doc.to_dict())

#     return jsonify({"places": places})


# @StudyAreaRoutes.route("/update_places", methods=["POST"])
# def update_places():
#     """
#     This function updates the list of study areas in the database
#     with the newly fetched place details
#     """
#     data = request.get_json()
#     places = data["places"]
#     for place in places:
#         place_id = place["place_id"]
#         doc_ref = placedb.document(place_id)
#         doc_ref.update(place)

#     return jsonify(data)
