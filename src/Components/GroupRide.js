/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline} from 'react-google-maps';
import { Link } from 'react-router-dom';
import Select from './Select';
import Cyclist from './Cyclist';

export default class GroupRide extends Component {
    state = {
        pathCoordinates: []
    }
    render() {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({   
            origin: 'Davisville', 
            destination: 'The Distillery Historic District',   
            travelMode: google.maps.TravelMode.BICYCLING,   
            },  
            (response, status) => {   
                if (status === google.maps.DirectionsStatus.OK) {   
                    const coordinates = response.routes[0].overview_path;   
                    this.setState({   
                        pathCoordinates: coordinates,
                    });
                }
        });
        const Map = withGoogleMap(props => (
            <GoogleMap
              defaultCenter = { { lat: 43.69062, lng: -79.3709} }
              defaultZoom = { 13 }
              defaultOptions={{
                scaleControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                gestureHandling: 'greedy',
                panControl: true,
                zoomControl: true,
                rotateControl: false,
                fullscreenControl: false
              }}
            >
                <Polyline
                    path={this.state.pathCoordinates}
                    geodesic={true}
                    options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                    }}
                />
            </GoogleMap>
        ));
        return (
            <div className="rideDetails">
                <Map
                    containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
                <div className="cyclistList__header wrapper">
                    <Link to='/groups'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                    <h1 className="home__title">Da Champs</h1>
                </div>
                <div className="groupDetails wrapper">
                    <Link to='/bikeroutes/R1'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/beltline.jpg" title="Beltline-Lower Don Valley"/>
                    </Link>
                    <div className="groupDetails__description">
                        <h2>Description</h2>
                        <p>3 hours</p>
                        <h2>Length</h2>
                        <p>3 hours</p>
                        <h2>Date & Time</h2>
                        <p>April 5, 2019 | 4pm</p>
                        <h2>Meeting Spot</h2>
                        <p>Davisville Station</p>
                    </div>
                    <div className="rideDetails__join">
                        <button>Join Ride</button> 
                     </div>
                    <h2 className="home__title">Attending</h2>    
                </div>
                <div className="rideDetails__attending wrapper">
                    <Cyclist imageUrl="/Assets/images/profile/girl.jpg" name="Alessia" region="Downtown"/>
                    <Cyclist imageUrl="/Assets/images/profile/girl2.jpg" name="Emma" region="Scarborough"/>
                </div>
            </div>
        )
    }
}
