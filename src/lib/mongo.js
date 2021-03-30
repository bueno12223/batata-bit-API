const mongoose = require('mongoose');
const { config } = require('../config/config');

const uri = `mongodb://${config.dbUser}:${config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;


mongoose.connect(uri,{ useNewUrlParser:true, useUnifiedTopology:true } )

const conection = mongoose.connection;
conection.once('open', () => console.log('Connected succesfully to mongo') );

// class MongoLib {
//     constructor(){
//         this.client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology:true });
//     }
//     connect() {
//         if (!MongoLib.connection) {
//             MongoLib.connection = new Promise((resolve, reject) => {
//             this.client.connect(err => {
//               if (err) {
//                 reject(err);
//               }
//               console.log('Connected succesfully to mongo');
//               resolve(this.client.db(config.dbName));
//             });
//           });
//         }

//     }  
//     get(){
//         let data
//         this.connect().then(db => data = db)
//         return data
//     }
// }

 










