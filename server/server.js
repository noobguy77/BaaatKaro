const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("Socket!");
    //socket is like 1 to 1 connection
    //.emit is for the new user who just joined
    socket.emit('newMessage', {
        from: "Bot",
        text: "to the new user: lol new ass",
        createdAt: new Date().getTime()
    });
    //broadcast.emit to send stuff to already connected users
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "existing users: new ass joined"
    })
    //when we want to broadcast it to the whole room we use io
    socket.on('createMessage', function (message) {
        console.log("crate message ", message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })
    socket.on('disconnect', () => {
        console.log("Socket agay");
    })
})
server.listen(port, () => {
    console.log("sup loser!");
})