const express = require('express');
const userModel = require('../utils/models/user');
const { v1 } = require("id-creator");
const moment = require('moment');

const userGoals = (app) => {
    const router = express.Router()
    app.use('/goal', router);
    // get goal by id
    router.get('/:id', async (req, res, next) => {
        console.log('what')
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
    router.put('/:id', async(req, res, next) => {
        const id = req.params.id;
        const {  end, title, icon } = req.body;
        try{
            const params = {
                $addToSet: {
                    "userPersonalData.goals": { 
                        ammount : 0, 
                        end: moment(end).format("L"), 
                        title, 
                        icon
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
    router.put('/deposit/:id', async(req, res, next) => {
        const id = req.params.id;
        const {ammount} = req.body;
        try{
            const params = {
                $inc: { 'userPersonalData.goals.$.ammount' : ammount}
            }
            await userModel.findOneAndUpdate({'userPersonalData.goals._id': id}, params);
            res.status(201).json({'message': 'updated done', 'ammout': ammount});
        }catch(e){
            next(e);
            res.status(401).json({'message':'all params are required'});
        }
        
    })
}
module.exports = userGoals;