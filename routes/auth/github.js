var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const secret = require('../../_config').secret

const qs = require('query-string');

var app = express.Router();

// github login =========================== app.use(function(req, res, next){
// console.log('[GITHUB AUTH] req:', req);     next(); }); add github to profile
//TODO: implement jwt in this route
app.get('/add', isAuthenticated, passport.authenticate('addGithub', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addGithub', {
    successRedirect: '/user/my-profile/edit',
    failureRedirect: '/user/my-profile/add-failed'
}));
// register with github
app.get('/', passport.authenticate('github', {
    scope: 'email'
}));
app.get('/callback', passport.authenticate('github', {
    failureRedirect: '/api/auth/failure'
}), function (req, res) {
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
                //sign new jwt
                var token = jwt.sign({
                    user: {
                        _id: user._id
                    }
                }, "banana horse laser muffin");
                var queryString = qs.stringify({
                    token,
                    uid: req.user._id
                });
                user.currentProvider = 'Github';
            } else {
                res.sendStatus(500);
            }
            user
                .save(function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.redirect(req.headers.referer + '?' + queryString);
                    }
                })
        });

    }
});

module.exports = app;