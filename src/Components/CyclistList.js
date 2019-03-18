import React, { Component } from 'react';
import Cyclist from './Cyclist';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class CyclistList extends Component {
    componentDidMount() {
        axios.get('http://localhost:8080/cyclists')
            .then(response => {
                console.log(response.data);
            });
    }
    render() {
        return (
            <div className="cyclistList">
                <div className="cyclistList__header wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt=""/></Link>
                    <h1 className="home__title">Cyclists</h1>
                </div>
                <div className="cyclers wrapper">
                    <Cyclist imageUrl="/Assets/images/profile/girl.jpg" name="Alessia" region="Downtown"/>
                    <Cyclist imageUrl="/Assets/images/profile/guy.jpg" name="Dan" region="North York"/>
                    <Cyclist imageUrl="/Assets/images/profile/girl2.jpg" name="Emma" region="Scarborough"/>
                    <Cyclist imageUrl="/Assets/images/profile/guy2.jpg" name="William" region="Downtown"/>
                    <Cyclist imageUrl="/Assets/images/profile/guy3.jpg" name="Ethan" region="East York"/>
                    <Cyclist imageUrl="/Assets/images/profile/girl3.jpg" name="Charlotte" region="Danforth"/>
                </div>
            </div>
        )
    }
}
