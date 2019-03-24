import React, { Component } from 'react'

export default class InviteCard extends Component {
    state = {
        selected: false,
        inviteList: []
    }
    // highlight = () => {
    //     let updatedList = this.state.inviteList;
    //     if (this.state.selected) {
    //         this.setState({
    //             selected: false,
    //             inviteList: updatedList
    //         });
    //         console.log(this.state.inviteList)
    //     }
    //     else {
    //         updatedList.push(this.props.id)
    //         this.setState({
    //             selected: true,
    //             inviteList: updatedList
    //         });
    //         console.log(this.state.inviteList)
    //     }
    // }
    render() {
        return (
            <div className={this.state.selected ? "inviteCard--selected" : "inviteCard"} onClick={this.highlight}>
                <img src={this.props.imgUrl} alt=""/>
                <h2 className="inviteCard__name">{this.props.name}</h2>
                <h2 className="inviteCard__region">{this.props.region}</h2>
            </div>
        )
    }
}
