/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline} from 'react-google-maps';
import { Link } from 'react-router-dom';
import Select from './Select';
  
export default class BikeRoute extends Component {
    state = {
        pathCoordinates: []
    }
    render() {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({   
            origin: 'Cherry Beach Clarke Beach Park', 
            destination: 'Tommy Thompson Lighthouse',  
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
        const Map = withGoogleMap(() => (
            <GoogleMap
                defaultCenter = { { lat: 43.630033, lng: -79.327822} }
                defaultZoom = { 12 }
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
            <div className="bikeRoute">
                <Map
                    containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
                <div className="routeContainer wrapper">
                    <div className="cyclistList__header">
                        <Link to='/bikeroutes'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                        <h1 className="home__title">Leslie Street Spit</h1>
                    </div>
                    <div className="routeDetails">
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/leslie.jpeg" />
                        <div className="routeDetails__description">
                            <h2>Distance</h2>
                            <p>7.5km</p>
                            <h2>Recommended Bike Type</h2>
                            <p>Road</p>
                            <h2>About the Route</h2>
                            <p>The 5-km long peninsula – within minutes of downtown Toronto – is a surprise to many Toronto visitors. There are lagoons, bird sanctuaries, coves, wetlands, ponds, wildlife preservation projects, note-worthy examples of land reclamation – and a bona fide lighthouse. Best of all, this trail provides a great scenic view of the Toronto skyline!</p>
                        </div>
                        <div className="routeDetails__gallery">
                            <h2 className="home__title">Gallery</h2>
                            <img src="/Assets/images/BikeRoutes/leslie/1.jpeg" alt="trail"/>
                            <img src="/Assets/images/BikeRoutes/leslie/2.jpg" alt="trail"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
