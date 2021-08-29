const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
});

const UserM = mongoose.model('user', UsersSchema);

module.exports = UserM;