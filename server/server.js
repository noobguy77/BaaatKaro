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
    socket.on('disconnect', () => {
        console.log("Socket agay");
    })
})
server.listen(port, () => {
    console.log("sup loser!");
})