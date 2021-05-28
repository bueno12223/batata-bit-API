const express = require('express');
const UserModel = require('../utils/models/user');
const { v1 } = require("id-creator");
const validateAuth = require('../utils/auth/validateAuth');
const validateTransaccion = require('../utils/middleware/validateTransacction');

const transacctionsUser = (app) => {
    const router = express.Router();
    app.use('/transacctions', router)
    router.put('/',validateAuth, validateTransaccion, async (req, res, next) => {
        const { to, since, ammount, type, icon } = req.body;
        try{ 
            const paramsTo = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    "userPersonalData.transacctions": { to, since, ammount, type, icon }
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
                    "userPersonalData.transacctions": { to, since,  ammount: ammount * -1, type, icon }
                }
            }
            await UserModel.findByIdAndUpdate(since, paramsSince)
            res.status(201).json({'message': 'transaccion created' });
        }catch(e) {
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    router.put('/deposit', async(req, res, next) => {
        const {ammount, to} = req.body;
        try{
            const params = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    "userPersonalData.transacctions": { to: 'you', since: 'you', ammount, transacction_type: 'depósito', icon: 'check'}
                }
            }
            console.log(to)
            await UserModel.findByIdAndUpdate(to , params); 
            res.status(201).json({'message': 'deposit creted succsesfully'})
        }catch(e){
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    
    
}
module.exports = transacctionsUser;