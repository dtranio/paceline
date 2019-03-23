import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

export default class GroupForm extends Component {
    render() {
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
                { props => (
                        <div className="formContainer">
                            <div className="groupList__header wrapper">
                                <Link to='/groups'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                                <h1 className="home__title">Create a Group</h1>
                            </div>
                            <div className="formContainer__image wrapper" style={props}>
                                <img src="/Assets/images/groupform2.jpg" alt="two cyclists in sunset"/>
                            </div>
                            <form action="" className="groupForm wrapper" style={props}>
                                <div className="groupForm__groupName">
                                    <label>Group Name</label>
                                    <input type="text" placeholder="Group Name" name="groupName_input"/>
                                </div>
                                <div className="groupForm__groupDescription">
                                    <label>Description</label>
                                    <textarea type="text" placeholder="Enter a description about the ride" name="groupDescription_input" resize="none" maxLength="250"/>
                                </div>
                                {/* Meetup date + time, Route + Expected Duration */}
                                <div className="groupForm__submit">
                                    <input type="submit" className="groupForm__submit--button"/>
                                </div>
                            </form>
                        </div>
                    )
                }
            </Spring>
        )
    }
}
