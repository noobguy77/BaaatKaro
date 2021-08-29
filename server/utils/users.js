const mongoose = require('mongoose');
// const db = require('../config/keys').MongoURI;
const UserM = require('../../models/musers');
var MongoClient = require('mongodb').MongoClient;
const dburl = require('../../config/keys').MongoURI;
const dbURI = dburl || process.env.MongoURI;
class Users {
    constructor() {
        this.users = [];
        this.rooms = [];
    }

    addUser(id, name, room) {
        let user = {
            id,
            name,
            room
        };
        this.users.push(user);
        this.rooms.push(user);
        return user;
    }

    getUserList(room) {
        // console.log("this is start", UserM.db("mydb").collection("users").data);
        var namesArray = [];
        UserM.find().then(result => {
            result.forEach(res => {
                // console.log(res.room, room);
                if (namesArray.includes(res.name) == false && res.room == room) {
                    namesArray.push(res.name);
                    // console.log(namesArray);
                }
            })
            console.log(namesArray);
            return namesArray;
        }).catch(err => {
            console.log(err)
        })
        // let users = this.users.filter((user) => user.room === room);
        // let names1Array = users.map((user) => user.name);
        // console.log(names1Array, "yo");
        // console.log(namesArray, "lol");
        return names1Array;
    }
    getRoomsList() {
        var roomsArray = [];
        UserM.find().then(result => {
            result.forEach(res => {
                // console.log(res.room, room);
                if (roomsArray.includes(res.room) == false) {
                    roomsArray.push(res.room);
                    // console.log(namesArray);
                }
            })
            // console.log(namesArray);
            return roomsArray;
        }).catch(err => {
            console.log(err)
        })

        // this.rooms = [];
        // this.users.forEach((user) => {
        //     if (this.rooms.includes(user.room) === false) {
        //         this.rooms.push(user.room);
        //     }
        // });
        // return this.rooms;
    }

    getUser(id) {
        this.users = [];
        UserM.find().then(result => {
            if (result.id == id)
            {
                console.log("no");
            }
            else {
                this.users.push(result.name);
            }
        })
        return this.user;
        // console.log(this.users.filter((user) => user.id === id), "lool");
        // return this.users.filter((user) => user.id === id)[0];
    }
    removeUserfromdb(id1) {
        var user1;
        MongoClient.connect(dbURI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").findOne({
                id: id1
            }, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result,"lol");
                    user1 = result;
                }
                db.close();
            });
        });
        MongoClient.connect(dbURI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").deleteOne({
                id: id1
            }, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result, "lol result");
                }
                db.close();
            });
        });
        return user1;
    }
    removeUser(id1) {
        // var user1;
        // MongoClient.connect(dbURI, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("mydb");
        //     dbo.collection("users").findOneAndDelete({
        //         id: id1
        //     }, function (err, result) {
        //         if (err) throw err;
        //         if (result) {

        //             console.log(result);
        //         }
        //         db.close();
        //     });
        // });
        // MongoClient.connect(dbURI, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("mydb");
        //     dbo.collection("users").deleteOne({
        //         id: id1
        //     }, function (err, result) {
        //         if (err) throw err;
        //         if (result) {

        //             console.log(result);
        //         }
        //         db.close();
        //     });
        // });
        let user = this.getUser(id1);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id1);
        }
        // console.log(user, user1, "testing mongo del");
        console.log(user, "Lolp");
        // console.log(user1, "LOlp2");
        return user;
    }

}

module.exports = {
    Users
};