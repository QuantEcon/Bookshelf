var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;

var app = express.Router();

// github login ===========================

// add github to profile
app.get('/add', isAuthenticated, passport.authenticate('addGithub', {scope: 'email'}));
app.get('/callback/add',
    passport.authenticate('addGithub', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register with github
app.get('/', passport.authenticate('github', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('github', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);

module.exports = app;