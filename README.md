# BaatKaro (A ChatRoom application)
This repository contains a chat application which is created using MongoDB, Socket.io and Express that supports real-time chatting and also allows to retrieve chat when logged in later.

## Tech-stack -
- HTML, CSS (for front-end interface)
- Node.js and Express.js (for back-end server)
- Socket.io (for real-time interaction between the client and the server)
- MongoDB (as database to store chats, online users etc.)

## Features of this app -

- User can chat in a public conversation room.
- User can create a new public conversation room.(but cannot add other users)
- User can join an existing public conversation room.
- User can view other users who are online in the room.
- User can view other rooms which are active at that point of time.
- User can view the room they are in.

## Usage Guide -

1. Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) on your system(or you could use MongoDB Atlas). Check using the following commands in the terminal -

```cmd
$ node -v
$ mongod --version
```

2. Open your terminal and run the following -

```cmd
$ fork the repo
$ git clone <clone link>
$ cd <project path>
$ npm install
$ node server/server.js
```

3. Now, the server is running, open the link http://localhost:6969 to access the application



## Heroku Link - https://baatkaroo0566.herokuapp.com/


