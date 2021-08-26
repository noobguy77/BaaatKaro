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
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
    getRoomsList() {
        this.rooms = [];
        this.users.forEach((user) => {
            if (this.rooms.includes(user.room) === false) {
                this.rooms.push(user.room);
            }
        });
        return this.rooms;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

}

module.exports = {
    Users
};