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
                                <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" style={props} alt="back arrow"/></Link>
                                <h1 className="home__title" style={props}>Popular Bike Routes</h1>
                            </div>
                            {this.props.routeList.map(route => {
                                return  <Link to={`/bikeroutes/${route._id}`} key={route._id} style={props}>
                                            <Select  
                                                position="selection__titleRight"
                                                id={route._id}
                                                imageUrl={route.route_pic_url}
                                                title={route.route_name}/>
                                        </Link>;
                            })}
                            {/* <Link to='/bikeroutes/5c917be8b562941b60c60b45' style={props}>
                                <Select position="selection__titleRight" 
                                        imageUrl="/Assets/images/BikeRoutes/beltline.jpg" 
                                        title="Beltline-Lower Don Valley"/>
                            </Link> */}
                        </div>
                    </div>
                    )
                }
            </Spring>
        )
    }
}
