import React, { Component } from 'react'

export default class InviteCard extends Component {
    state = {
        selected: false,
    }
    // Sends data back up to GroupRide component about which user they clicked on and if they are removing or adding to the invite list
    highlight = () => {
        let highlightedUser = {}
        if (this.state.selected) {
            this.setState({
                selected: false,
            });
            highlightedUser.id = this.props.id
            highlightedUser.selection = "remove"
        }
        else {
            this.setState({
                selected: true
            });
            highlightedUser.id = this.props.id
            highlightedUser.selection = "add"
        }
        this.props.handleInviteList(highlightedUser);
    }
    render() {
        return (
            // Toggle class based on if user has selected cyclist's card
            <div className={this.state.selected ? "inviteCard--selected" : "inviteCard"} onClick={this.highlight}>
                <img src={this.props.imgUrl} alt="profile"/>
                <h2 className="inviteCard__name">{this.props.name}</h2>
                <h2 className="inviteCard__region">{this.props.region}</h2>
            </div>
        )
    }
}
