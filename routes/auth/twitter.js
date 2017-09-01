var passport = require('../../js/auth/twitter');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const jwtAuth = require('../../js/auth/jwt');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const appConfig = require('../../_config')

var app = express.Router();
var referer = '';
// twitter login ==========================

// add twitter to existing profile
app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), passport.authenticate('twitter', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addTwitter'), function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(500);
            res.send({
                error: true,
                message: err
            })
        } else if (user) {
            res.redirect(req.headers.referer + '?' + 'success=true');
        } else {
            res.status(400);
            res.send({
                error: true,
                message: 'No user found'
            });
        }
    })
});

// register/login with twitter
app.get('/', passport.authenticate('twitter', {
    scope: 'email'
}));
app.get('/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/auth/failure'
    }),
    function (req, res) {
        console.log('[TwitterAuth] - after second auth');

        const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
        ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'
        User.findOne({
            '_id': req.user._id
        }, select, function (err, user) {
            if (err) {
                console.log('[TwitterAuth] - error finding user')
                res.sendStatus(500);
            } else if (user) {
                console.log('[TwitterAuth] - found user')
                //sign new jwt
                var token = jwt.sign({
                    user: {
                        _id: user._id
                    }
                }, "banana horse laser muffin");
                var queryString = qs.stringify({
                    token,
                    uid: req.user._id,
                    fromAPI: true
                });
                user.currentProvider = 'Twitter';
            } else {
                console.log('[TwitterAuth] - no user found')
                res.sendStatus(500);
            }
            user
                .save(function (err) {
                    if (err) {
                        console.log('[TwitterAuth] - error saving user')
                        res.sendStatus(500);
                    } else {
                        console.log('[TwitterAuth] - redirect back to client: ', req)
                        var redirect = appConfig.hostName + '/signin' + '?' + queryString;
                        console.log('[TwitterAuth] - redirect url: ', redirect);
                        res.redirect(redirect);
                    }
                })
        });

    }

);

module.exports = app;