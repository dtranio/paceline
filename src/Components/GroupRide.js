/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { Link } from 'react-router-dom';
import Select from './Select';
import Cyclist from './Cyclist';
import axios from 'axios';

export default class GroupRide extends Component {
    state = {
        pathCoordinates: [],
        groupDetails: {},
        loaded: false
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/groups/${this.props.match.params.groupId}`)
        .then(group => {
            this.setState({
                groupDetails: group.data,
                loaded: true
            });
            console.log(this.state.groupDetails);
        });
    }
    render() {
        if (this.state.loaded) {
            console.log(this.state.groupDetails)
            const {group_name, description, expected_duration, meetup_date, meetup_time, meetup_location, attending} = this.state.groupDetails;
            const {center, route_name, route_pic_url, _id} = this.state.groupDetails.bike_route;
            const DirectionsService = new google.maps.DirectionsService();
            // DirectionsService.route({   
            //     origin: this.state.groupDetails.bike_route.origin, 
            //     destination: this.state.groupDetails.bike_route.destination,   
            //     travelMode: google.maps.TravelMode.BICYCLING,   
            //     },  
            //     (response, status) => {   
            //         if (status === google.maps.DirectionsStatus.OK) {   
            //             const coordinates = response.routes[0].overview_path;   
            //             this.setState({   
            //                 pathCoordinates: coordinates,
            //             });
            //         }
            // });
            const Map = withGoogleMap(props => (
                <GoogleMap
                    defaultCenter = { center }
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
                    {/* <Polyline
                        path={this.state.pathCoordinates}
                        geodesic={true}
                        options={{
                            strokeColor: "#ff2527",
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                        }}
                    /> */}
                </GoogleMap>
            ));
            return (
                <div className="rideDetails">
                    <Map
                        containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                        mapElement={ <div style={{ height: `100%` }} /> }
                    />
                    <div className="riderDetails__header wrapper">
                        <div className="riderDetails__header--backArrow" onClick={this.props.history.goBack}>
                            <img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/>
                        </div>
                        <h1 className="home__title">{group_name}</h1>
                    </div>
                    <div className="groupDetails wrapper">
                        <Link to={`/bikeroutes/${_id}`}>
                            <Select position="selection__titleRight" imageUrl={route_pic_url} title={route_name}/>
                        </Link>
                        <div className="groupDetails__description">
                            <h2>Description</h2>
                            <p>{description}</p>
                            <h2>Length</h2>
                            <p>{expected_duration}</p>
                            <h2>Date & Time</h2>
                            <p>{`${meetup_date} @ ${meetup_time}`}</p>
                            <h2>Meeting Spot</h2>
                            <p>{meetup_location}</p>
                        </div>
                        <div className="rideDetails__join">
                            <button>Join Ride</button> 
                        </div>
                        <h2 className="home__title">{`Attending (${attending.length})`}</h2>    
                    </div>
                    <div className="rideDetails__attending wrapper">
                        {attending.map(attendee => {
                            return  <Cyclist 
                                        key={attendee._id}
                                        imageUrl={attendee.profile_pic_list_url}
                                        name={attendee.first_name}
                                        region={attendee.region} 
                                        id={attendee._id}
                                    />
                                    
                        })}
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }
}
