const express = require('express');
const app = express();

const richAPI = require('./routes/RichAPI')

// app.get('/', function (req, res, next) {
//     res.send('holá');
    
// });
// routes
richAPI(app);

// midlewares

// error handler


const server = app.listen(3000, function () {
    console.log(`http://localhost:3000`);   
});