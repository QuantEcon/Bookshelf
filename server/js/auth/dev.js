const LocalStrategy = require('passport-local').Strategy
var User = require('../db/models/User');

module.exports = function(passport) {
    console.log('some local strategies')
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                  return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
              });
            }
    ));
}

