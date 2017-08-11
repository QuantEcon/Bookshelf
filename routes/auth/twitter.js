var passport = require('../../js/auth/twitter');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const jwtAuth = require('../../js/auth/jwt');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const qs = require('query-string');

var app = express.Router();
var referer = '';
// twitter login ==========================

// add twitter to existing profile
//TODO: implement jwt in this route
app.get('/add', jwtAuth.authenticate('jwt', {session:false}), passport.authenticate('addTwitter', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addTwitter'), function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
            res.status(500);
            res.send({error: true, message:err})
        } else if(user){
            res.redirect(req.headers.referer + '?' + 'success=true');
        } else {
            res.status(400);
            res.send({error: true, message:'No user found'});
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
        if (req.user.new) {
            //TODO: figure out how to get the client to redirect
            console.log('[TwitterAuth] - new twitter user')
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
                        uid: req.user._id
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
                            console.log('[TwitterAuth] - redirect back to client')
                            res.redirect(referer + '?' + queryString);
                        }
                    })
            });

        }
    }
);

module.exports = app;