const express = require('express');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const passport = require('passport');

const userData = require('./routes/userData');
const transacctionsUser = require('./routes/userTransaccions');
const app = express();

// midlewares
app.use(express.json());

// passport 
app.use(passport.initialize());
app.use(passport.session());
// routes
userData(app);
transacctionsUser(app)
  
// 404 not found
app.use(notFoundHandler);

// midlewares

// erro 


app.listen(3001, function () {
    console.log(`http://localhost:3001`);   
});
