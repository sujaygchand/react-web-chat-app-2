import React, { Component } from 'react';
import SideBar from '../SideBar';
import { COMMUNITY_CHAT, USER_CONNECTED, MESSAGE_RECIEVED,
    MESSAGE_SENT, USER_DISCONNECTED, TYPING, VERIFY_USER,
    LOGOUT } from '../../Events';
import ChatHeading from './ChatHeading';
import Messages from './Messages';
import MessageInput from './MessageInput';

class ChatContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            chats:[],
            activeChat:null
        };
    }
    
    componentDidMount() {
        const { socket } = this.props;
        socket.emit(COMMUNITY_CHAT, this.resetChat);
    }

    /**
     * Reset the chat
     * @param chat {Chat} 
     */
    resetChat=(chat)=>{
        //return this.addChat(chat, true);
    }

    /**
     * Adds chat to the chat container, if reset is true removes all chats
     * and sets this chat to the main one.
     * Sets the message and typing socket events for the chat.
     * 
     * @param chat {Chat} the chat to add
     * @param reset {boolean} if true this chat will be set as the only chat
     */
    addChat=(chat, reset)=>{
        console.log(chat);
        const { socket } = this.props;
        const { chats } = this.state;

        const newChats = reset ? [chat] : [...chats, chat];
        this.setState({chats:newChats});

        const messageEvent = MESSAGE_RECIEVED + '-'+ chat.id;
        const typingEvent = TYPING + '-'+ chat.id;

        socket.on(typingEvent);
        socket.on(messageEvent, this.addMessageToChat(chat.id));
    }

    /**
     * Returns a function that adds messages to chat with chatId
     * @param chatId {number}
     */
    addMessageToChat = (chatId)=>{
        return message => {
           const { chats } = this.state; 
           let newChats = chats.map((chat)=>{
               if(chat.id === chatId){
                   chat.messages.push(message);
               }
               return chat;
           })
           this.setState({chats:newChats});
        }
    }

    /**
     * Updates the typing of chat with id passed in.
     * @param chatId {number}
     */
    updateTypingInChat = (chatId) =>{

    }

    setActiveChat = (activeChat)=>{
        this.setState({activeChat});
    }

    /**
     * Adds a message to the specified chat
     * @param chatId {number} The id of the chat to be added to.
     * @param message {string} The message to add to the chat 
     */
    sendMessage = (chatId, message)=>{
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, {chatId, message});
    }


    /**
     * Sends typing status to server
     * @param chatId {number} the id of the chat being typed in
     * @param typing {boolean} If the user is typing still or not
     */
    SendTyping = (chatId, isTyping)=>{
       const { socket } = this.props;
       socket.emit(TYPING, {chatId, isTyping});
    }


    renderChatContainer(user, activeChat){

        if(activeChat !== null){
            <div className="chat-room"> 
            <ChatHeading name={activeChat.name} />
            <Messages 
                messages={activeChat.messages}
                user={user}
                typingUser={activeChat.typingUsers}
            />
            <MessageInput 
                sendMessage={
                    (message) =>{
                        this.sendMessage(activeChat.id, message);
                    }
                }

                sendTyping={ 
                    (isTyping)=>{
                        this.sendTyping(activeChat.id, isTyping);
                    }
                }
            />
         </div>
        } else {
            <div className="chat-room choose">
            <h3> Choose a chat!</h3> 
             </div>

        }
    }


    render() {
        const { user, logout } = this.props;
        const { chats, activeChat } = this.state;
        return (

            <div className="container">
            <SideBar 
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat} />
             
            <div className="chat-room-container">{
                       this.renderChatContainer(user, activeChat)
            }
        
           </div>
           </div>
        );
    }
}

export default ChatContainer;