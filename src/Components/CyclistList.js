import React, { Component } from 'react';
import Cyclist from './Cyclist';
import { Link } from 'react-router-dom';

export default class CyclistList extends Component {
    render() {
        return (
            <div className="cyclistList">
                <div className="cyclistList__header wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                    <h1 className="home__title">Cyclists</h1>
                </div>
                <div className="cyclers wrapper">
                    {this.props.cyclistList.map(cyclist => {
                        return <Cyclist 
                            name={cyclist.first_name} 
                            imageUrl={cyclist.profile_pic_list_url} 
                            key={cyclist._id} 
                            id={cyclist._id} 
                            region={cyclist.region}/>;
                    })}
                </div>
            </div>
        )
    }
}
