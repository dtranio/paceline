/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { Link } from 'react-router-dom';
import Select from './Select';
import Cyclist from './Cyclist';
import axios from 'axios';
import Modal from 'react-modal';

export default class GroupRide extends Component {
    state = {
        pathCoordinates: [],
        groupDetails: {},
        loaded: false,
        joined: false,
        modalIsOpen: false
    }
    componentDidMount() {
        console.log(this.props.updateGroupList)
        axios.get(`http://localhost:8080/groups/${this.props.match.params.groupId}`)
            .then(group => {
                this.setState({
                    groupDetails: group.data,
                    loaded: true
                });
                this.checkJoined()
            });
    }
    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    inviteFriends = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    checkJoined() {
        for (let i = 0; i < this.state.groupDetails.attending.length; i++) {
            if (this.props.loggedInAs === this.state.groupDetails.attending[i]._id) {
                this.setState({
                    joined: true
                })
                break;
            }
        }
    }    
    joinLeave = () => {
        if (this.state.joined) {
            let groupStatus = {
                groupAction: "leave",
                user: this.props.loggedInAs
            }
            let config = {
                method: "PUT",
                url: `http://localhost:8080/groups/${this.props.match.params.groupId}`,
                data: groupStatus,
                headers: {
                    "content-type": "application/json"
                }
            }
            axios(config) 
                .then(response => {
                    axios.get(`http://localhost:8080/groups/${this.props.match.params.groupId}`)
                        .then(group => {
                            this.setState({
                                joined: false,
                                groupDetails: group.data
                            });
                            this.checkJoined();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else {
            let groupStatus = {
                groupAction: "join",
                user: this.props.loggedInAs
            }
            let config = {
                method: "PUT",
                url: `http://localhost:8080/groups/${this.props.match.params.groupId}`,
                data: groupStatus,
                headers: {
                    "content-type": "application/json"
                }
            }
            axios(config) 
                .then(response => {
                    axios.get(`http://localhost:8080/groups/${this.props.match.params.groupId}`)
                        .then(group => {
                            this.setState({
                                joined: true,
                                groupDetails: group.data
                            });
                            this.checkJoined();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    hello() {
        console.log("hello")
    }
    render() {
        if (this.state.loaded) {
            const {group_name, description, meetup_date, meetup_spot, attending} = this.state.groupDetails;
            console.log(this.state.groupDetails)
            console.log(this.props.currentUser)
            const {center, route_name, route_pic_url, _id} = this.state.groupDetails.bike_route;
            // const DirectionsService = new google.maps.DirectionsService();
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
            // const Map = withGoogleMap(props => (
            //     <GoogleMap
            //         defaultCenter = { center }
            //         defaultZoom = { 13 }
            //         defaultOptions={{
            //             scaleControl: false,
            //             mapTypeControl: false,
            //             streetViewControl: false,
            //             gestureHandling: 'greedy',
            //             panControl: true,
            //             zoomControl: true,
            //             rotateControl: false,
            //             fullscreenControl: false
            //         }}
            //     >
            //         <Polyline
            //             path={this.state.pathCoordinates}
            //             geodesic={true}
            //             options={{
            //                 strokeColor: "#ff2527",
            //                 strokeOpacity: 0.8,
            //                 strokeWeight: 4,
            //             }}
            //         />
            //     </GoogleMap>
            // ));
            return (
                <div className="rideDetails">
                    {/* <Map
                        containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                        mapElement={ <div style={{ height: `100%` }} /> }
                    /> */}
                    <div className="rideDetails__header wrapper">
                        <div className="rideDetails__header--title" onClick={this.props.history.goBack}>
                            <img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/>
                            <h1 className="home__title">{group_name}</h1>
                        </div>
                    </div>
                    <div className="groupDetails wrapper">
                        <Link to={`/bikeroutes/${_id}`}>
                            <Select position="selection__titleRight" imageUrl={route_pic_url} title={route_name}/>
                        </Link>
                        <div className="groupDetails__description">
                            <h2>Description</h2>
                            <p>{description}</p>
                            <h2>Date & Time</h2>
                            <p>{meetup_date}</p>
                            <h2>Meeting Spot</h2>
                            <p>{meetup_spot}</p>
                        </div>
                        <div className="rideDetails__join">
                            <button onClick={this.joinLeave}>{this.state.joined ? "Leave Group" : "Join Ride"}</button> 
                            {this.state.joined ? <button onClick={this.openModal}>Invite Friends</button> : null} 
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                className="Modal"
                                overlayClassName="Overlay"
                                >
                                <div className="modalInvite wrapper">
                                    <h2 onClick={this.hello}>Invite Friends</h2>
                                    <div className="modalInvite__friends">
                                        
                                    </div>
                                    <button onClick={this.inviteFriends}>Hi There</button> 
                                </div>
                            </Modal>
                        </div>
                        <h2 className="home__title">{`Attending (${attending.length})`}</h2>    
                    </div>
                    <div className="rideDetails__attending wrapper">
                        {attending.map(cyclist => {
                            return  <Cyclist 
                                        name={cyclist.first_name} 
                                        imageUrl={cyclist.profile_pic_list_url} 
                                        key={cyclist._id} 
                                        id={cyclist._id} 
                                        region={cyclist.region}/>;
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
