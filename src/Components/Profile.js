import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops';
import Cyclist from './Cyclist';
import GroupSelect from './GroupSelect';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Profile extends Component {
    state = {
        cyclistInfo: {},
        userInfo: {},
        currentUrl: "",
        loaded: false,
        friends: false
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
        axios.get(`http://localhost:8080/cyclists/${this.props.loggedInAs}`)
            .then(user => {
                this.setState({
                    userInfo: user.data
                })
                this.checkFriendship();
            })
            .catch(error => {
                console.log(error);
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
                    this.checkFriendship();
                    window.scroll(0,0);
                });
        }
    }
    checkFriendship() {
        for (let i = 0; i < this.state.userInfo.friends.length; i++) {
            if (this.props.match.params.cyclistId === this.state.userInfo.friends[i]._id) {
                this.setState({
                    friends: true
                });
                break;
            }
        }
    }
    addRemove = () => {
        if (this.state.friends) {
            let friendship = {
                friendAction: "remove",
                user: this.props.loggedInAs
            }
            let config = {
                method: "PUT",
                url: `http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`,
                data: friendship,
                headers: {
                    "content-type": "application/json"
                }
            }
            // PUT request
            axios(config) 
                .then(response => {
                    axios.get(`http://localhost:8080/cyclists/${this.props.loggedInAs}`)
                        .then(cyclist => {
                            this.setState({
                                userInfo: cyclist.data
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    axios.get(`http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`)
                        .then(cyclist => {
                            this.setState({
                                cyclistInfo: cyclist.data
                            });
                            this.checkFriendship();
                        })
                        .catch(error => {
                            console.log(error);
                        });     
                    this.setState({
                        friends: false
                    })
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else {
            let friendship = {
                friendAction: "add",
                user: this.props.loggedInAs
            }
            let config = {
                method: "PUT",
                url: `http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`,
                data: friendship,
                headers: {
                    "content-type": "application/json"
                }
            }
            // PUT request
            axios(config) 
                .then(response => {
                    axios.get(`http://localhost:8080/cyclists/${this.props.loggedInAs}`)
                        .then(cyclist => {
                            this.setState({
                                userInfo: cyclist.data
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    axios.get(`http://localhost:8080/cyclists/${this.props.match.params.cyclistId}`)
                        .then(cyclist => {
                            this.setState({
                                cyclistInfo: cyclist.data
                            });
                            this.checkFriendship();
                        })
                        .catch(error => {
                            console.log(error);
                        });        
                    this.setState({
                        friends: true
                    })
                })
                .catch(error => {
                    console.log(error);
            }); 
        }
    }
    render() {
        const {age, first_name, bio, interests, profile_pic_url, region, bike_owned, friends, joined_groups} = this.state.cyclistInfo
        console.log(this.state.cyclistInfo)
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
                                {this.props.loggedInAs !== this.props.match.params.cyclistId ? 
                                <>
                                    <button className="profile__button--style profile__button--add" onClick={this.addRemove}>{this.state.friends ? "Unfriend" : "Add Friend"}</button>
                                    <button className="profile__button--style profile__button--message">Message</button>
                                    </>
                                : 
                                    <button className="profile__button--style profile__button--message">Edit Profile</button>
                                }
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
                                        <img src="/Assets/images/Icons/bio.png" alt="icon"/>
                                    </div>
                                    <p>{bio}</p>
                                </div>
                                <div className="userDetails__interests">
                                    <div className="userDetails__interests--container">
                                        <img src="/Assets/images/Icons/canvas.png" alt="interests icon"/>
                                    </div>
                                    <p>{interests}</p>
                                </div>
                            </div>
                            {this.props.loggedInAs === this.props.match.params.cyclistId ? 
                                <div className="upcomingList wrapper">
                                    <h1 className="home__title">{`My Upcoming Rides (${joined_groups.length})`}</h1>
                                    {joined_groups.map(group => {
                                        return  <Link to={`/groups/${group._id}`} key={group._id}><GroupSelect title={group.group_name} 
                                                                                                            riders={group.attending.length}
                                                                                                            date={group.meetup_date}
                                                                                                            route={group.bike_route.route_name}
                                                                                                            id={group._id}
                                                                                                            key={group._id} /></Link>
                                    })}        
                                </div>
                            : null}
                            <div className="friendsList wrapper">
                                <h1 className="home__title">{`Friends (${friends.length})`}</h1>
                                {friends.map(cyclist => {
                                    return  <Cyclist 
                                                name={cyclist.first_name} 
                                                imageUrl={cyclist.profile_pic_list_url} 
                                                key={cyclist._id} 
                                                id={cyclist._id} 
                                                region={cyclist.region}/>
                                })}
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