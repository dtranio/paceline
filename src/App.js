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

To Do
--------------
SATURDAY
--------------------------
[X] List of Upcoming Rides in Profile
    [] FIX - Populating attending and bike route 
Done By 1PM -------------

--------------------------
[X] Remove self from cyclist array
[X] Hide add friend/message button on own profile
[X] Hide my upcoming rides on other people's profile
Done By 2PM -------------

--------------------------
[] Add friend/remove friend
[] Join Ride/Leave Ride 
Done By 6PM -------------

--------------------------
[] Form to Create a Group 
    [] How to Handle Date? 
Done by Saturday -------------

[] Sort Group List by Date
[] Invite to Ride AND/OR Group Ride Comments
[] Delete Group
    [] Need to add group leader to group collection
Done By Sunday -------------


TO FIX
[] BikeRoutes.js map 
[] Populating attending and bike route 
[] Add meetup location description
[] Add home icon to profile page


STRETCH
[] Delete group
[] Messaging 
    [] in profile, need button to bring to list of convos
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
        groupList: [],
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
        axios.get('http://localhost:8080/groups')
            .then(groupList => {
                this.setState({
                    groupList: groupList.data
                });
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
    retrieveFormData() {

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
                        <Route exact path="/groups" render={props => (<GroupRides {...props} groupList={this.state.groupList} loggedInAs={this.state.loggedInAs} />)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props} loggedInAs={this.state.loggedInAs} />)} />
                        <Route exact path="/bikeroutes" render={props => (<BikeRoutes {...props} routeList={this.state.bikeRoutes} />)} />
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props} />)} />
                        <Route exact path="/creategroup" render={props => (<GroupForm {...props} retrieveFormData={this.retrieveFormData} />)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
