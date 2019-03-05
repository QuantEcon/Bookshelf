const LocalStrategy = require('passport-local').Strategy
var User = require('../db/models/User');

module.exports = function(passport) {
    console.log('some local strategies')
    passport.use(new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
    },function(username, password, done) {
        //User.findOne({ name: username }, function (err, user) {
        console.log("here?")
        if (password == 'qwerty123') {
            console.log("password match")
            return done(null, {name: username, _id: 1});
        }
        return done(null, false);
         //});
        }
    ));
}

