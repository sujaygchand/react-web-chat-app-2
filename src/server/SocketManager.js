const io = require('./index.js').io;

const { COMMUNITY_CHAT, USER_CONNECTED, MESSAGE_RECIEVED,
    MESSAGE_SENT, USER_DISCONNECTED, TYPING, VERIFY_USER,
    LOGOUT } = require('../Events');

const { createUser, createMessage, createChat } = require('../Factories');
let connectedUsers = {};

module.exports = function (socket) {
    console.log("Socket.id: " + socket.id);

    // Verify Username
    socket.on(VERIFY_USER, (username, callback) => {
        console.log("Username: " + username);

        if (isUser(connectedUsers, username)) {
            callback({ isUser: true, user: null });
        } else {
            callback({ isUser: false, user: createUser({ name: username }) });
        }
    })


    // User connects with username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
     
        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    }
    )

    // User disconnects


    // User logouts


    /**
     * Adds user to list passed in.
     * 
     * @param userList {Object} Object with key value pairs or users
     * @param user {User} the user to added to the list.
     * 
     * @return userList {Object} Object with key value pairs of Users
     */
    function addUser(userList, user) {
        let newList = Object.assign({}, userList);
        newList[user.name] = user;
        return newList;
    }

    /**
     * Removes user from the list
     * 
     * @param userList {Object} Object with key value pairs of Users
     * @param username {string} name of user to be removed
     * 
     * @return userList {Object} Object with key value pairs of Users
     */
    function removeUser(userList, username) {
        let newList = Object.assign({}, userList);
        delete newList[username];
        return newList;
    }

      /**
       * Checks if the user is in list passed in
       */
      function isUser(userList, username) {
          return username in userList;
      }
}