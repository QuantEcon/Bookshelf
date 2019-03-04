const LocalStrategy = require('passport-local').Strategy
//var User = require('../db/models/User');

<<<<<<< HEAD
module.exports = function(passport) {
    passport.use('dev', new LocalStrategy(
        function(username, password, done) {
        // User.findOne({ username: username }, function (err, user) {
            console.log("here dude?")
            if (password == 'qwerty123') {
                return done(null, true);
            }
            return done(null, false);
            //});
=======
passport.use('dev', new LocalStrategy(
    function(username, password, done) {
       // User.findOne({ username: username }, function (err, user) {
        console.log("here dude?")
        if (password == 'qwerty123') {
            return done(null, true);
>>>>>>> bf5e7d6b3c02d6491ba749e7a68f10cbfef9f831
        }
    ));
}

