const {Schema, model} = require('mongoose');
const { v1 } = require("id-creator");
const moment = require('moment');
const { KeyObject } = require('crypto');

const userSchema = new Schema({
    userAcconut: {
        userId: { requiered: true, type: String, unique: true  }, 
        email: { requiered: true, type: String , unique: true  },
        fullName: { requiered: true, type: String },
        password: { requiered: true, type: String }
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
            _id: String,
            to:  String,
            since: String,
            date: {type: Date, default: moment().format('ll')  },
            ammount : Number, default: 0.00,
            type: {type: String, default: 'transacción rápida'},
            icon: {type: String, default: 'transacción rápida'}
            }
        ],
        goals: [
            {
                id: {type: Number, default: v1(6, false)},
                ammount: Number, 
                date: String,
                title: String,
                icon: String
            }
        ],
        
    },
    accsesKey: { requiered: true, type: String, unique: true, default: v1(16, true) },
    updated: { 
        type: Date, 
        default: moment().format() }
},{ Timestamp: true})

module.exports = model('user', userSchema);



