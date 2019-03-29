/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline} from 'react-google-maps';
import Select from './Select';
import axios from 'axios';
  
export default class BikeRoute extends Component {
    state = {
        pathCoordinates: [],
        routeDetails: {}
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/bikeroutes/${this.props.match.params.routeId}`)
        .then(route => {
            this.setState({
                routeDetails: route.data
            })
        });
    }
    render() {
        const {bike_type, center, distance, route_description, route_gallery_url, route_gallery_url2, route_name, route_pic_url} = this.state.routeDetails;
        // New request to Google Maps' Direction Service API
        const DirectionsService = new google.maps.DirectionsService();
        // Requesting optimal route from origin to destination using a bike
        DirectionsService.route({   
            origin: this.state.routeDetails.origin, 
            destination: this.state.routeDetails.destination,  
            travelMode: google.maps.TravelMode.BICYCLING,   
            },  
            (response, status) => {   
                if (status === google.maps.DirectionsStatus.OK) {   
                    // Obtain array of coordinates and store them in state
                    const coordinates = response.routes[0].overview_path;   
                    this.setState({
                        pathCoordinates: coordinates,
                    });
                }
        });
        const Map = withGoogleMap(() => (
            <GoogleMap
                defaultCenter = { center }
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
                {/* Draw path using array of coordinates */}
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
                {/* Render the Google Map component */}
                <Map
                    containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
                <div className="routeContainer wrapper">
                    <div className="routeContainer__header">
                        <img src="/Assets/images/Icons/back-arrow.png" alt="back arrow" onClick={this.props.history.goBack}/>
                        <h1 className="home__title">{route_name}</h1>
                    </div>
                    <div className="routeDetails">
                        <Select position="selection__titleRight" imageUrl={route_pic_url} />
                        <div className="routeDetails__description">
                            <h2>Distance</h2>
                            <p>{`${distance}km`}</p>
                            <h2>Recommended Bike Type</h2>
                            <p>{bike_type}</p>
                            <h2>About the Route</h2>
                            <p>{route_description}</p>
                        </div>
                        <div className="routeDetails__gallery">
                            <h2 className="home__title">Gallery</h2>
                            <img src={route_gallery_url} alt="trail"/>
                            <img src={route_gallery_url2} alt="trail"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
