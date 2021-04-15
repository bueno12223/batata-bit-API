const mongoose = require('mongoose');
const { config } = require('../config/config');
const UserModel = require('../utils/models/user');
const bcrypt = require('bcrypt');

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
    async getByParams(body) {
      const users =  await UserModel.find(body);
      return users
      }
    // GET BY ID
    async getById(id) {
      const users = await UserModel.findById(id);
      return users 
      }
    // POST
    async post({userId, name, email, password, isAdmin  }) {
        const userData = new UserModel({
          userId,
          name,
          email,
          password: await bcrypt.hash(password, 10),
          isAdmin
        });
        await userData.save((err) =>{ return userData._id });
      }
      // PUT 
      async put( {userId, name, email, password }, id) {
        const params = {userId, name, email, password };
        userId ? userId : delete params.userId
        name ? name : delete params.name
        email ? email : delete params.email
        password ? await bcrypt.hash(password, 10) : delete params.password
        await UserModel.findByIdAndUpdate(id,params);
      }
      // DELET
      async delet(id) {
        try{
            const users = await UserModel.findByIdAndDelete(id);
            res.status(200).json(users);
        }catch(err){
            console.log(err)
        }   
      }
}
module.exports = MongoLib;

 










