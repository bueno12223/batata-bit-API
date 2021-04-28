const express = require('express');
const UserModel = require('../utils/models/user');
const { v1 } = require("id-creator");

const validateTransaccion = require('../utils/middleware/validateTransacction')


const transacctionsUser = (app) => {
    const router = express.Router();
    app.use('/transacctions', router)
    router.put('/',
    (req, res, next) => validateTransaccion(req, res, next), 
    async (req, res, next) => {
        const { to, since, ammount, type, icon } = req.body;
        try{ 
            const transaccionId = v1(10, true);
            const paramsTo = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    "userPersonalData.transacctions": { to, since, ammount, type, icon, _id: transaccionId }
                }
            }
            await UserModel.findByIdAndUpdate(to , paramsTo); 
        //   search the data to the sender
            const paramsSince = {
                $inc: {
                    "userPersonalData.money.spend": Math.abs(ammount),
                    "userPersonalData.money.total": ammount * -1
                },
                $addToSet: {
                    "userPersonalData.transacctions": { to, since,  ammount: ammount * -1, type, icon, _id: transaccionId  }
                }
            }
            await UserModel.findByIdAndUpdate(since, paramsSince)
            res.status(201).json({'message': 'transaccion created', 'id': transaccionId });
        }catch(e) {
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    router.put('/deposit', async(req, res, next) => {
        const {ammount, to} = req.body;
        console.log(to)
        try{
            const transaccionId = v1(10, true);
            const params = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    "userPersonalData.transacctions": { to, since: 'you', ammount, type: 'depósito', icon: 'money-check-alt', _id: transaccionId }
                }
            }
            await UserModel.findByIdAndUpdate(to , params); 
            res.status(201).json({'message': 'deposit creted succsesfully', 'id': transaccionId })
        }catch(e){
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    
    
}
module.exports = transacctionsUser