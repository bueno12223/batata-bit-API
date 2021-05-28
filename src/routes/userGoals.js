const express = require('express');
const userModel = require('../utils/models/user');
const validateAuth = require('../utils/auth/validateAuth');
const moment = require('moment');

const userGoals = (app) => {
    const router = express.Router()
    app.use('/goal', router);
    // put money in a goal
    router.put('/deposit', validateAuth,
     async(req, res, next) => {
        const { ammount, since, title, icon } = req.body;
        try{
            const params = {
                $inc: { 
                    'userPersonalData.goals.$.ammount' : ammount,
                    'userPersonalData.money.spend' : ammount ,
                    'userPersonalData.money.total' : ammount * -1
                },
                $addToSet: {
                    'userPersonalData.transacctions': { to: since, since: 'you', ammount, transacction_type: title, icon }
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
        router.put('/break', async (req, res, next) => {
            const { userId, id } = req.body;
            try{
                // add the money
                const userData = await userModel.findById(userId)
                const {userPersonalData: {goals}} = userData
                const transacction = goals.filter(e => e._id == id)
                console.log(transacction)
                const { ammount, icon, title} = transacction[0];
                const params = {
                    $pull: { 
                        'userPersonalData.goals': {_id: id } 
                    }
                }
                const paramsInc = {
                    $inc: {
                        "userPersonalData.money.incomer": ammount,
                        "userPersonalData.money.total": ammount,
                        },
                    $addToSet: {
                        'userPersonalData.transacctions': { to: 'you', since: id, ammount, transacction_type: title , icon }
                    },
                }
                await userModel.findByIdAndUpdate(userId, paramsInc)
                await userModel.findByIdAndUpdate(userId, params, { safe: true });
                res.status(200).json({'message': 'delete success', 'id': id})
            }catch(e) {
                next(e);
                res.status(401)
            }
        })
        
        // create a goal
        router.put('/:id',async(req, res, next) => {
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
}
module.exports = userGoals;