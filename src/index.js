const express = require('express');
const session = require("express-session");
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const MongoLib = require('./lib/mongo');
const userPetition = require('./routes/userPetition');
const dataBase = new MongoLib();
const app = express();

// database
dataBase.connect();
app.use(express.json());
// routes
userPetition(app);
  
// 404 not found
app.use(notFoundHandler);

// midlewares

// error handler


app.listen(3000, function () {
    console.log(`http://localhost:3000`);   
});