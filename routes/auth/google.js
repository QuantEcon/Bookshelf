var passport = require('../../js/auth/google');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;

var app = express.Router();

// google login ===========================
app.get('/add', passport.authenticate('addGoogle', {scope: 'email'}));
app.get('/callback/add', passport.authenticate('addGoogle', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
app.get('/', passport.authenticate('google', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/user/my-profile',
        failureRedirect: '/auth/failure'
    })
);

module.exports = app;