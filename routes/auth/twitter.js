var passport = require('../../js/auth/twitter');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;

var app = express.Router();
// twitter login ==========================

// add twitter to existing profile
app.get('/add', passport.authenticate('addTwitter', {scope: 'email'}));
app.get('/callback/add', passport.authenticate('addTwitter', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with twitter
app.get('/', passport.authenticate('twitter', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('twitter', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);

module.exports = app;
