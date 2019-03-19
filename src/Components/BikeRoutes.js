import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Select from './Select';

export default class BikeRoutes extends Component {
    render() {
        return (
            <div className="home">
                <div className="userSelectRow wrapper">
                    <div className="cyclistList__header">
                        <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                        <h1 className="home__title">Popular Bike Routes</h1>
                    </div>
                    <Link to='/bikeroutes/R1'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/leslie.jpeg" title="Leslie Street Spit"/>
                    </Link>
                    <Link to='/bikeroutes/R2'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/beltline.jpg" title="Beltline-Lower Don Valley"/>
                    </Link>
                    <Link to='/bikeroutes/R3'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/bluffs.jpg" title="Scarborough Bluffs"/>
                    </Link>
                    <Link to='/bikeroutes/R4'>
                        <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/martin.jpg" title="Martin Goodman Trail"/>
                    </Link>
                </div>
           </div>
        )
    }
}
