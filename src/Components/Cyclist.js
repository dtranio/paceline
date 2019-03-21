import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Cyclist extends Component {
    render() {
        return (
            <Link to={`/cyclists/${this.props.id}`}>
                <div className="cyclist">
                    <img src={this.props.imageUrl} alt=""/>
                    <h2 className="cyclist__name">{this.props.name}</h2>
                    <h2 className="cyclist__region">{this.props.region}</h2>
                </div>
            </Link>
        )
    }
}
