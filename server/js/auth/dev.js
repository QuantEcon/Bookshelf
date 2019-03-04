const LocalStrategy = require('passport-local').Strategy
//var User = require('../db/models/User');

module.exports = function(passport) {
    console.log('some local strategies')
    passport.use('dev', new LocalStrategy(
        function(username, password, done) {
            console.log('yaha aaya kya?')
        // User.findOne({ username: username }, function (err, user) {
            console.log("here dude?")
            if (password == 'qwerty123') {
                return done(null, true);
            }
            return done(null, false);
            //});
        }
    ));
}

