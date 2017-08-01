var passport = require('../../js/auth/facebook');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const qs = require('query-string');
const User = require('../../js/db/models/User');

var app = express.Router();
// fb login ================================

// app.use(function(req, res, next){
//     console.log('[FB AUTH] req.headers:', req.headers);
//     console.log('[FB AUTH] req.method:', req.method);
//     next();
// }); 

// add fb to existing user
app.get('/add', isAuthenticated, passport.authenticate('addFB', {
    scope: 'email'
}));
app.get('/callback/add',
    passport.authenticate('addFB', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with fb

app.options('/', function(req, rex){
    console.log('in options for fb auth');
})
app.get('/', passport.authenticate('facebook', {
    scope: 'email'
}));
app.get('/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/failure'
    }),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            var queryString = qs.stringify({
                token: req.user.fb.access_token,
                uid: req.user._id
            });
            User.findOne({
                '_id': req.user._id
            }, function (err, user) {
                if (err) {
                    res.sendStatus(500);
                } else if (user) {
                    user.currentToken = req.user.fb.access_token;
                    user.currentProvider = 'Facebook'
                } else {
                    res.sendStatus(500);
                }
                user.save(function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.redirect(req.headers.referer + '?' + queryString);
                    }
                })
            });
        }
    }
);

module.exports = app;