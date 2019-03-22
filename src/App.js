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
[] Form to Create Group
[] Join/Unjoin Ride
[] Joined Ride List in Profile
[] Friends List




[] Animations
[] Invite to Ride
[] Login
[] Group Ride Comments
[] Pending friend requests

Questions
-------------
[] Requests
[] Retrieving list of rides, friends

*/

class App extends Component {
    state = {
        cyclists: [],
        loggedInAs: "",
        groupList: [],
        bikeRoutes: []
    }
    componentDidMount() {
        axios.get('http://localhost:8080/cyclists')
            .then(cyclistsList => {
                this.setState({
                    cyclists: cyclistsList.data
                });
                console.log(this.state.cyclists);
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
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/cyclists" render={props => (<CyclistList {...props} cyclistList={this.state.cyclists}/>)} />
                        <Route exact path="/cyclists/:cyclistId" render={props => (<Profile {...props}/>)} />
                        <Route exact path="/groups" render={props => (<GroupRides {...props} groupList={this.state.groupList}/>)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props}/>)} />
                        <Route exact path="/bikeroutes" render={props => (<BikeRoutes {...props} routeList={this.state.bikeRoutes}/>)} />
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props}/>)} />
                        <Route exact path="/creategroup" render={props => (<GroupForm {...props}/>)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
