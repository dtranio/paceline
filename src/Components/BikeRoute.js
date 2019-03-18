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
            <div className="bikeRoute">
                <Map
                    containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
                <div className="routeContainer wrapper">
                    <div className="cyclistList__header">
                        <Link to='/bikeroutes'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                        <h1 className="home__title">Beltline-Lower Don Valley</h1>
                    </div>
                    <div className="routeDetails">
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/beltline.jpg" />
                        <div className="routeDetails__description">
                            <h2>Distance</h2>
                            <p>10km</p>
                            <h2>Recommended Bike Type</h2>
                            <p>Mountain</p>
                            <h2>About the Route</h2>
                            <p>The Beltline Trail is a nine-kilometre path where walkers, joggers, and bikers can traverse the city 
                            from west to east, weaving in and out of neighbourhoods along midtown Toronto.</p>
                            <p>Test</p>
                        </div>
                        <div className="routeDetails__gallery">
                            <h2 className="home__title">Gallery</h2>
                            <img src="/Assets/images/BikeRoutes/beltline/1.jpg" alt=""/>
                            <img src="/Assets/images/BikeRoutes/beltline/2.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
