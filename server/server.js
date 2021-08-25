const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const socketIO = require('socket.io');
const {
    generateMessage
} = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("Socket!");
    //socket is like 1 to 1 connection
    //.emit is for the new user who just joined
    socket.emit('newMessage', generateMessage("Bot", "Welcome biatch"));
    //broadcast.emit to send stuff to already connected users
    socket.broadcast.emit('newMessage', generateMessage("Bot", "New biatch has arrived"));
    //when we want to broadcast it to the whole room we use io
    socket.on('createMessage', function (message, callback) {
        console.log("crate message ", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    })
    socket.on('disconnect', () => {
        console.log("Socket agay");
    })
})
server.listen(port, () => {
    console.log("sup loser!");
})