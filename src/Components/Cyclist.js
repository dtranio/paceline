
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

export default class Cyclist extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -150 }} to={{ marginTop: 0 }}>
                { props => (
                    <Link to={`/cyclists/${this.props.id}`} style={props}>
                        <div className="cyclist">
                            <img src={this.props.imageUrl} alt=""/>
                            <h2 className="cyclist__name">{this.props.name}</h2>
                            <h2 className="cyclist__region">{this.props.region}</h2>
                        </div>
                    </Link>
                    )
                }
            </Spring>
        )
    }
}