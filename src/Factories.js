const uuidv4 = require('uuid/v4');

/**
 * Creates a user
 * 
 * @param {object} 
 * @param name {string}
 * 
 * @prop id {string}
 * @prop name {string}
 */
const createUser = ({name = ""} = {})=>(
    {
        id:uuidv4(),
        name
    })

 /**
  * Creates a message object
  * 
  * @param {object}
  * @param message {string}
  * @param sender {string}  
  * 
  * @prop id {string}
  * @prop time {Date} 
  * @prop message {string} actual string message
  * @prop sender {string} sender of message
  */
const createMessage = ({message = "", sender = ""} = { })=>(
    {
        id:uuidv4(),
        time:getTime(new Date(Date.now())),
        message,
        sender
    })

  /**
   * Creates Chat object
   * 
   * @param {object}
   * @param name {string}
   * @param messages {Array.Message}
   * @param users {Array.string}
   * 
  * @prop id {string}
  * @prop name {string} 
  * @prop messages {Array.Message}
  * @prop users {Array.string}
   */
    const createChat = ({messages = [], name = "Community", user = []} = {})=>(
        {
            id:uuidv4(),
            name,
            messages,
            users,
            typingUsers:[]
        })

   /**
    * Returns a string of the time in 24hr format
    * @param date
    */
   const getTime = (date)=>{
       return(date.getHours()) + ":" + ("0" + date.getMinutes).slice(-2);
   }

   module.exports = {
       createUser,
       createMessage,
       createChat
   }