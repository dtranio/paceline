import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops';
import Cyclist from './Cyclist';
import axios from 'axios';

export default class Profile extends Component {
    state = {
        cyclistInfo: {},
        currentUrl: "",
        loaded: false
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`)
            .then(cyclist => {
                this.setState({
                    cyclistInfo: cyclist.data,
                    currentUrl: this.props.match.params.cyclistId,
                    loaded: true
                });
            });
    }
    componentDidUpdate() {
        if (this.state.currentUrl !== this.props.match.params.cyclistId) {
            axios.get(`http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`)
                .then(cyclist => {
                    this.setState({
                        cyclistInfo: cyclist.data,
                        currentUrl: this.props.match.params.cyclistId,
                        loaded: true
                    });
                    window.scroll(0,0);
                });
        }
    }
    render() {
        const {age, first_name, bio, interests, profile_pic_url, region, bike_owned, friends, joined_groups} = this.state.cyclistInfo
        if (this.state.loaded) {
            return (
                <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
                    { props => (
                        <div className="profile" style={props}>
                            <div className="profile__header profile--back wrapper">
                                <div className="profile__header--backArrow" onClick={this.props.history.goBack}>
                                    <img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/>
                                </div>
                                <div className="profile__user">
                                    <img src={profile_pic_url} alt="user headshot"/>
                                    <div className="profile__user--general">
                                        <h1>{first_name}</h1>
                                        <h1>{`• ${age}`}</h1>
                                    </div>
                                    <h2>{region}</h2>
                                </div>
                            </div>
                            <div className="profile__button">
                                <button className="profile__button--style profile__button--add">Add Friend</button>
                                <button className="profile__button--style profile__button--message">Message</button>
                            </div>
                            <div className="userDetails wrapper">
                                <div className="userDetails__bikeOwned">
                                    <div className="userDetails__bikeOwned--container">
                                        <img src="/Assets/images/Icons/bicycle.png" alt="bike icon"/>
                                    </div>
                                    <p>{bike_owned}</p>
                                </div>
                                <div className="userDetails__bio">
                                    <div className="userDetails__bio--container">
                                        <img src="/Assets/images/Icons/bio.png" alt=" icon"/>
                                    </div>
                                    <p>{bio}</p>
                                </div>
                                <div className="userDetails__interests">
                                    <div className="userDetails__interests--container">
                                        <img src="/Assets/images/Icons/canvas.png" alt="interests icon"/>
                                    </div>
                                    <p>{interests}</p>
                                </div>
                                <h1 className="home__title">Friends</h1>
                            </div>
                            <div className="friendsList wrapper">
                                {friends.map(friend => {
                                    return <Cyclist imageUrl={friend.profile_pic_list_url} 
                                                    name={friend.first_name} 
                                                    region={friend.region}
                                                    id={friend._id}
                                                    key={friend._id}/>
                                })}
                            </div>
                            <div className="upcomingList wrapper">
                                <h1 className="home__title">Upcoming Rides</h1>
                                {/* {friends.map(friend => {
                                    return <Cyclist imageUrl={friend.profile_pic_list_url} 
                                                    name={friend.first_name} 
                                                    region={friend.region}
                                                    id={friend._id}
                                                    key={friend._id}/>
                                })} */}
                            </div>
                        </div>
                        )
                    }
                </Spring>
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