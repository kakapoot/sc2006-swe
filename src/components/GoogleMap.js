import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {   //NTU coordinates
                lat: 1.3471,
                lng: 103.6808
            }
        }
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            selectedText: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter: marker.position
        });
        
    
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
    });

    handleClick = () => {
        this.setState({ open: true });
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
   
    handleChange = address => {
        this.setState({ address });
    };
     
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({address});
                this.setState({mapCenter: latLng});
            })
            .catch(error => console.error('Error', error));
    };
   
    render() {
      return (
        <div id="googleMap">
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
            <Map 
                google={this.props.google}
                style={{width: '75%', height: '75%', position: 'relative'}}
                className={'map'}
                zoom={14}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                center = {{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
            >
                
                <Marker   //search
                    onClick={this.onMarkerClick}
                    title = {'Searched Location'}
                    name = {'Searched Location'}
                    position = {{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                />

                {/* -----------------------polytechnics-------------------------- */}
                <Marker
                    onClick={this.onMarkerClick}
                    title={'Nanyang Polytechnic'}
                    name={'Nanyang Polytechnic'}
                    description={'polytechnic'}
                    position={{lat: 1.3807216, lng: 103.8487768}} />

                <Marker
                    onClick={this.onMarkerClick}
                    title={'Republic Polytechnic'}
                    name={'Republic Polytechnic'}
                    description={'polytechnic'}
                    position={{lat: 1.4428, lng: 103.7856}} />

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Singapore Polytechnic'}
                    title={'Singapore Polytechnic'}
                    description={'polytechnic'}
                    position={{lat: 1.309137, lng: 103.7781437}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Woodlands Regional Library'}
                    title={'Woodlands Regional Library'}
                    description={'polytechnic'}
                    position={{lat: 1.4349, lng: 103.7868}}/>
                
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Ngee Ann Polytechnic'}
                    title={'Ngee Ann Polytechnic'}
                    description={'polytechnic'}
                    position={{lat: 1.3331883, lng: 103.7746123}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'ITE College West'}
                    title={'ITE College West'}
                    description={'polytechnic'}
                    position={{lat: 1.3744873, lng: 103.751445}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'ITE College East'}
                    title={'ITE College East'}
                    description={'polytechnic'}
                    position={{lat: 1.3347, lng: 103.9549}}/>

                
                {/* -----------------------libraries-------------------------- */}
                <Marker
                    onClick={this.onMarkerClick}
                    name={'National Library / Lee Kong Chian Reference Library'}
                    title={'National Library / Lee Kong Chian Reference Library'}
                    description = {"<h5>Over 600,000 items in various media are held in this library. Open to the public and researchers.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 1,239 reviews</p>" +
                    "<p><b>Address:</b> 100 Victoria St, Singapore 188064</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    "<p><b>Number:</b> 63323255</p>" +
                    '<p><a href="https://www.nlb.gov.sg/VisitUs/BranchDetails/tabid/140/bid/329/Default.aspx?branch=National+Library+/+Lee+Kong+Chian+Reference+Library">Official Website</a></p>'}
                    position={{lat: 1.2976, lng: 103.8543}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Tampines Regional Library'}
                    title={'Tampines Regional Library'}
                    description = {"<h5>Spread over five storeys, the Tampines Regional Library features a vibrant yet comfortable reading environment for all.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 402 reviews</p>" +
                    "<p><b>Address:</b> Lobby H, 1 Tampines Walk, #02-01 Our Tampines Hub, 528523</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/tampines-regional-library">Official Website</a></p>'}
                    position={{lat: 1.3527198, lng: 103.9410291}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Woodlands Regional Library'}
                    title={'Woodlands Regional Library'}
                    description = {"<h5>Woodlands Regional Library has an array of amenities to offer everyone – programmes of different scales and format, dedicated spaces for reading, studying and learning, and a treasure cove of books for you to discover.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 359 reviews</p>" +
                    "<p><b>Address:</b> 900 S Woodlands Dr, #01-03 Civic Centre, Singapore 730900</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/woodlands-regional-library">Official Website</a></p>'}
                    position={{lat: 1.4349, lng: 103.7868}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Pasir Ris Public Library'}
                    title={'Pasir Ris Public Library'}
                    description = {"<h5>Set up to reach out to young families in the Pasir Ris community, the Pasir Ris Public Library boasts a special space for teenagers.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 331 reviews</p>" +
                    "<p><b>Address:</b> 1 Pasir Ris Central St 3, #04 - 01 / 06 White Sands, Singapore 518457</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/pasir-ris-public-library">Official Website</a></p>'}
                    position={{lat: 1.3725127, lng: 103.9499208}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Sembawang Public Library'}
                    title={'Sembawang Public Library'}
                    description = {"<h5>The nautical and maritime heritage of the Sembawang area inspires the design of the Sembawang Public Library with container-shaped spaces and reading decks.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 419 reviews</p>" +
                    "<p><b>Address:</b> 30 Sembawang Dr, #05 - 01 Sun Plaza, Singapore 757713</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/sembawang-public-library">Official Website</a></p>'}
                    position={{lat: 1.4483136, lng: 103.8194642}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Bishan Public Library'}
                    title={'Bishan Public Library'}
                    description = {"<h5>Bishan Public Library is well known for its architecture which captures the look and feel of a tree house with distinctive coloured pods.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 329 reviews</p>" +
                    "<p><b>Address:</b> 5 Bishan Pl, #01-01, Singapore 579841</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/bishan-public-library">Official Website</a></p>'}
                    position={{lat: 1.3499462, lng: 103.8488513}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Toa Payoh Public Library'}
                    title={'Toa Payoh Public Library'}
                    description = {"<h5>It may be the second-oldest public library in Singapore, but Toa Payoh Public Library boasts uniquely-designed spaces for children, adults and seniors.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 245 reviews</p>" +
                    "<p><b>Address:</b> 6 Toa Payoh Central, Singapore 319191</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/toa-payoh-public-library">Official Website</a></p>'}
                    position={{lat: 1.3334968, lng: 103.8504556}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Ang Mo Kio Public Library'}
                    title={'Ang Mo Kio Public Library'}
                    description = {"<h5>Opened in 1985, Ang Mo Kio Public Library is a well-loved institution in the community which offers a peaceful atmosphere to relax with a good book.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 271 reviews</p>" +
                    "<p><b>Address:</b> 4300 Ang Mo Kio Ave 6, Singapore 569842</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/ang-mo-kio-public-library">Official Website</a></p>'}
                    position={{lat: 1.3747244, lng: 103.8455779}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Jurong West Public Library'}
                    title={'Jurong West Public Library'}
                    description = {"<h5>A holistic learning experience awaits users with the library’s conducive environment, learning resources and exciting programmes.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 173 reviews</p>" +
                    "<p><b>Address:</b> 60 Jurong West Central 3, #01-03, Singapore 648346</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/toa-payoh-public-library">Official Website</a></p>'}
                    position={{lat: 1.3403, lng: 103.7046}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Bukit Panjang Public Library'}
                    title={'Bukit Panjang Public Library'}
                    description = {"<h5>Bukit Panjang Public Library boasts of interesting transport-inspired design features with  focus on guiding patrons on their reading journeys.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 177 reviews</p>" +
                    "<p><b>Address:</b> 1 Jelebu Road #04-04 & 16/17 Bukit Panjang Plaza, 677743</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/bukit-panjang-public-library">Official Website</a></p>'}
                    position={{lat: 1.3796938, lng: 103.76456}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Clementi Public Library'}
                    title={'Clementi Public Library'}
                    description = {"<h5>Clementi Public Library opened in the first full-fledged mall in the Clementi community in 2011 and it has since become a beloved learning space for people in the area</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 183 reviews</p>" +
                    "<p><b>Address:</b> 3155 Commonwealth Avenue West #05-13/14/15 The Clementi Mall, 129588</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/clementi-public-library">Official Website</a></p>'}
                    position={{lat: 1.3148858, lng: 103.7646304}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Choa Chu Kang Public Library'}
                    title={'Choa Chu Kang Public Library'}
                    description = {"<h5>Inspired by nearby farm communities, the Choa Chu Kang Public Library is the first in Singapore to be built around the concept of sustainability and features an indoor garden</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 159 reviews</p>" +
                    "<p><b>Address:</b> 21 Choa Chu Kang Avenue 4 #04-01/02 and #05-06, Lot One Shopper’s Mall, 689812</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/choa-chu-kang-public-library">Official Website</a></p>'}
                    position={{lat: 1.3851526, lng: 103.7451035}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Jurong East Regional Library'}
                    title={'Jurong East Regional Library'}
                    description = {"<h5>One of the largest public libraries in Singapore, the Jurong Regional Library occupies four floors and a basement and has special facilities for young readers and teens.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 446 reviews</p>" +
                    "<p><b>Address:</b> 21 Jurong East Central 1, Singapore 609732</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 10:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/jurong-regional-library">Official Website</a></p>'}
                    position={{lat: 1.3328119, lng: 103.7395248}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Punggol Regional Library'}
                    title={'Punggol Regional Library'}
                    description = {"<h5>Punggol Regional Library is a LAB25 (Libraries and Archives Blueprint 2025) library where there is something for everyone to read, learn, and discover, including new programmes and accessibility features.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 29 reviews</p>" +
                    "<p><b>Address:</b> 1 Punggol Drive One, #01-12, 828629</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 12:00 PM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/punggol-regional-library">Official Website</a></p>'}
                    position={{lat: 1.4090131, lng: 103.9055555}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Yishun Public Library'}
                    title={'Yishun Public Library'}
                    description = {"<h5>From its pixel-themed furniture to its virtual bookshelves, the Yishun Public Library at the Northpoint City mall is all about going digital.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 227 reviews</p>" +
                    "<p><b>Address:</b> 930 Yishun Ave 2 #04-01 North Wing Northpoint City, 769098</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 11:00 AM - 09:00 PM</p>"+
                    '<p><a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/yishun-public-library">Official Website</a></p>'}
                    position={{lat: 1.4293632, lng: 103.8364689}}/>

                {/* -----------------------libraries-------------------------- */}
                <Marker
                    onClick={this.onMarkerClick}
                    name={'National University of Singapore'}
                    title={'National University of Singapore'}
                    description = {"<h5>Founded in 1905, an eminent Asian university with 3 campuses & 16 faculties.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 1,965 reviews</p>" +
                    "<p><b>Address:</b> 21 Lower Kent Ridge Rd, Singapore 119077</p>" +
                    "<p><b>Number:</b> 65166666</p>"+
                    '<p><a href="http://www.nus.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.2962018, lng: 1.2962018}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Singapore Management University'}
                    title={'Singapore Management University'}
                    description = {"<h5>Downtown campus university, founded in 2000, comprised of 6 business-focused schools.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 285 reviews</p>" +
                    "<p><b>Address:</b> 81 Victoria St, Singapore 188065</p>" +
                    "<p><b>Opening Hours:</b> Mon - Fri: 8:30 AM - 05:45 PM</p>"+
                    "<p><b>Number:</b> 68280100</p>"+
                    '<p><a href="https://www.smu.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.296168, lng: 103.8500437}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Singapore Institute of Technology (Dover)'}
                    title={'Singapore Institute of Technology (Dover)'}
                    description = {"<h5>Singapore’s first University of Applied Learning, offering specialised degree programmes that prepare its graduates to be work-ready professionals. </h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 342 reviews</p>" +
                    "<p><b>Address:</b> 10 Dover Dr, Singapore 138683</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sat: 8:30 AM - 06:00 PM</p>"+
                    "<p><b>Number:</b> 65921189</p>"+
                    '<p><a href="http://www.singaporetech.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.3003557, lng: 103.7799764}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Singapore Institute of Management'}
                    title={'Singapore Institute of Management'}
                    description = {"<h5>Enjoy a well-rounded global education at SIM, with more than 120 academic programmes for you to choose from and an array of learning experiences beyond the classroom.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 125 reviews</p>" +
                    "<p><b>Address:</b> 461 Clementi Rd, Singapore 599491</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sat: 09:00 AM - 05:00 PM</p>"+
                    "<p><b>Number:</b> 62489746</p>"+
                    '<p><a href="https://www.sim.edu.sg/degrees-diplomas/overview">Official Website</a></p>'}
                    position={{lat: 1.3281395, lng: 103.8457014}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Singapore University of Technology and Design'}
                    title={'Singapore University of Technology and Design'}
                    description = {"<h5>SUTD is established to advance knowledge and nurture technically grounded leaders and innovators to serve societal needs.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 248 reviews</p>" +
                    "<p><b>Address:</b> 8 Somapah Rd, Singapore 487372</p>" +
                    "<p><b>Number:</b> 63036600</p>"+
                    '<p><a href="https://www.sutd.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.3419943, lng: 103.962754}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Nanyang Technological University'}
                    title={'Nanyang Technological University'}
                    description = {"<h5>Principal campus of this public university focused on science & technology, founded in 1991.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 1,145 reviews</p>" +
                    "<p><b>Address:</b> 50 Nanyang Ave, 639798</p>" +
                    "<p><b>Number:</b> 67911744</p>" +
                    '<p><a href="https://www.ntu.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.3484104, lng: 103.6829332}}/>

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Nanyang Academy of Fine Arts (NAFA)'}
                    title={'Nanyang Academy of Fine Arts (NAFA)'}
                    description = {"<h5>Established in 1938, Nanyang Academy of Fine Arts is Singapore's pioneer arts education institution.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 142 reviews</p>" +
                    "<p><b>Address:</b> 80 Bencoolen St, Singapore 189655</p>" +
                    "<p><b>Opening Hours:</b> Mon - Fri: 09:00 AM - 05:00 PM</p>"+
                    "<p><b>Number:</b> 65124000</p>" +
                    '<p><a href="http://www.nafa.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.2986824, lng: 103.8504878}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Yale-NUS College'}
                    title={'Yale-NUS Collegen'}
                    description = {"<h5>Yale-NUS College is a liberal arts college in Singapore. Established in 2011 as a collaboration between Yale University and the National University of Singapore, it was the first liberal arts college in Singapore and one of the first few in Asia.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 63 reviews</p>" +
                    "<p><b>Address:</b> 16 #01-220, 16 College Ave West, 138527</p>" +
                    "<p><b>Number:</b> 66011000</p>" +
                    '<p><a href="http://www.yale-nus.edu.sg/">Official Website</a></p>'}
                    position={{lat: 1.3072465, lng: 103.7723163}}/> 

                {/* -----------------------cafe-------------------------- */}
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Soul Brew'}
                    title={'Soul Brew'}
                    description = {"<h5>Locally roasted & fair trade organic coffee & a handcrafted specialty brunch menu.</h5>" +
                    "<p><b>Rating:</b> 5 &#9733&#9733&#9733&#9733&#9733 24 reviews</p>" +
                    "<p><b>Address:</b> 10 Farrer Park Station Rd, Floor 1 Holiday Inn Singapore, Singapore 217564</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 08:00 AM - 09:00 PM</p>"+
                    "<p><b>Number:</b> 68248888</p>" +
                    '<p><a href="https://www.ihg.com/holidayinn/hotels/gb/en/singapore/sinli/hoteldetail">Official Website</a></p>'}
                    position={{lat: 1.312060, lng: 103.854073}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Grids Coffee Bar'}
                    title={'Grids Coffee Bar'}
                    description = {"<h5>Handmade Asian fusion classics & breakfast options dished up in a bright, minimalist coffee shop.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 709 reviews</p>" +
                    "<p><b>Address:</b> 200 South Bridge Rd, Level 1 2 & 3, Singapore 058749</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 09:00 AM - 06:00 PM</p>"}
                    position={{lat: 1.283270, lng: 1.283270}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'The Book Cafe'}
                    title={'The Book Cafe'}
                    description = {"<h5>Casual, book-filled hangout dishing up breakfast staples, bowls, burgers & noodles, plus coffee.</h5>" +
                    "<p><b>Rating:</b> 4 &#9733&#9733&#9733&#9733&#9734 1,017 reviews</p>" +
                    "<p><b>Address:</b> 20 Martin Rd, #01-02 Seng Kee Building, Singapore 239070</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 08:30 AM - 05:30 PM</p>"+
                    "<p><b>Number:</b> 68875430</p>" +
                    '<p><a href="https://www.thebookcafesg.com/">Official Website</a></p>'}
                    position={{lat: 1.292230, lng: 103.840851}}/> 

                <Marker
                    onClick={this.onMarkerClick}
                    name={'The Coffee Academics'}
                    title={'The Coffee Academics'}
                    description = {"<h5>Casual, book-filled hangout dishing up breakfast staples, bowls, burgers & noodles, plus coffee.</h5>" +
                    "<p><b>Rating:</b> 3 &#9733&#9733&#9733&#9734&#9734 799 reviews</p>" +
                    "<p><b>Address:</b> 252 North Bridge Road #B1, #12, Singapore 179103</p>" +
                    "<p><b>Opening Hours:</b> Mon - Sun: 08:00 AM - 10:00 PM</p>"+
                    "<p><b>Number:</b> 62660560</p>" +
                    '<p><a href="http://www.the-coffeeacademicssg.com/">Official Website</a></p>'}
                    position={{lat: 1.3014643, lng: 103.8495681}}/> 

                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h3>{this.state.selectedPlace.name}</h3>
                        <p>
                            <div dangerouslySetInnerHTML={{ __html: this.state.selectedPlace.description }} />
                        </p>
                    </div>
                </InfoWindow>

                </Map>
        </div>
        
      )
    }
  }
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB7rymRSSPLGTz7DqGKqxVtEOGOyFpzQr0')
})(MapContainer)