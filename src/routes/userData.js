const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('../utils/models/user');
const config  = require('../config/index');
const bcrypt = require('bcrypt');
const { v1 } = require("id-creator");

userPetition = (app) => {
    const URI = `mongodb://${config.config.dbUser}:${config.config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(URI ,{ useNewUrlParser:true, useUnifiedTopology:true });
    mongoose.connection.once('open', () => console.log('Connected succesfully to mongo') );
    const router = express.Router()

    app.use('/api', router);
    // get user data
    router.get('/:id', async(req, res, next) => {
        const id = req.params.id;
        console.log(id)
        try{
            const user = await UserModel.findById(id);
            console.log(user)
            delete user.userAcconut.password
            res.status(200).json({'user': user})
        }catch(e) {
            next(e)
            res.status(400).json({'message': 'bad request'})
        }
    })
    // create user
    router.post('/', async (req, res, next) => {
        const { userId, email, fullName, password } = req.body;

        try{
            if(!userId  || !email || !fullName || !password ){
                res.status(400).json({'message': 'al params are required'})
            }
            const hashAccessKey = await bcrypt.hash(v1(16, true), 10);
            const hashPassword = await bcrypt.hash(password, 8);
            const userData = new UserModel({userAcconut: { userId, email, fullName, password: hashPassword }, accessKey: hashAccessKey });
            await userData.save((err) => { 
                if(err) {
                    console.log(err, err.code)
                    return res.status(400).json({'message': 'error in post data'})
                }
                res.status(201).json({'message': 'user post it succsessfully', 'id': userData._id } ) })
        }catch(e) {
            next(e);
            res.status(400).json({'message': 'al params are required'})
        }
    })
    
    // config user data
    router.put('/:id', async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try{
            const { userId, email, fullName, password } = data;
            const params = { userId, email, fullName, password }
            userId ? userId : delete params.userId;
            email ? email : delete params.email;
            fullName ? fullName : delete params.fullName;
            password ? await bcrypt.hash(password, 10) : delete params.password;

            await UserModel.findByIdAndUpdate(id, params);
        }catch(e) {
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    // delete user data
    router.delete('/:id', async (req, res, next) => {
        const id = req.params.id;
        try{
            await UserModel.findByIdAndDelete(id);
            res.status(200).json({'message': 'user deleted succsesufuly'})
        }catch(e){
            res.status(404).json({'message': 'user wasn`t found'})
        }
    } )
}
module.exports = userPetition;