const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('../utils/models/user');
const config  = require('../config');

userPetition = (app) => {
    const URI = `mongodb://${config.dbUser}:${config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(URI ,{ useNewUrlParser:true, useUnifiedTopology:true });
    mongoose.connection.once('open', () => console.log('Connected succesfully to mongo') );
    const router = express.Router()

    app.use('/api', router);
    // get user data
    router.get('/:id', async(req, res, next) => {
        const userId = req.params.id
        try{
            const user = await UserModel.find(userId);
            if(user.length == 0 ){
                return res.status(404).json({'message': 'user not found'})
            }
            delete user[0].userAcconut.password
            res.status(200).json({'user': user[0]})
        }catch(e) {
            next(e)
            res.status(400).json({'message': 'bad request'})
        }
    })
    // create user
    router.post('/', async (req, res, next) => {
        const { userId, email, fullName, password } = req.body;
        try{
            const userData = new UserModel({userAcconut: { userId, email, fullName, password } });
            await userData.save((err) => { err 
                ? res.status(400).json({'message': 'error in post data'})
                :res.status(201).json({'message': 'user post it succsessfully', 'id': userData._id } ) })
        }catch(e) {
            next(e);
            res.status(400).json({'message': 'al params are required'})
        }
    })
}