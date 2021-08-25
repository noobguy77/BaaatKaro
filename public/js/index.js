const Mustache = require('../js/libs/mustache');
let socket = io();
socket.on('connect', () => {
    console.log("Connected");
});
//message is received from server
socket.on('newMessage', function (message) {
    const template = document.querySelector('#message-template').innerHTML;
    console.log(template);
    const html = Mustache.render(html);
    console.log(html);
    document.querySelector('#messages').append(html);
    // console.log("lol");
    // const formattedTime = moment(message.createdAt).format('LT');
    // console.log('new message ', message);
    // let li = document.createElement('li');
    // li.innerText = message.from + " : " + message.text + "    " + formattedTime;
    // document.querySelector('#messages').appendChild(li);
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