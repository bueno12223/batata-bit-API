const {Schema, model} = require('mongoose');
const { v1 } = require("id-creator");
const moment = require('moment')

const userSchema = new Schema({
    userAcconut: {
        userId: { requiered: true, type: String, unique: true  }, 
        email: { requiered: true, type: String , unique: true  },
        fullName: { requiered: true, type: String },
        password: { requiered: true, type: String }
    },
    userPersonalData: {
        visa: {
            numbers : {type: Number, default: v1(8, false)},
            date : { type: String, default: moment().add(5, 'Y').format('MM/YY') },
            name: {type: String, default: this.userAcconut.fullName },
            pin: {default: v1(4, false)}
        },
        transacctions: [
            {
            id: {default: v1(16, true), unique: true},
            to:  String,
            date: { type: Date, default: moment().format('ll')  },
            ammount : Number,
            type: {type: String, default: 'transacción rápida'},
            icon: String
            }
        ],
        goals: [
            {
                id: {default: v1(6, false)},
                ammount: Number, 
                date: String,
                title: String,
                icon: String
            }
        ],
        userFriends: [String],
        
    },
    updated: { 
        type: Date, 
        default: moment().format() }
},{ Timestamp: true})

module.exports = model('user', userSchema);