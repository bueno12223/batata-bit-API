const PassportLocal = requiere('passport-local').Strategy;
const dataBase = require('../../lib/mongo');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

passport.use(
  new PassportLocal(async function(email, password, cb) {
    const userService = new UsersService();

    try {
      const user = await userService.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);