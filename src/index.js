const express = require('express');

const notFoundHandler = require('../../video-api/utils/middleware/notFoundHandler');
const MongoLib = require('./lib/mongo');
const richAPI = require('./routes/RichAPI');

const dataBase = new MongoLib();

const app = express();

// database
dataBase.connect();
app.use(express.json());

// routes
richAPI(app);
  
// 404 not found
app.use(notFoundHandler);

// midlewares

// error handler


app.listen(3000, function () {
    console.log(`http://localhost:3000`);   
});