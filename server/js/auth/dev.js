const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
//var User = require('../db/models/User');

passport.use('dev', new LocalStrategy(
    function(username, password, done) {
       // User.findOne({ username: username }, function (err, user) {
        console.log("here dude?")
        if (password == 'qwerty123') {
            return done(null, true);
        }
        return done(null, false);
        //});
    }
));

module.exports = passport