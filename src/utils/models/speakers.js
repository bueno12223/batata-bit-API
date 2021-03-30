const {Schema, model} = require('mongoose');

const speakerSchema = new Schema({
    userId:{
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    experience: String,
    aboutYou: String,

},{Timestamp: true})

module.exports = model('user', speakerSchema);