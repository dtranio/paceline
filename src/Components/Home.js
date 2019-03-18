import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Select from './Select';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="userSelectRow wrapper">
                    <h1 className="home__title ">Welcome</h1>
                    <Link to='/cyclists'>
                        <Select position="selection__titleLeft" imageUrl="/Assets/images/findcyclists.jpg" title="Find Cyclists"/>
                    </Link>
                    <Link to='/groups'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/grouprides.jpg" title="Find Group Rides"/>
                    </Link>
                    <Link to='/bikeroutes'>
                        <Select position="selection__titleLeft" imageUrl="/Assets/images/findroutes.jpg" title="Discover Bike Trails"/>
                    </Link>
                    <Link to='/cyclists/hi'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/profile.jpg" title="My Profile"/>
                    </Link>
                </div>
            </div>
        )
    }
}
