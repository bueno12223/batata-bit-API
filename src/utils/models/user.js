const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    userId:{
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience: String,
    aboutYou: String,
},{ Timestamp: true})

module.exports = model('user', userSchema);