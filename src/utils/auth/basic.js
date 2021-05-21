const UserModel = require('../models/user');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      const user = await UserModel.findOne({'userAcconut.email': email});
      if (user == undefined) {
        return cb(boom.unauthorized(), false);
      }
      const result = await bcrypt.compare(password, user.userAcconut.password)
      if (result) {
        delete user.password; 
        return cb(null, user);
      }
      return cb(boom.unauthorized(), false);

    } catch (error) {
      return cb(error);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
 const USER = await UserModel.findById(id);
 done(null, USER);
});