const express = require('express');
const notFoundHandler = require('./utils/middleware/notFoundHandler');



const passport = require('passport');

const app = express();

// database
app.use(express.json());

// passport 
app.use(passport.initialize());
app.use(passport.session());
// routes

  
// 404 not found
app.use(notFoundHandler);

// midlewares

// erro 


app.listen(3001, function () {
    console.log(`http://localhost:3001`);   
});