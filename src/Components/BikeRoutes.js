import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import Select from './Select';

export default class BikeRoutes extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
            { props => (
                    <div className="home">
                        <div className="userSelectRow wrapper" >
                            <div className="cyclistList__header">
                                <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                                <h1 className="home__title">Popular Bike Routes</h1>
                            </div>
                            {/* {this.props.routeList.map(route => {
                                return  <Link to={`/bikeroutes/${route._id}`} key={route._id}>
                                            <Select  
                                                position="selection_titleRight"
                                                id={route._id}
                                                imageUrl={route.route_pic_url}
                                                title={route.route_name}/>
                                        </Link>;
                            })} */}
                            <Link to='/bikeroutes/5c917be8b562941b60c60b45' style={props}>
                                <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/beltline.jpg" title="Beltline-Lower Don Valley"/>
                            </Link>
                            <Link to='/bikeroutes/5c917f57018c4123a8bac648'>
                                <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/leslie.jpeg" title="Leslie Street Spit"/>
                            </Link>
                            <Link to='/bikeroutes/5c9181df2171e21d60a53c95'>
                                <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/martin.jpg" title="Martin Goodman Trail"/>
                            </Link>
                            <Link to='/bikeroutes/5c9184c7aa7c1c05ac5294fc'>
                                <Select position="selection__titleRight" imageUrl="/Assets/images/BikeRoutes/bluffs.jpg" title="Scarborough Bluffs"/>
                            </Link>
                        </div>
                    </div>
                    )
                }
            </Spring>
        )
    }
}
