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
// app.get('/', function(req, res){
//     console.log('req.headers: ', req.headers);
// });
app.use(function(req, res, next){
    console.log('FB Auth:', req.headers);
    res.setHeader('access-control-allow-origin', '*');
    next();
});

app.get('/', passport.authenticate('facebook', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            console.log('existing user');
            res.redirect('/user/my-profile');
        }
    }
);

module.exports = app;
