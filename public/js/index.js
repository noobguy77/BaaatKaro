let socket = io();
socket.on('connect', () => {
    console.log("Connected");
});
//message is received from server
socket.on('newMessage', function (message) {
    console.log('new message ', message);
})
socket.on('disconnect', () => {
    console.log("disConnected");
});