let map;
var gmarkers1 = [];
var markers1 = [];

//only can click on NTU location
const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h2 id="firstHeading" class="firstHeading">Nanyang Technological University</h2>' +
    '<img src="NTU_image.jpg" alt="The Hive" style="width:300px;height:200px;>' +
    '<div id="bodyContent">' +
    "<p>Principal campus of this public university focused on science & technology, founded in 1991.</p>" +
    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 1,145 reviews</p>" +
    "<p><b>Address:</b> 50 Nanyang Ave, 639798</p>" +
    "<p><b>Number:</b> 67911744</p>" +
    '<p><a href="https://www.ntu.edu.sg/">Official Website</a></p>' +
    "</div>" +
    "</div>";

//populate study areas
markers1 = [
    //Polytechnics
    [1.3807216, 103.8487768, "polytechnic", "Nanyang Polytechnic"],
    [1.4428, 103.7856, "polytechnic", "Republic Polytechnic"],
    [1.309137, 103.7781437, "polytechnic", "Singapore Polytechnic"],
    [1.3331883, 103.7746123, "polytechnic", "Ngee Ann Polytechnic"],
    [1.3744873, 103.751445, "polytechnic", "ITE College West"],
    [1.3347, 103.9549, "polytechnic", "ITE College East"],

    //cafes
    [1.312060, 103.854073, "cafe", "Soul Brew"],
    [1.283270, 103.845870, "cafe", "Grids Coffee Bar"],
    [1.284540, 103.846626, "cafe", "Group Therapy"],
    [1.292230, 103.840851, "cafe", "The Book Cafe"],
    [1.3014643, 103.8495681, "cafe", "The Coffee Academics"],
    [1.3087996, 103.9121413, "cafe", "Penny University"],

    //Public Libraries
    [1.2976, 103.8543, "library", "National Library Building"],
    [1.3527198, 103.9410291, "library", "Tampines Regional Library"],
    [1.4349, 103.7868, "library", "Woodlands Regional Library"],
    [1.3725127, 103.9499208, "library", "Pasir Ris Public Library"],
    [1.4483136, 103.8194642, "library", "Sembawang Public Library"],
    [1.3499462, 103.8488513, "library", "Bishan Public Library"],
    [1.3334968, 103.8504556, "library", "Toa Payoh Public Library"],
    [1.3747244, 103.8455779, "library", "Ang Mo Kio Public Library"],
    [1.320483, 103.886139, "library", "Queenstown Public Library"],
    [1.3266193, 103.9317435, "library", "Bedok Public Library"],
    [1.4293632, 103.8364689, "library", "Yishun Public Library"],
    [1.3918934, 103.8946863, "library", "Sengkang Public Library"],
    [1.4090131, 103.9055555, "library", "Punggol Regional Library"],
    [1.3505869, 103.8729596, "library", "Serangoon Public Library"],
    [1.3496614, 103.7491362, "library", "Bukit Batok Public Library"],
    [1.3328119, 103.7395248, "library", "Jurong East Regional Library"],
    [1.3851526, 103.7451035, "library", "Choa Chu Kang Public Library"],
    [1.3148858, 103.7646304, "library", "Clementi Public Library"],
    [1.3796938, 103.76456, "library", "Bukit Panjang Public Library"],
    [1.2637791, 103.8232, "library", "Harbourfront Public Library"],
    [1.30096, 103.83896, "library", "Orchard Public Library"],
    [1.3403, 103.7046, "library", "Jurong West Public Library"],

    //Universities
    [1.2962018, 103.7768994, "university", "National University of Singapore"],
    [1.296168, 103.8500437, "university", "Singapore Management University"],
    [1.3003557, 103.7799764, "university", "Singapore Institute of Technology (Dover)"],
    [1.30086685, 103.78011, "university", "Singapore Institute of Technology"],
    [1.3419943, 103.962754, "university", "Singapore University of Technology and Design"],
    [1.3281395, 103.8457014, "university", "Singapore Institute of Management"],
    [1.302804, 103.8516054, "university", "Lasalle College of the Arts"],
    [1.3072465, 103.7723163, "university", "Yale-NUS College"],
    [1.3292588, 103.7769043, "university", "SIM Global Education"],
    [1.2986824, 103.8504878, "university", "Nanyang Academy of Fine Arts"],
    [1.3167511, 103.9031005, "university", "Management Development Institute of Singapore"],
    [1.3484104, 103.6829332, "university", "Nanyang Technological University"]

];

// Initialize and add the map
function initMap() {
    const original = { lat: 1.3483, lng: 103.6831};
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: original,
      styles: [
        {"featureType": "poi","stylers": [{"visibility": "off" }]},
        {"featureType": "administrative","stylers": [{ "visibility": "off" }]},
        {"featureType": "transit","stylers": [{ "visibility": "off" }]}
        ]
    });

    // Get live location
    const locationButton = document.createElement("button");

    locationButton.textContent = "Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
    
                const cmarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title:"Current Location",
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillOpacity: 1,
                        strokeWeight: 2,
                        fillColor: '#5384ED',
                        strokeColor: '#ffffff',
                    },
                });
                cmarker.setMap(map);
                map.setZoom(13.5);
                map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } 
        else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    //filtering places
    for (i = 0; i < markers1.length; i++) {
        addMarker(markers1[i]);
    }
    
}
  
///////////////////////////Helper Functions /////////////////////////////////////
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function addMarker(marker) {
    var category = marker[2];
    var title = marker[3];
    var pos = new google.maps.LatLng(marker[0], marker[1]);
    var content = marker[3];

    marker1 = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map
    });

    gmarkers1.push(marker1);

    marker1.addListener("click", ()=> {
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: marker1.title,
        });
        infowindow.open({
            anchor: marker1,
            map,
        });
        map.setZoom(13.5);
        //map.setCenter(marker1.pos);
    });
}

//Function to filter markers by category
filterMarkers = function (category) {
    for (i = 0; i < gmarkers1.length; i++) {
        marker = gmarkers1[i];
        // If is same category or category not picked
        if (marker.category == category || category.length === 0) {
            marker.setVisible(true);
        }
        // Categories don't match 
        else {
            marker.setVisible(false);
        }
    }
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        place: {
          placeId: results[0].place_id,
          location: results[0].geometry.location
        }
      });

    const content = place.formatted_address
    infowindow.setContent(content);
    infowindow.open(map, marker);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);
window.initMap = initMap;
