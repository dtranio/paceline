import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Select from './Select';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Link to='/'><img src="/Assets/images/icons/exit.png" alt="logout" className="home__logout"/></Link>
                <div className="userSelectRow wrapper">
                    <h1 className="home__title ">{`Welcome, ${this.props.user.first_name}`}</h1>
                    <Link to='/cyclists'>
                        <Select position="selection__titleLeft" imageUrl="/Assets/images/findcyclists.jpg" title="Find Cyclists"/>
                    </Link>
                    <Link to='/groups'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/grouprides.jpg" title="Find Group Rides"/>
                    </Link>
                    <Link to='/bikeroutes'>
                        <Select position="selection__titleLeft" imageUrl="/Assets/images/findroutes.jpg" title="Discover Bike Trails"/>
                    </Link>
                    <Link to='/cyclists/5c92d64d7214992360212833'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/profile.jpg" title="My Profile"/>
                    </Link>
                </div>
            </div>
        )
    }
}
