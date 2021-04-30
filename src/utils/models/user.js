const {Schema, model} = require('mongoose');
const { v1 } = require("id-creator");
const moment = require('moment');
const userSchema = new Schema({
    userAcconut: {
        userId: { requiered: true, type: String, unique: true  }, 
        fullName: { requiered: true, type: String },
        password: { requiered: true, type: String },
        email: { requiered: true, type: String, unique: true },
        accessKey: { requiered: true, type: String, unique: true }
    },
    userPersonalData: {
        visa: {
            numbers : {type: Number, default: v1(16, false)},
            date : { type: String, default: moment().add(5, 'Y').format('MM/YY') },
            pin: {type: Number, default: v1(4, false)}
        },
        money : {
            incomer: {type: Number, default: 0.00},
            spend: {type: Number, default: 0.00},
            total: {type: Number, default: 0.00}
        },
        transacctions: [
            { 
            to:  String,
            since: String,
            date: {type: Date, default: moment().format('ll')  },
            ammount : Number, default: 0.00,
            transacction_type: {type: String, default: 'transacción rápida'},
            icon: {type: String, default: 'transacción rápida'}
            }
        ],
        goals: [
            {
                ammount: Number,
                end: Date,
                title: String,
                icon: String,
                goal:  Number
            }
        ],
        
    },
    updated: { 
        type: Date, 
        default: moment().format() }
},{ Timestamp: true})

module.exports = model('user', userSchema);
