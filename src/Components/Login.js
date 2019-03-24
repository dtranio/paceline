import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login__logo">
                    <img src="/Assets/images/logo.png" alt=""/>
                </div>
                <div className="loginForm">
                    <form>
                        <div className="loginForm__username">
                            <input type="text" name="usernameInput" className="loginForm__username--text" placeholder="Username"/>
                        </div>
                        <div className="loginForm__password">
                            <input type="password" name="passwordInput" className="loginForm__password--text" placeholder="Password"/>
                        </div>
                        <Link to='/home'><button className="loginForm--login">Login</button></Link>
                        <Link to='/home'><button className="loginForm--register">Register</button></Link>
                    </form>
                </div>
            </div>
        )
    }
}
