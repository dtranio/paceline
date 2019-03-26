import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops';
import Select from './Select';
import { Link } from 'react-router-dom';

export default class EditProfile extends Component {
    render() {
        console.log(this.props.user)
        return (
            <Spring from={{ marginTop: -400 }} to={{ marginTop: 0 }}>
            { props => (
                        <div className="editProfile">
                            <div className="editProfile__header wrapper">
                                <img src="/Assets/images/Icons/back-arrow.png" alt="back arrow" onClick={this.props.history.goBack} style={props}/>
                                <h1 className="home__title" style={props}>Edit Profile</h1>
                            </div>
                            <div className="editProfile__bannerContainer wrapper">
                                    <Link to={`/cyclists/${this.props.loggedInAs}`}>
                                        <Select position="selection__titleRight" imageUrl="/Assets/images/profile.jpg" title="My Profile"/>
                                    </Link>
                            </div>
                            <div className="editProfileForm">
                                <form className="wrapper">
                                    <div className="editProfileForm__bikeOwned">
                                        <label htmlFor="bikeOwned__input">Bike Owned</label>
                                        <input type="text" defaultValue={this.props.user.bike_owned} name="bikeOwned__input" id="bikeOwned__input" maxLength="50"/>
                                    </div>
                                    <div className="editProfileForm__description">
                                        <label htmlFor="description__input">Description</label>
                                        <textarea type="text" defaultValue={this.props.user.bio} name="description__input" id="description__input" resize="none" maxLength="250"/>
                                    </div>
                                    <div className="editProfileForm__interests">
                                        <label htmlFor="interests__input">Bike Owned</label>
                                        <input type="text" defaultValue={this.props.user.interests} name="interests__input" id="interests__input" maxLength="150"/>
                                    </div>
                                </form>
                                <div>
                                    <input type="submit" className="" value="Update Profile"/>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Spring>
        )
    }
}
