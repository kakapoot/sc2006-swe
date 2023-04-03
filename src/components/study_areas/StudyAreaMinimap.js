import React from 'react'
import { useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { StarRating } from "../StarRating"
import { LoadingSpinner } from "../LoadingSpinner"
import { DisplayTag } from '../Tag';

// Do not remove global google comment! Fixes "google is not defined" bug
/* global google */
const google = window.google

/* Component to display a Google Map of the selected Study Area */
export function StudyAreaMinimap({ studyArea }) {
    // TODO: setup environment variable for API key, create new API key
    // Load Google Maps API
    const libraries = useMemo(() => ["places"], [])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyABU-v5GXOjHAdJroPTfJa9iPxnv327g9I",
        libraries: libraries
    })

    const center = useMemo(() => ({ lat: 1.3521, lng: 103.8198 }), [])
    const [map, setMap] = useState(/** @type google.maps.Map */ null)
    const [activeMarker, setActiveMarker] = useState(null)


    return <div className="w-100 h-100">
        {!isLoaded && <LoadingSpinner />}
        {isLoaded &&
            <GoogleMap
                zoom={11}
                center={center}
                mapContainerClassName="w-100 h-100 rounded" // hide Google Maps when loading places data
                onLoad={map => setMap(map)}
                clickableIcons={false}>


                <MarkerF position={studyArea.location}
                    onClick={() => studyArea.place_id !== activeMarker ? setActiveMarker(studyArea.place_id) : null}>
                    {activeMarker === studyArea.place_id
                        ? <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div className="p-2 d-flex flex-column gap-2" style={{ width: "300px", fontFamily: "Poppins" }}>
                                {/* Image Carousel */}
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            {studyArea.photos
                                                ? <img src={studyArea.photos[0]} style={{ objectFit: "cover", height: "200px" }} className="d-block rounded w-100" alt="..." />
                                                : <span>No photos found</span>}
                                        </div>
                                        {studyArea.photos.map((photo, index) => (
                                            index === 0 // skip first image
                                                ? null
                                                : <div className="carousel-item">
                                                    <img key={photo} src={studyArea.photos[index]} style={{ objectFit: "cover", height: "200px" }} className="d-block rounded w-100" alt="..." />
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

                                {/* studyArea Details */}
                                <h5 className="mb-0"><strong>{studyArea.name}</strong></h5>

                                <div className="d-flex align-items-center gap-2">
                                    <DisplayTag name={studyArea.type} />

                                    {/* Rating */}
                                    {studyArea.rating.toFixed(1)}
                                    <StarRating rating={studyArea.rating} />
                                </div>

                                <span><span className="fw-bold">Address:</span> {studyArea.formatted_address}</span>

                                <span><span className="fw-bold">Opening Hours:</span>
                                    <ul className="list-group">
                                        {studyArea.opening_hours.length > 0
                                            ? studyArea.opening_hours.map((day) =>
                                                <li className="list-group-item" key={day}>{day}</li>)
                                            : <li className="list-group-item">24/7</li>}
                                    </ul>
                                </span>
                            </div>
                        </InfoWindowF>
                        : null}

                </MarkerF>

            </GoogleMap>
        }
    </div>
}