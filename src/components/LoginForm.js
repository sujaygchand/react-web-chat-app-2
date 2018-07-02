import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            error: ""
        };
    }

    setUser = ({ user, isUser }) => {
        console.log(user, isUser);
        if (isUser) {
            this.setError("Username is already taken");
            
        } else {
            this.setError("");
            this.props.setUser(user);
        }
    }

    setError = (error) => {
        this.setState({ error });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { socket } = this.props;
        const { username } = this.state;
        socket.emit(VERIFY_USER, username, this.setUser);
        //console.log("print users: " + username + " Socket: " + socket.name);
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value });
    }

    render() {
        const { username, error } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form" >
                    <label htmlFor="username">
                        <h2>What shall we call you?</h2>
                    </label>
                    <input
                        ref={(input) => { this.textInput = input }}
                        type="text"
                        id="username"
                        value={username}
                        onChange={this.handleChange}
                        placeholder={'Username'}
                    />
                    <div className="error">
                        {
                            error ? error : null
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;