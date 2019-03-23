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
[] List of Upcoming Rides in Profile
[] Remove self from cyclist array
[] Hide add friend/message button on own profile
[] Form to Create a Group 
    [] How to Handle Date? 
[] Join Ride/Leave Ride 
[] Sort Group List by Date


TO FIX
[] BikeRoutes.js map 
[] Add home icon to profile page


STRETCH
[] Group Ride Comments 
[] Invite to Ride 
[] Edit Profile
[] Messaging 

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
                let foundUser = this.state.cyclists.filter(cyclist => {
                    return cyclist._id === "5c92d64d7214992360212833"
                })
                this.setState({
                    user: foundUser[0]
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
                console.log(this.state.groupList)
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
                        <Route exact path="/home" render={props => (<Home {...props} user={this.state.user}/>)} />/>
                        <Route exact path="/cyclists" render={props => (<CyclistList {...props} cyclistList={this.state.cyclists}/>)} />
                        <Route exact path="/cyclists/:cyclistId" render={props => (<Profile {...props} />)} />
                        <Route exact path="/groups" render={props => (<GroupRides {...props} groupList={this.state.groupList}/>)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props}/>)} />
                        <Route exact path="/bikeroutes" render={props => (<BikeRoutes {...props} routeList={this.state.bikeRoutes}/>)} />
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props}/>)} />
                        <Route exact path="/creategroup" render={props => (<GroupForm {...props} retrieveFormData={this.retrieveFormData}/>)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
