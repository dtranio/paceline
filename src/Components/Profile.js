import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Cyclist from './Cyclist';
import axios from 'axios';

export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <div className="groupList__header profile--back wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt=""/></Link>
                    <div className="profile__user">
                        <img src="/Assets/images/profile/guy2Thumb.jpg" alt=""/>
                        <div className="profile__user--general">
                            <h1>William</h1>
                            <h1>• 22</h1>
                        </div>
                        <h2>Downtown</h2>
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
                        <p>Supercycle</p>
                    </div>
                    <div className="userDetails__bio">
                        <div className="userDetails__bio--container">
                            <img src="/Assets/images/Icons/bio.png" alt=" icon"/>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse deserunt mollitia expedita aspernatur. Officiis nisi cumque adipisci dignissimos quae?</p>
                    </div>
                    <div className="userDetails__interests">
                        <div className="userDetails__interests--container">
                            <img src="/Assets/images/Icons/canvas.png" alt="interests icon"/>
                        </div>
                        <p>Photography, Basketball, Swimming</p>
                    </div>
                    <h1 className="home__title">Friends</h1>
                </div>
                <div className="friendsList wrapper">
                    <Cyclist imageUrl="/Assets/images/profile/girl.jpg" name="Alessia" region="Downtown"/>
                    <Cyclist imageUrl="/Assets/images/profile/girl2.jpg" name="Emma" region="Scarborough"/>
                </div>
                <div className="wrapper">
                    {/* <h1 className="home__title">Upcoming Rides</h1> */}
                </div>
            </div>
        )
    }
}