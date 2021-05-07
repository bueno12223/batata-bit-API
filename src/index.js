const express = require('express');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');
const userData = require('./routes/userData');
const transacctionsUser = require('./routes/userTransaccions');
const userGoals = require('./routes/userGoals');
const config = require('./config');
const app = express();

// midlewares
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));

// passport 
app.use(passport.initialize());
app.use(passport.session());

// routes
userData(app);
transacctionsUser(app)
userGoals(app);
  
// 404 not found
app.use(notFoundHandler);

// midlewares

// error


app.listen(config.port, function () {
    console.log(`http://localhost:${config.port}`);   
});
