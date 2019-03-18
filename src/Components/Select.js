import React, { Component } from 'react'

export default class Select extends Component {
    render() {
        return (
            <div className="selection">
                <img src={this.props.imageUrl} alt=""/>
                <h2 className={this.props.position}>{this.props.title}</h2>
            </div>
        )
    }
}
