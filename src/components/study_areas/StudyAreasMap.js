
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, Autocomplete } from "@react-google-maps/api";
import { StarRating } from "../../components/StarRating"
import { DisplayTag } from '../../components/Tag';
import { LoadingSpinner } from "../../components/LoadingSpinner"

// Do not remove global google comment! Fixes "google is not defined" bug
/*global google*/

/* Component to display a Google Map of all available Study Areas */
export function StudyAreasMap() {
    // TODO: setup environment variable for API key, create new API key
    // Load Google Maps API
    const libraries = useMemo(() => ["places"], [])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyABU-v5GXOjHAdJroPTfJa9iPxnv327g9I",
        libraries: libraries
    })

    const center = useMemo(() => ({ lat: 1.3521, lng: 103.8198 }), [])
    const [map, setMap] = useState(null)
    const [activeMarker, setActiveMarker] = useState(null)
    const [hoverMarker, setHoverMarker] = useState(null)

    const [placesData, setPlacesData] = useState(null)
    const [places, setPlaces] = useState([])
    const placeTypes = ["all", "library", "cafe", "university", "restaurant"]
    const [selectedPlaceType, setSelectedPlaceType] = useState("all")

    const [autocomplete, setAutocomplete] = useState(null)
    const [searchedPlace, setSearchedPlace] = useState(null)
    const [searchedPlaceLocation, setSearchedPlaceLocation] = useState(null)
    const autocompleteInputRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    // fetch data on different filters
    useEffect(() => {
        const fetchPlacesData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get_cached_places/${selectedPlaceType}`)
                const data = await response.json()
                console.log(data)

                setPlacesData(data)
                fetchPlaceDetails(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        // stop Google Maps from crashing while InfoWindow is open
        setActiveMarker(null)

        // map needs to be loaded before service can be set
        if (map && !isLoading) {
            // pan to relevant place markers
            searchedPlace
                ? map.panTo(searchedPlaceLocation)
                : map.panTo(center)

            setIsLoading(true)
            fetchPlacesData()
        }
    }, [selectedPlaceType, map])

    /* Uncomment when fetching non-cached data to update database */
    // // update firestore database with new fetched data from Google Maps API
    // useEffect(() => {
    //     console.log(places)

    //     // update firestore database only when all place details have been fetched
    //     if (placesData && placesData.places.length === places.length) {
    //         fetch(`http://localhost:5000/update_cached_places`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ "places": places })
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data)
    //                 setIsLoading(false)
    //             })
    //             .catch(error => console.error(error))
    //     }
    // }, [placesData, places])

    // fetch missing place detail data for all the placeIds in firestore database
    const fetchPlaceDetails = (placesData) => {
        setPlaces([])

        // intialize Google Places JavaScript API
        const placesService = new google.maps.places.PlacesService(map)

        // get details for places fetched by firestore database
        placesData.places.map((place, index) => {
            // fetch place data details if it does not already exist
            if (!place.hasOwnProperty("name")) {
                console.log("Fetching details for place ID" + place.place_id)

                const request = {
                    placeId: place.place_id,
                    fields: ["place_id", "name", "formatted_address", "rating", "geometry", "opening_hours", "type", "photos"]
                }

                // get place details from Google Places API
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
                    else {
                        // error
                        console.log(status)
                    }
                });

                // TODO: use this instead for timeout to bypass gmaps API OVER_QUERY_LIMIT when fetching new data

                // setTimeout(() => {
                //     placesService.getDetails(request, function (results, status) {
                //         if (status === google.maps.places.PlacesServiceStatus.OK) {
                //             const placeDetails = {
                //                 ...results,
                //                 // get LatLng values for geometry
                //                 location: { lat: results.geometry.location.lat(), lng: results.geometry.location.lng() },
                //                 // get url for each photo reference
                //                 photos: results.photos.map((photo) => photo.getUrl()),
                //                 // get opening hours text
                //                 opening_hours: results.hasOwnProperty("opening_hours") ? results.opening_hours.weekday_text : [],
                //                 // get the first relevant type of place
                //                 type: results.types ? results.types.filter(type => placeTypes.includes(type))[0] : ""
                //             }

                //             // delete unneeded fields
                //             delete placeDetails["geometry"]
                //             delete placeDetails["html_attributions"]
                //             delete placeDetails["types"]

                //             setPlaces(prevState => [...prevState, placeDetails])
                //         }
                //         else {
                //             // error
                //             console.log(status)
                //         }
                //     });
                // }, 200 * index)

            }
            else {
                // set already existing details
                setPlaces(prevState => [...prevState, place])
            }
        })
    }

    // autocomplete input change
    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace()
            setSearchedPlace(place)

            const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
            setSearchedPlaceLocation(location)
            // pan to searched place
            map.panTo(location)
        }
        else {
            setSearchedPlace(null)
        }
    }

    // autocomplete input reset
    const handleResetSearchedPlace = () => {
        setSearchedPlace(null)
        map.panTo(center)

        autocompleteInputRef.current.value = ""
    }


    return (
        isLoaded ? <div className="w-100 h-100">
            <div className="mb-3 d-flex flex-column gap-3">
                {/* Filter */}
                <h5 className="mb-0 fw-bold">Filter by Type of Study Area</h5>
                <select disabled={isLoading} className="text-capitalize form-select"
                    onChange={(e) => setSelectedPlaceType(e.target.value)} >
                    {placeTypes.map((placeType) =>
                        <option value={placeType} key={placeType}>{placeType}</option>
                    )}
                </select>

                <div className="d-flex gap-3">
                    {/* Autocomplete Input */}
                    <Autocomplete className="flex-fill"
                        onLoad={autocomplete => setAutocomplete(autocomplete)}
                        onPlaceChanged={handlePlaceChanged}
                        options={{
                            componentRestrictions: { country: "sg" },
                            fields: ["name", "geometry"]
                        }}>
                        <input type="text" ref={autocompleteInputRef} className="form-control" placeholder="Search for a location..." />
                    </Autocomplete>

                    {/* Reset Autocomplete Input Button */}
                    <button onClick={handleResetSearchedPlace} className="btn btn-primary text-uppercase">Reset</button>
                </div>
            </div>

            {/* Loading */}
            {isLoading && <LoadingSpinner />}
            {/* Google Map */}
            <GoogleMap
                zoom={11}
                center={center}
                mapContainerClassName={isLoading ? "invisible" : "w-100 h-100 rounded"} // hide Google Maps when loading places data
                onLoad={map => setMap(map)}
                clickableIcons={false}>

                {/* Autocomplete Place Marker */}
                {searchedPlace &&
                    <MarkerF position={searchedPlaceLocation}
                        icon="/map_marker.png">
                    </MarkerF>}

                {/* Filtered Places Markers*/}
                {!isLoading && places.map((place) =>
                    <MarkerF key={place.place_id} position={place.location}
                        onClick={() => place.place_id !== activeMarker
                            ? setActiveMarker(place.place_id)
                            : null}
                        onMouseOver={() => place.place_id !== hoverMarker
                            ? setHoverMarker(place.place_id)
                            : null}
                        onMouseOut={() => setHoverMarker(null)}>

                        {/* Show name of place when hovering over marker */}
                        {!activeMarker && hoverMarker === place.place_id
                            ? (<InfoWindowF>
                                <div>{place.name}</div>
                            </InfoWindowF>)
                            : null}

                        {/* Show place details when marker is clicked */}
                        {activeMarker === place.place_id
                            // Filtered Places Info Windows
                            ? (<InfoWindowF
                                onCloseClick={() => setActiveMarker(null)}>
                                <div className="p-2 d-flex flex-column gap-2" style={{ height: "300px", width: "300px", fontFamily: "Poppins" }}>
                                    {/* Image Carousel */}
                                    {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                {place.photos
                                                    ? <img src={place.photos[0]} style={{ objectFit: "cover", height: "100px" }} className="d-block rounded w-100" alt="..." />
                                                    : <span>No photos found</span>}
                                            </div>
                                            {place.photos.map((photo, index) => (
                                                index === 0 // skip first image
                                                    ? null
                                                    : <div className="carousel-item">
                                                        <img key={photo} src={place.photos[index]} style={{ objectFit: "cover", height: "100px" }} className="d-block rounded w-100" alt="..." />
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
                                    </div> */}

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
                                            {place.opening_hours.length > 0
                                                ? place.opening_hours.map((day) =>
                                                    <li className="list-group-item" key={day}>{day}</li>)
                                                : <li className="list-group-item">24/7</li>}
                                        </ul>
                                    </span>
                                </div>
                            </InfoWindowF>)
                            : null}
                    </MarkerF>)}
            </GoogleMap>
        </div >
            // Google Map API not loaded yet
            : null
    )
}