import React, { Component } from 'react'

export default class Select extends Component {
    render() {
        return (
            <div className="groupSelection">
                <img src="/Assets/images/group.jpg" alt=""/>
                <h2 className="groupSelection__groupName">{this.props.title}</h2>
                <h3 className="groupSelection__route">{`${this.props.route}`}</h3>
                <h3 className="groupSelection__riders">{`Number of Riders: ${this.props.riders}`}</h3>
                <h3 className="groupSelection__date">{`Date: ${this.props.date}`}</h3>
            </div>
        )
    }
}
