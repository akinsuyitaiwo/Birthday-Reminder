const { Schema , model} = require("mongoose");

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    birthday: {
        type: Date,
        required: true
    }
}, {timestamp: true});

module.exports = model('User', userSchema); 