let socket = io();
socket.on('connect', () => {
    console.log("Connected");
});
//message is received from server
socket.on('newMessage', function (message) {
    console.log('new message ', message);
    let li = document.createElement('li');
    li.innerText = message.from + " : " + message.text;
    document.querySelector('body').appendChild(li);
})
socket.on('disconnect', () => {
    console.log("disConnected");
});

document.querySelector('#submit-btn').addEventListener('click', function (e) {
    //prevent refresh while sending message
    e.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function () {
        console.log("yo recieved");
    })
})