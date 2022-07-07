const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password'
      },
      async (id, password, done) => {
        try {
          const exUser = await User.findOne({ where: { user_id: id } });
          if (exUser) {
            // const result = await bcrypt.compare(password, exUser.password);
            const result = password === exUser.password;
            if (result) {
              done(null, exUser);
            } else {
              done(null, false);
            }
          } else {
            done(null, false);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
