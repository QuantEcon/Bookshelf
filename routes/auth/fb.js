var passport = require('../../js/auth/facebook');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const qs = require('query-string');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');

var app = express.Router();
// fb login ================================

// add fb to existing user
//TODO: implement jwt in this route

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

app.options('/', function (req, rex) {
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
            //TODO: figure out how to get the client to redirect
            res.redirect('/complete-registration');
        } else {
            const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
                ' avatar website email summary activeAvatar currentProvider github.username githu' +
                'b.url github.hidden github.avatarURL fb.displayName fb.url fb.hidden fb.avatarUR' +
                'L google.avatarURL google.hidden google.displayName twitter.username twitter.ava' +
                'tarURL twitter.url twitter.hidden';

            User.findOne({
                '_id': req.user._id
            }, select, function (err, user) {
                if (err) {
                    res.sendStatus(500);
                } else if (user) {
                    var token = jwt.sign({
                        user
                    }, 'banana horse laser muffin');
                    var queryString = qs.stringify({
                        token,
                        uid: req.user._id
                    });
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