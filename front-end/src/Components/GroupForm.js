import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class GroupForm extends Component {
    constructor(){
        super();
        this.state = {
            formSubmitted: false,
            selectedRouteImage: ""
        }
        this.groupForm = React.createRef();
    }
    componentDidMount() {
        this.setState({
            formSubmitted: false,
            selectedRouteImage: "/Assets/images/BikeRoutes/beltline.jpg"
        });
    }
    // Changes date in the form
    handleChange = date => {
        this.setState({
            startDate: date
        });
    }
    // Changes the image depending on which route is selected
    handleImageChange = () => {
        let foundRoute = this.props.routeList.find(route => {
            return route._id === this.groupForm.current.groupRoute__input.value
        })
        this.setState({
            selectedRouteImage: foundRoute.route_pic_url
        })
    }
    // Form submission handler
    submitHandler = e => {
        e.preventDefault();
        const form = this.groupForm.current
        let formData = {
            groupName: form.groupName__input.value,
            groupDescription: form.groupDescription__input.value,
            routeSelected: form.groupRoute__input.value,
            meetupSpot: form.groupMeetup__input.value,
            meetupDate: form.groupMeetupDate__input.value,
            leader: this.props.loggedInAs
        }
        this.setState({
           formSubmitted: true 
        }) 
        let config = {
            method: "POST",
            url: `http://localhost:8080/groups/`,
            data: formData,
            headers: {
                "content-type": "application/json"
            }
        }
        axios(config) 
            .then(response => {
                form.reset();
                window.location = "/groups";
            })
            .catch(error => {
                console.log(error)
            });
    }
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
                                <img src={this.state.selectedRouteImage} alt="two cyclists in sunset"/>
                            </div>
                            <form onSubmit={this.submitHandler} ref={this.groupForm} className="groupForm wrapper" style={props}>
                                <div className="groupForm__groupName">
                                    <label htmlFor="groupName__input">Group Name</label>
                                    <input required type="text" placeholder="Group Name" name="groupName__input" id="groupName__input"/>
                                </div>
                                <div className="groupForm__groupDescription">
                                    <label htmlFor="groupDescription__input">Description</label>
                                    <textarea type="text" placeholder="Enter a description about the ride" name="groupDescription__input" id="groupDescription__input" resize="none" maxLength="250"/>
                                </div>
                                <div className="groupForm__routeSelect">
                                    <label htmlFor="groupForm__route">Choose Route</label>
                                        <select name="groupRoute__input" id="groupRoute__input" onChange={this.handleImageChange}>
                                            {this.props.routeList.map(route => {
                                                return <option value={route._id} key={route._id}>{route.route_name}</option>
                                            })}
                                        </select>
                                </div>
                                <div className="groupForm__groupMeetupSpot">
                                    <label htmlFor="groupMeetup__input">Meetup Location</label>
                                    <input required type="text" placeholder="Meetup Spot" name="groupMeetup__input" id="groupMeetup__input"/>
                                </div>
                                <div className="groupForm__groupDateTime">
                                    <label>Select Date & Time</label>
                                        <DatePicker
                                            name="groupMeetupDate__input"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            minDate={new Date()}
                                            showTimeSelect
                                            timeFormat="hh:mm a"
                                            timeIntervals={30}
                                            dateFormat="MMM d YYYY @ hh:mm aa"
                                            />
                                </div>
                                <div className="groupForm__submit">
                                    <h2>{this.state.formSubmitted ? "Group Created" : null}</h2> 
                                    <input type="submit" className="groupForm__submit--button" value="Submit Group"/>
                                </div>
                            </form>
                        </div>
                    )
                }
            </Spring>
        )
    }
}
