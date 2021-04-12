const mongoose = require('mongoose');
const { config } = require('../config/config');
const UserModel = require('../utils/models/user');
const ApiKeyModel = require('../utils/models/apiKey');

class MongoLib {
    constructor(){
        this.uri = `mongodb://${config.dbUser}:${config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;
        this.conection = mongoose.connection;
    }
    // conecta a la base de datos
    connect() {
        mongoose.connect(this.uri,{ useNewUrlParser:true, useUnifiedTopology:true } );
        this.conection.once('open', () => console.log('Connected succesfully to mongo') );
    }  
    //  GET ALL
    async getAll(req, res,next) {
        try{
            const users = await UserModel.find();
            res.status(200).json(users);
        }catch(err){
            console.log(err)
        }   
      }
    // GET BY ID
    async get(req, res,next) {
        const params = req.params.id;
        try{
            const users = await UserModel.findById(params);
            res.status(200).json(users);
        }catch(err){
            console.log(err)
        }   
      }
    // POST
    async post(req, res,next) {
        const {userId, name, email, password  } = req.body;
        const userData = new UserModel({
          userId,
          name,
          email,
          password
        });
        await userData.save((err) => 
            err
            ? console.log(err)
            : res.status(200).json({'message': 'note saved', 'id': userData._id })
        )
      }
      // PUT 
      async put(req, res,next) {
        const {userId, name, email, password,  experience , aboutYou } = req.body;
        try{
            await UserModel.findByIdAndUpdate(req.params.id, {
                userId,
                name,
                email,
                password
              } )
            res.status(201).json({'message': 'updated'});
        }catch(err){
            console.log(err)
        }
      }
      // DELET
      async delet(req, res,next) {
        const params = req.params.id;
        try{
            const users = await UserModel.findByIdAndDelete(params);
            res.status(200).json(users);
        }catch(err){
            console.log(err)
        }   
      }
      async create(collection, data) {
          const ApiKey = new ApiKeyModel({...data});
          await ApiKey.save((err) => 
            err
            ? console.log(err)
            : res.status(200).json({'message': 'note saved', 'id': apiKey._id })
        )
        

        
      }
}
module.exports = MongoLib;

 










