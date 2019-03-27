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
import EditProfile from './Components/EditProfile';
import axios from 'axios'; 

class App extends Component {
    state = {
        cyclists: [],
        isLoggedIn: true,
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
                // Find logged in cyclist information and remove them from cyclist list
                let foundUser = this.state.cyclists.find(cyclist => {
                    return cyclist._id === this.state.loggedInAs;
                })
                let filteredUsers = this.state.cyclists.filter(cyclist => {
                    return cyclist._id !== this.state.loggedInAs;
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
    // Retrieve updated profile information about the user and update their profile
    updateUser = data => {
        this.setState({
            user: data
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
                        <Route exact path="/cyclists/:cyclistId" render={props => (<Profile {...props} loggedInAs={this.state.loggedInAs} isLoggedIn={this.state.isLoggedIn} currentUser={this.state.user}/>)} />
                        <Route exact path="/groups" render={props => (<GroupRides {...props} groupList={this.state.groupList} />)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props} loggedInAs={this.state.loggedInAs} currentUser={this.state.user} />)} />
                        <Route exact path="/bikeroutes" render={props => (<BikeRoutes {...props} routeList={this.state.bikeRoutes} />)} />
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props} />)} />
                        <Route exact path="/creategroup" render={props => (<GroupForm {...props} loggedInAs={this.state.loggedInAs} routeList={this.state.bikeRoutes} />)} />
                        <Route exact path="/editprofile" render={props => (<EditProfile {...props} loggedInAs={this.state.loggedInAs} user={this.state.user} updateUser={this.updateUser} />)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
