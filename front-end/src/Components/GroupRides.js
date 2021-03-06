import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroupSelect from './GroupSelect';
import axios from 'axios';

export default class GroupRides extends Component {
    state = {
        groupList: []
    }
    componentDidMount() {
        axios.get('http://localhost:8080/groups')
            .then(groupList => {
                this.setState({
                    groupList: groupList.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="groupList">
                <div className="groupList__header wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                    <h1 className="home__title">Upcoming Group Rides</h1> 
                </div>
                <div className="groupContainer wrapper">
                    {this.state.groupList.map(group => {
                                    return  <Link to={`/groups/${group._id}`} key={group._id}>
                                                <GroupSelect 
                                                    title={group.group_name} 
                                                    riders={group.attending.length}
                                                    date={group.meetup_date}
                                                    route={group.bike_route.route_name}
                                                    id={group._id} />
                                            </Link>;
                    })}
                </div>
                <div className="groupList__button">
                    <Link to='/creategroup'>
                        <button>Create Group</button>
                    </Link>
                </div>
            </div>
        )
    }
}
