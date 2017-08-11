var passport = require('../../js/auth/facebook');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const qs = require('query-string');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');

const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
' avatar website email summary activeAvatar currentProvider github.username githu' +
'b.url github.hidden github.avatarURL fb.displayName fb.url fb.hidden fb.avatarUR' +
'L google.avatarURL google.hidden google.displayName twitter.username twitter.ava' +
'tarURL twitter.url twitter.hidden';

var app = express.Router();
// fb login ================================ add fb to existing user
//TODO: implement jwt in this route

app.get('/add', passport.authenticate('addFB', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addFB'), function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
            res.status(500);
            res.send({error: true, message:err})
        } else if(user){
            var token = jwt.sign({
                user: {
                    _id: user._id
                }
            }, 'banana horse laser muffin');
            var queryString = qs.stringify({
                token,
                uid: req.user._id
            });
            res.redirect(req.headers.referer + '?' + queryString);
        } else {
            res.status(400);
            res.send({error: true, message:'No user found'});
        }
    })
});
// register new user with fb

app.options('/', function (req, rex) {
    console.log('in options for fb auth');
})

app.get('/', passport.authenticate('facebook', {
    scope: 'email'
}));
app.get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/auth/failure'
}), function (req, res) {
    if (req.user.new) {
        //TODO: figure out how to get the client to redirect
        res.sendStatus(400);
    } else {
        User.findOne({
            '_id': req.user._id
        }, select, function (err, user) {
            if (err) {
                res.sendStatus(500);
            } else if (user) {
                var token = jwt.sign({
                    user: {
                        _id: user._id
                    }
                }, 'banana horse laser muffin');
                var queryString = qs.stringify({
                    token,
                    uid: req.user._id
                });
                user.currentProvider = 'Facebook'
                user
                    .save(function (err) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.redirect(req.headers.referer + '?' + queryString);
                        }
                    })
            } else {
                res.sendStatus(500);
            }

        });
    }
});

module.exports = app;