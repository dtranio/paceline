import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops';
import Select from './Select';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditProfile extends Component {
    constructor(){
        super();
        this.profileForm = React.createRef();
        this.state = {
            formSubmitted: false
        }
    }
    componentDidMount() {
        this.setState({
            formSubmitted: false
        });
    }
    submitForm = e => {
        e.preventDefault();
        const form = this.profileForm.current;
        let data = {
            updated_bikeOwned: form.bikeOwned__input.value,
            updated_description: form.description__input.value,
            updated_interests: form.interests__input.value,
            updated_name: form.name__input.value,
            updated_email: form.email__input.value,
            updated_region: form.region__input.value,
            user: this.props.loggedInAs
        }
        let config = {
            method: "PUT",
            url: `http://localhost:8080/editprofile/`,
            data: data,
            headers: {
                "content-type": "application/json"
            }
        }
        axios(config) 
            .then(response => {
                this.setState({
                    formSubmitted: true
                });
                this.props.updateUser(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }
    render() {
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
                                <form className="wrapper" onSubmit={this.submitForm} ref={this.profileForm}>
                                    <div className="editProfileForm__name">
                                        <label htmlFor="name__input">Name</label>
                                        <input type="text" defaultValue={this.props.user.first_name} name="name__input" id="name__input" maxLength="50" required/>
                                    </div>
                                    <div className="editProfileForm__email">
                                        <label htmlFor="email__input">Email</label>
                                        <input type="text" defaultValue={this.props.user.email} name="email__input" id="email__input" maxLength="100" required/>
                                    </div>
                                    <div className="editProfileForm__region">
                                        <label htmlFor="region__input">Region</label>
                                        <input type="text" defaultValue={this.props.user.region} name="region__input" id="region__input" maxLength="50" required/>
                                    </div>
                                    <div className="editProfileForm__bikeOwned">
                                        <label htmlFor="bikeOwned__input">Bike Owned</label>
                                        <input type="text" defaultValue={this.props.user.bike_owned} name="bikeOwned__input" id="bikeOwned__input" maxLength="50" required/>
                                    </div>
                                    <div className="editProfileForm__description">
                                        <label htmlFor="description__input">Description</label>
                                        <textarea type="text" defaultValue={this.props.user.bio} name="description__input" id="description__input" resize="none" maxLength="250" required/>
                                    </div>
                                    <div className="editProfileForm__interests">
                                        <label htmlFor="interests__input">Interests</label>
                                        <input type="text" defaultValue={this.props.user.interests} name="interests__input" id="interests__input" maxLength="150" required/>
                                    </div>
                                    <div className="editProfileForm__submit">
                                        {this.state.formSubmitted ? <h2>Profile Updated</h2> : null}
                                        <input type="submit" className="editProfileForm__submit--button" value="Update Profile"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </Spring>
        )
    }
}
