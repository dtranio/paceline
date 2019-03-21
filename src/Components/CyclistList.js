import React, { Component } from 'react';
import Cyclist from './Cyclist';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

export default class CyclistList extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
                { props => (
                        <div className="cyclistList" style={props}>
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
            </Spring>
        )
    }
}
