const express = require('express');
const UserModel = require('../utils/models/user');
const { v1 } = require("id-creator");

const validateTransaccion = require('../utils/middleware/validateTransacction')


const transacctionsUser = (app) => {
    const router = express.Router();
    app.use('/transacctions', router);
    router.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        try{
            const transaccion = await UserModel.find({
                userPersonalData: {
                    transaccion: {id}
                }
            })
            res.status(200).json({'transaction': transaccion})
        }catch(e){
            next(e);
            res.status(401).json({'message': 'transaccion not found'})
        }
    })
    router.put('/:id',async (req, res, next) => {
        const id = req.params.id;
        const {ammount} = req.body;
    try{
        const userData = await UserModel.findById(id);
        console.log(total <= ammount)
        const {userPersonalData:{money:{total} } } = userData
        console.log(userData)
        if(total >= ammount || total === 0){
            return next()
        }
    }catch(e){
        res.status(401).json({'message': 'you can´t do this transacction'});
    }
    }, 
    
    async (req, res, next) => {
        const { to, ammount, type, icon } = req.body;
        const id = req.params.id
        try{ 
          
            const transaccionId = v1(10, true);
            const paramsTo = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    "userPersonalData.transacctions": { to, ammount, type, icon, _id: transaccionId }
                }
            }
            await UserModel.findByIdAndUpdate(to , paramsTo); 
        // ]   search the data to the sender
            const paramsSince = {
                $inc: {
                    "userPersonalData.money.spend": Math.abs(ammount),
                    "userPersonalData.money.total": ammount * -1
                },
                $addToSet: {
                    "userPersonalData.transacctions": { to, ammount: ammount * -1, type, icon, _id: transaccionId }
                }
            }
            await UserModel.findByIdAndUpdate(id, paramsSince)
            res.status(201).json({'message': 'transaccion created'});
        }catch(e) {
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    
}
module.exports = transacctionsUser