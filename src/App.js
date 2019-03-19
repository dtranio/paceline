import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import CyclistList from './Components/CyclistList';
import GroupRides from './Components/GroupRides';
import Profile from './Components/Profile';
import BikeRoutes from './Components/BikeRoutes';
import BikeRoute from './Components/BikeRoute';
import GroupRide from './Components/GroupRide';

class App extends Component {
    state = {
        
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/cyclists" component={CyclistList}/>
                        <Route exact path="/cyclists/:cyclistId" render={props => (<Profile {...props}/>)} />
                        <Route exact path="/groups" render={props => (<GroupRides {...props}/>)} />
                        <Route exact path="/groups/:groupId" render={props => (<GroupRide {...props}/>)} />
                        <Route exact path="/bikeroutes" component={BikeRoutes}/>
                        <Route exact path="/bikeroutes/:routeId" render={props => (<BikeRoute {...props}/>)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
