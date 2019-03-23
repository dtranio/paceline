import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops';

export default class Select extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -200 }} to={{ marginTop: 0 }}>
                { props => (
                        <div className="selection" style={props}>
                            <img src={this.props.imageUrl} alt=""/>
                            <h2 className={this.props.position}>{this.props.title}</h2>
                        </div>
                    )
                }
             </Spring>
        )
    }
}
