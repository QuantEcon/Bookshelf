const passport = require('passport');
const LocalStrategy = require('passport-local')
//var User = require('../db/models/User');

passport.use(new LocalStrategy(
    function(password, done) {
       // User.findOne({ username: username }, function (err, user) {
        if (password == 'qwerty123') {
            return done(null, true);
        }
        return done(null, false);
        //});
    }
));

module.exports = passport