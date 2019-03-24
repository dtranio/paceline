import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login'; 
import Home from './Components/Home'; 
import CyclistList from './Components/CyclistList'; 
import GroupRides from './Components/GroupRides'; 
import Profile from './Components/Profile'; 
import BikeRoutes from './Components/BikeRoutes'; 
import BikeRoute from './Components/BikeRoute'; 
import GroupRide from './Components/GroupRide'; 
import GroupForm from './Components/GroupForm';  
import axios from 'axios'; 

/*

SATURDAY
--------------------------
[X] List of Upcoming Rides in Profile
    [] FIX - Populating attending and bike route 
Done By 1PM -------------


[X] Remove self from cyclist array
[X] Hide add friend/message button on own profile
[X] Hide my upcoming rides on other people's profile
Done By 2PM -------------


[X] Remove/Add Friend
[X] Leave Ride 
[X] Join Ride
    [X] FIX - Number of Riders Count
Done By 6PM -------------


[] Form to Create a Group 
    [] Date?
    [] Form Validation
[] Sign Out Button
[] Add home icon to profile page
[] Sort Group List by Date
Done by Sunday 12pm -------------

[] Invite to Ride 
[] Delete Group
    [] Need to add group leader to group collection
Done By Sunday -------------


[] Commenting
Done by Monday -------------

TO FIX
[] BikeRoutes.js map **
[] Populating attending and bike route **


STRETCH
[] Delete group
[] Messaging 
[] Edit Profile
[] Group Ride Comments 
[] Make private social groups and schedule rides
[] Users can draw their own routes

*/

class App extends Component {
    state = {
        cyclists: [],
        loggedInAs: "5c92d64d7214992360212833",
        user: {},
        bikeRoutes: []
    }
    componentDidMount() {
        axios.get('http://localhost:8080/cyclists')
            .then(cyclistsList => {
                this.setState({
                    cyclists: cyclistsList.data,
                });
                let foundUser = this.state.cyclists.find(cyclist => {
                    return cyclist._id === "5c92d64d7214992360212833";
                })
                let filteredUsers = this.state.cyclists.filter(cyclist => {
                    return cyclist._id !== "5c92d64d7214992360212833";
                })
                this.setState({
                    user: foundUser,
                    cyclists: filteredUsers
                })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:8080/bikeroutes')
            .then(routes => {
                this.setState({
                    bikeRoutes: routes.data
                });
            })
            .catch(error => {
                console.log(error);
            });

    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/home" render={props => (<Home {...props} user={this.state.user} />)} />/>
                        <Route exact path="/cyclists" render={props => (<CyclistList {...props} cyclistList={this.state.cyclists}/>)} />
                        <Route exact path="/cyclists/:cyclistId" render={props => (<Profile {...props} loggedInAs={this.state.loggedInAs} currentUser={this.state.user}/>)} />
                        <Route exact path="/groups" render={props => (<GroupRides {...props} groupList={this.state.groupList} />)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props} loggedInAs={this.state.loggedInAs} currentUser={this.state.user} />)} />
                        <Route exact path="/bikeroutes" render={props => (<BikeRoutes {...props} routeList={this.state.bikeRoutes} />)} />
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props} />)} />
                        <Route exact path="/creategroup" render={props => (<GroupForm {...props} loggedInAs={this.state.loggedInAs} />)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
