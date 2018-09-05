/**
 * Created by tlyon on 5/26/17.
 */

var passport = require('passport');
var User = require('../db/models/User');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};