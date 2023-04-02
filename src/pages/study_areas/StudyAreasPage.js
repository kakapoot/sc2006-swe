import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow, InfoWindowF } from "@react-google-maps/api";
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { usePlaces } from '../../utils/Fetch';
import { StarRating } from '../../components/StarRating';
import { DisplayTag } from '../../components/Tag';

/* global google */
export default function StudyAreasPage() {
    const libraries = useMemo(() => ["places"], [])

    // TODO: setup environment variable for API key
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })

    useEffect(() => {
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    }, [])

    return (
        <>
            { /* Content */}
            <div className="col">
                <div className="container">
                    {/* Header */}
                    <h2 className="my-5 d-flex"><strong>Study Areas</strong></h2>
                    <div style={{ height: "600px" }}>
                        {!isLoaded && <LoadingSpinner />}
                        {isLoaded && <Map />}
                    </div>
                </div>
            </div >
        </>
    )
}

function Map() {
    const center = useMemo(() => ({ lat: 1.3521, lng: 103.8198 }), [])

    const [map, setMap] = useState(/** @type google.maps.Map */ null)
    const [markers, setMarkers] = useState([])

    const [activeMarker, setActiveMarker] = useState(null)




    const { data: placesData, isLoading: placesDataIsLoading } = usePlaces()

    // TODO : fetch from firestore database
    const [places, setPlaces] = useState([])


    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (placesData) {
            fetchPlaceDetails()
        }
    }, [placesData])

    useEffect(() => {
        console.log(places)
        // update firestore database only when all place details have been fetched
        if (placesData && placesData.places.length === places.length) {
            fetch('http://localhost:5000/update_places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "places": places })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setIsLoading(false)
                })
                .catch(error => console.error(error))
        }
    }, [places])


    const placeTypes = ["library", "cafe", "university", "restaurant"]

    const fetchPlaceDetails = () => {
        setPlaces([])
        const placesService = new google.maps.places.PlacesService(map)

        // get details for places fetched by firestore database
        placesData.places.map((place, index) => {
            // fetch place data details if it does not already exist
            if (!place.hasOwnProperty("name")) {
                const request = {
                    placeId: place.place_id,
                    fields: ["place_id", "name", "formatted_address", "rating", "geometry", "opening_hours", "type", "photos"]
                }

                // TODO : debug
                console.log("get details for place id" + place.place_id)

                placesService.getDetails(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        const placeDetails = {
                            ...results,
                            // get LatLng values for geometry
                            location: { lat: results.geometry.location.lat(), lng: results.geometry.location.lng() },
                            // get url for each photo reference
                            photos: results.photos.map((photo) => photo.getUrl()),
                            // get opening hours text
                            opening_hours: results.hasOwnProperty("opening_hours") ? results.opening_hours.weekday_text : [],
                            // get the first relevant type of place
                            type: results.types ? results.types.filter(type => placeTypes.includes(type))[0] : ""
                        }

                        // delete unneeded fields
                        delete placeDetails["geometry"]
                        delete placeDetails["html_attributions"]
                        delete placeDetails["types"]

                        setPlaces(prevState => [...prevState, placeDetails])
                    }
                });
            }
            else {
                // set already existing details
                setPlaces(prevState => [...prevState, place])
            }
        })
    }

    const [selectedPlaceType, setSelectedPlaceType] = useState("all")

    useEffect(() => {
        console.log(selectedPlaceType)
    }, [selectedPlaceType])


    return (
        <div className="w-100 h-100">
            {isLoading && <LoadingSpinner />}

            {!isLoading &&
                <div>
                    <h5 className="fw-bold">Filter by Type of Study Area</h5>

                    <select className="text-capitalize form-select mb-3" aria-label="Default select example"
                        onChange={(e) => setSelectedPlaceType(e.target.value)} >
                        <option selected value="all">All</option>
                        {placeTypes.map((placeType) =>
                            <option value={placeType}>{placeType}</option>
                        )}
                    </select>
                </div>
            }
            {
                !isLoading &&
                <GoogleMap
                    zoom={11}
                    center={center}
                    mapContainerClassName="w-100 h-100"
                    onLoad={map => setMap(map)}
                    clickableIcons={false}>

                    {places.map((place) =>
                        <MarkerF key={place.place_id} position={place.location}
                            onClick={() => place.place_id !== activeMarker ? setActiveMarker(place.place_id) : null}>

                            {activeMarker === place.place_id
                                ? (<InfoWindowF onCloseClick={() => setActiveMarker(null)}>

                                    <div className="p-2 d-flex flex-column gap-2" style={{ width: "300px", fontFamily: "Poppins" }}>
                                        {/* Image Carousel */}
                                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    {place.photos
                                                        ? <img src={place.photos[0]} style={{ objectFit: "cover", height: "200px" }} className="d-block rounded w-100" alt="..." />
                                                        : <span>No photos found</span>}
                                                </div>
                                                {place.photos.map((photo, index) => (
                                                    index === 0 // skip first image
                                                        ? null
                                                        : <div className="carousel-item">
                                                            <img src={place.photos[index]} style={{ objectFit: "cover", height: "200px" }} className="d-block rounded w-100" alt="..." />
                                                        </div>
                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>

                                        {/* Place Details */}
                                        <h5 className="mb-0"><strong>{place.name}</strong></h5>

                                        <div className="d-flex align-items-center gap-2">
                                            <DisplayTag name={place.type} />

                                            {/* Rating */}
                                            {place.rating.toFixed(1)}
                                            <StarRating rating={place.rating} />
                                        </div>

                                        <span><span className="fw-bold">Address:</span> {place.formatted_address}</span>

                                        <span><span className="fw-bold">Opening Hours:</span>
                                            <ul className="list-group">
                                                {place.opening_hours.map((day) =>
                                                    <li className="list-group-item">{day}</li>)}
                                            </ul>
                                        </span>
                                    </div>
                                </InfoWindowF>)
                                : null}



                        </MarkerF>)}
                </GoogleMap>
            }
        </div >

    )
}