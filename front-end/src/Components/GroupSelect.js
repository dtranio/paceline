import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';

export default class Select extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -200 }} to={{ marginTop: 0 }}>
            { props => (
                    <div className="groupSelection" style={props}>
                        <img src="/Assets/images/group.jpg" alt=""/>
                        <h2 className="groupSelection__groupName">{this.props.title}</h2>
                        <h3 className="groupSelection__route">{`${this.props.route}`}</h3>
                        <h3 className="groupSelection__riders">{`Number of Riders: ${this.props.riders}`}</h3>
                        <h3 className="groupSelection__date">{`${this.props.date}`}</h3>
                    </div>
                    )
                }
            </Spring>
        )
    }
}
