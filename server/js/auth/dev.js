const LocalStrategy = require('passport-local').Strategy
var User = require('../db/models/User');

module.exports = function(passport) {
    console.log('some local strategies')
    passport.use(new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
    },function(username, password, done) {
        User.findOne({ name: username }, function (err, user) {
            console.log("here dude?")
            if (password == 'qwerty123') {
                console.log("password match")
                return done(null, user);
            }
            return done(null, false);
         });
        }
    ));
}

