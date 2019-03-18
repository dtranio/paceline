import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class GroupRides extends Component {
    render() {
        return (
            <div className="groupList">
                <div className="groupList__header wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt=""/></Link>
                    <h1 className="home__title">Upcoming Group Rides</h1>
                </div>
            </div>
        )
    }
}
