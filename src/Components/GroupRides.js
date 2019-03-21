import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import GroupSelect from './GroupSelect';

export default class GroupRides extends Component {
    render() {
        return (
            <div className="groupList">
                <div className="groupList__header wrapper">
                    <Link to='/home'><img src="/Assets/images/Icons/back-arrow.png" alt="back arrow"/></Link>
                    <h1 className="home__title">Upcoming Group Rides</h1>    
                </div>
                <div className="groupContainer wrapper">
                    <Link to='/groups/G1'>
                        <GroupSelect title="Da Champs" route="Leslie Street Spit" riders="2" date="04-05-2019"/>
                    </Link>
                    <Link to='/groups/G1'>
                        <GroupSelect title="Afternoon Ride" route="Scarborough Bluffs" riders="3" date="04-15-2019"/>
                    </Link>
                    <Link to='/groups/G1'>
                        <GroupSelect title="Uptown to Downtown" route="Beltline-Lower Don Valley" riders="4" date="04-25-2019"/>
                    </Link>
                    <Link to='/groups/G1'>
                        <GroupSelect title="Waterfront Exploration" route="Martin Goodman Trail" riders="6" date="05-04-2019"/>
                    </Link>
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
