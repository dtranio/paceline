import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import Select from './Select';

export default class GroupForm extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
                { props => (
                    <div className="formContainer" style={props}>
                        <div className="groupList__header wrapper">
                            <Link to='/groups'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                            <h1 className="home__title">Create a Group</h1>
                        </div>
                        <Select imageUrl="/Assets/images/findroutes.jpg"/>
                        <form action="">
                            <input type="text"/>
                        </form>
                    </div>
                    )
                }
            </Spring>
        )
    }
}
