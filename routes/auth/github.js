var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;

var app = express.Router();

// github login ===========================
// app.use(function(req, res, next){
//     console.log('[GITHUB AUTH] req:', req);
//     next();
// }); 
// add github to profile
app.get('/add', isAuthenticated, passport.authenticate('addGithub', {scope: 'email'}));
app.get('/callback/add',
    passport.authenticate('addGithub', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register with github
app.get('/',passport.authenticate('github', {scope: 'email'}));
app.get('/callback',
    passport.authenticate('github', {failureRedirect: '/api/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            console.log('github auth new user');
            res.redirect('/complete-registration');
        } else {
            console.log('github auth existing user');
            res.redirect('/user/my-profile');
        }
    }
);

module.exports = app;