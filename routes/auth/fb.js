var passport = require('../../js/auth/facebook');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;

var app = express.Router();
// fb login ================================

// add fb to existing user
app.get('/add', isAuthenticated, passport.authenticate('addFB', {scope: 'email'}));
app.get('/callback/add',
    passport.authenticate('addFB', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with fb
app.get('/', passport.authenticate('facebook', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);

module.exports = app;