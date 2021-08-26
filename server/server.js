const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const socketIO = require('socket.io');
const {
    generateMessage
} = require('./utils/message');
const {
    type
} = require('os');
const {
    isRealString
} = require('./utils/isRealString');
const {
    Users
} = require('./utils/users');
const port = process.env.PORT || 6969;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log("Socket!");
    //socket is like 1 to 1 connection
    socket.on('join', (params, callback) => {
        // console.log(params.name, params.room, "lol");
        //for empty fields while joining
        if (!isRealString(params.name) || !isRealString(params.room)) {

            callback("Name a nd room are req");
        }
        //this id joins this room
        socket.join(params.room);
        //first we kick the user of other rooms
        users.removeUser(socket.id);
        //then we add him
        users.addUser(socket.id, params.name, params.room);
        //we need to broadcast all the users list to every1
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        io.to(params.room).emit('updateRoomsList', users.getRoomsList());
        //.emit is for the new user who just joined
        //only can be seen by him
        socket.emit('newMessage', generateMessage("Bot", "Welcome biatch " + params.room));
        //broadcast.emit to send stuff to already connected users
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Bot", "New biatch has arrived to " + params.room));
        callback()
    })
    //when we want to broadcast it to the whole room we use io
    socket.on('createMessage', function (message, callback) {
        //while sending a messag egrab the user
        let user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            //using user.name add it to this message and emit to the room
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        // console.log("crate message ", message);
        callback();
    })
    socket.on('disconnect', () => {
        //when user leaves we need to update the list
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Bot", user.name + " has left"));
        }
        console.log("Socket gaya");
    })
})
server.listen(port, () => {
    console.log("sup loser!");
})