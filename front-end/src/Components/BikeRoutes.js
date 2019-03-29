import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import Select from './Select';

export default class BikeRoutes extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
            { props => (
                    <div className="routeList">
                        <div className="routeList__container wrapper" >
                            <div className="cyclistList__header">
                                <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" style={props} alt="back arrow"/></Link>
                                <h1 className="home__title" style={props}>Popular Bike Routes</h1>
                            </div>
                            {/* Render route list selection cards */}
                            {this.props.routeList.map(route => {
                                return  <Link to={`/bikeroutes/${route._id}`} key={route._id} style={props}>
                                            <Select  
                                                position="selection__titleRight"
                                                id={route._id}
                                                imageUrl={route.route_pic_url}
                                                title={route.route_name}/>
                                        </Link>;
                            })}
                        </div>
                    </div>
                    )
                }
            </Spring>
        )
    }
}
