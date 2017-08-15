var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const secret = require('../../_config').secret
const jwtAuth = require('../../js/auth/jwt');

const qs = require('query-string');

var app = express.Router();

// github login =========================== app.use(function(req, res, next){
// console.log('[GITHUB AUTH] req:', req);     next(); }); add github to profile
//TODO: implement jwt in this route
app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log('[Github] - authenticated');
    next();
}, passport.authenticate('github', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addGithub'), function (req, res) {
    console.log('[AddGithub] - req: ', req);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(500);
            res.send({
                error: true,
                message: err
            })
        } else if (user) {
            var token = jwt.sign({
                user: {
                    _id: user._id
                }
            }, "banana horse laser muffin");
            var queryString = qs.stringify({
                token,
                uid: req.user._id
            });
            res.redirect(req.headers.referer + '?' + queryString);
        } else {
            res.status(400);
            res.send({
                error: true,
                message: 'No user found'
            });
        }
    })
});
// register with github
app.get('/', passport.authenticate('github', {
    scope: 'email'
}));
app.get('/callback', passport.authenticate('github', {
    failureRedirect: '/api/auth/failure'
}), function (req, res) {
    const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
        ' avatar website email summary activeAvatar currentProvider github.username githu' +
        'b.url github.hidden github.avatarURL fb.displayName fb.url fb.hidden fb.avatarUR' +
        'L google.avatarURL google.hidden google.displayName twitter.username twitter.ava' +
        'tarURL twitter.url twitter.hidden';
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
            console.log('[Github] - err1: ', err);
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
                uid: req.user._id,
                fromAPI: true
            });
            console.log('[Github] - query string:', queryString);
            user.currentProvider = 'Github';
        } else {
            console.log('[Github] - err2: ');
            res.sendStatus(500);
        }
        user
            .save(function (err) {
                if (err) {
                    console.log('[Github] - err3: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('[Github] - redirect: ', req.headers.referer + '?' + queryString)
                    res.redirect(req.headers.referer + '?' + queryString);
                }
            })
    });
});

module.exports = app;