const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const UserModel = require('../utils/models/user');
const config  = require('../config/index');
const bcrypt = require('bcrypt');
const validateAuth = require('../utils/auth/validateAuth');
require('../utils/auth/basic');

userPetition = (app) => {
    const URI = `mongodb://${config.dbUser}:${config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(URI ,{ useNewUrlParser:true, useUnifiedTopology:true });
    mongoose.connection.once('open', () => console.log('Connected succesfully to mongo') );
    const router = express.Router()

    app.use('/user', router);

    router.get('/test',validateAuth, 
        (req, res, next) => {
        res.status(200).json({'message': 'you can see the data'})
    } )
    // log in user
    router.post('/log-in',passport.authenticate('basic', {sesion: true }),
        async(req, res, next) => {
            const { email } = req.body;
            try{
                let user = await UserModel.findOne({'userAcconut.email': email});
                user.userAcconut.password = null;

                const userData = await UserModel.find({});
                const friends = []
                userData.forEach(e => friends.push({
                    email: e.userAcconut.email,
                    fullName: e.userAcconut.fullName }))
                
                user.userPersonalData.userFriends = friends;

                res.status(200).json({'user': user});         
            }catch (e){
                next(e);
                res.status(400).json({'message': 'bad request'}); 
        }
    })
    // get user by sesion and email
    router.post('/',validateAuth,
    async(req, res, next) => {
        const { email } = req.body;
        try{
            let user = await UserModel.findOne({'userAcconut.email': email});

            const userData = await UserModel.find({});
            const friends = []
            userData.forEach(e => friends.push({
                id: e._id,
                fullName: e.userAcconut.fullName }))
            
            user.userPersonalData.userFriends = friends;

            res.status(200).json({'user': user});         
        }catch (e){
            next(e);
            res.status(400).json({'message': 'bad request'}); 
    }
})

    // create user
    router.post('/sing-up', async (req, res, next) => {
        const { userId, email, fullName, password } = req.body;
        try{
            const hashPassword = await bcrypt.hash(password, 8);
            const userData = new UserModel({userAcconut: { userId, email, fullName, password: hashPassword} });
            await userData.save((err) => { 
                if(err) {
                    next(err);
                    return res.status(400).json({'message': 'error in post data'});
                }
                res.status(201).json({'message': 'user post it succsessfully', 'id': userData._id } ) })
        }catch(e) {
            next(e);
            res.status(400).json({'message': 'al params are required'})
        }
    })
    
    // config user data
    router.put('/:id', validateAuth, async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try{
            const { userId, email, fullName, password } = data;
            userId ? await UserModel.findByIdAndUpdate(id,{'userAcconut.userId': userId}) : () => {} ;
            email ? await UserModel.findByIdAndUpdate(id,{'userAcconut.email': email}) : () => {} ;
            fullName ? await UserModel.findByIdAndUpdate(id,{'userAcconut.fullName': fullName}) : () => {} ;
            if(password){
                const hashPassword = await bcrypt.hash(password, 8);
                await UserModel.findByIdAndUpdate(id,{'userAcconut.password': hashPassword})
            }
            res.status(200).json({'data': { userId, email, fullName, password } , 'id': id});
        }catch(e) {
            next(e);
            res.status(404).json({'message': 'user not found'});
        }
    })
    // delete user data
    router.delete('/:id', validateAuth, async (req, res, next) => {
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