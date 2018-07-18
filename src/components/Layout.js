import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';

const socketUrl = "http://192.168.1.3:3231";
class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.inItSocket();
    }

    /**
     * Connect to and initialises the socket
     */
    inItSocket = () => {
        const socket = io(socketUrl);

        socket.on('connect', () => {
            console.log("connected")
        })

        socket.on('connect_error', () => {
            console.log("Connetion Error")
        })

        this.setState({
            socket
        })
    }

    /**
     * Sets the user property in state
     * @param user {id:number, name:string}
     */
    setUser = (user) => {
        const {
            socket
        } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({
            user
        });
    }


    /**
     *  Sets the user property in state to null.
     */
    logout = () => {
        const {
            socket
        } = this.state;
        socket.emit(LOGOUT);
        this.setState({
            user: null
        });
    }

    render() {
        const { socket, user } = this.state;
        return (
            <div className="container">
                {
                    !user ?
                        <LoginForm socket={socket} setUser={this.setUser} />
                        :
                        <ChatContainer socket={socket} user={user} logout={this.logout} />
                }
            </div>
        );
    }
}

export default Layout;