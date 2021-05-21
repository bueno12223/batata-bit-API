const express = require('express');
const userModel = require('../utils/models/user');
const validateTransaccion = require('../utils/middleware/validateTransacction');
const validateAuth = require('../utils/auth/validateAuth');
const moment = require('moment');

const userGoals = (app) => {
    const router = express.Router()
    app.use('/goal', router);
    // get goal by id
    router.get('/:id', async (req, res, next) => {
        const id = req.params.id
        try{
            const userData = await userModel.findOne({'userPersonalData.goals._id': id});
            const {userPersonalData: {goals}} = userData
            const transacction = goals.filter(e => e._id == id)
            
            res.status(200).json({'transaccions': transacction[0] });
        }catch(e){
            next(e);
            res.status(404).json({'message': 'transaccion not found'});
        }
    })
    // create a goal
    router.put('/:id', validateAuth, async(req, res, next) => {
        const id = req.params.id;
        const {  end, title, icon, goal } = req.body;
        try{
            const params = {
                $addToSet: {
                    "userPersonalData.goals": { 
                        ammount : 0, 
                        end: moment(end).format("L"), 
                        title, 
                        icon,
                        goal
                      }
                }
            }
            await userModel.findByIdAndUpdate(id, params);
            res.status(201).json({'message': 'goal created succsesfully'});
        }catch(e){
            next(e);
            res.status(401).json({'message': 'all params are required or user not found'})
        }
        
    })
    // put money in a goal
    router.put('/deposit/:id',
    (req, res, next) => validateTransaccion(req, res, next),
     async(req, res, next) => {
        const { ammount, since } = req.body;
        try{
            const params = {
                $inc: { 
                    'userPersonalData.goals.$.ammount' : ammount,
                    'userPersonalData.money.spend' : ammount ,
                    'userPersonalData.money.total' : ammount * -1
                },
                $addToSet: {
                    'userPersonalData.transacctions': { to: 'you', since, ammount, type: 'goal transacction', icon }
                }
            }
            await userModel.findOneAndUpdate({'userPersonalData.goals._id': since}, params);
            res.status(201).json({'message': 'updated done', 'ammout': ammount});
        }catch(e){
            next(e);
            res.status(401).json({'message':'all params are required'});
        }
        
    })
    // breake goal
    router.delete('/:id', async (req, res, next) => {

        const id = req.params.id
        try{
            // add the money
            const userData = await userModel.findOne({'userPersonalData.goals._id': id})
            const {userPersonalData: {goals}} = userData
            const transacction = goals.filter(e => e._id == id)
            const { ammount, icon } = transacction;
            const paramsInc = { 
                $inc: {
                    "userPersonalData.money.incomer": ammount,
                    "userPersonalData.money.total": ammount,
                    },
                $addToSet: {
                    'userPersonalData.transacctions': { to: 'you', since: id, ammount, type: 'goal transacction', icon }
                }
            } 
            await findOneAndUpdate({'userPersonalData.goals._id': id}, paramsInc);
            // delete the goal

            const params = {
                $pull: { 'userPersonalData.goals': { _id: id }},
            }
            await userModel.findOneAndUpdate({}, params);
            res.status(200).json({'message': 'delete success', 'id': id})
        }catch(e) {
            next(e);
            res.status(401)
        }
    })
}
module.exports = userGoals;