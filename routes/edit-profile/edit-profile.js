var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;

var User = require('../../js/db/models/User');

var app = express.Router();

app.post('/', isAuthenticated, function (req, res) {
    console.log('Received /edit-profile post request');
    console.log("request: ", req.body);
    //change in db
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err) {
            res.render('500');
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.summary = req.body.summary;
            user.website = req.body.website;
            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.status(200);
                    res.send("Saved profile");
                }
            })
        }
    });
});

app.get('/remove/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id, deleted: false}, function (err, user) {
            if (err) {
                res.render('500');
            } else if (user) {
                if (type === 'github') {
                    user.github = {};
                } else if (type === 'twitter') {
                    user.twitter = {};
                } else if (type === 'fb') {
                    user.fb = {};
                } else if (type === 'google') {
                    user.google = {};
                }
                //update one social
                var total = (user.github.id !== null) +
                    (user.twitter.id !== null) +
                    (user.fb.id !== null) +
                    (user.google.id !== null);
                if (total === 1) {
                    console.log("Now only have one social");
                    user.oneSocial = true;
                }
                user.save(function (err) {
                    if (err) {
                        res.render('500');
                    } else {
                        console.log("Removed social");
                        res.redirect('/user/my-profile/edit');
                    }
                })
            }
        });
    } else {
        res.render('404');
    }
});

app.get('/toggle/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id}, function (err, user) {
            if (type === 'github') {
                user.github.hidden = !user.github.hidden;
            } else if (type === 'fb') {
                user.fb.hidden = !user.fb.hidden;
            } else if (type === 'twitter') {
                user.twitter.hidden = !user.twitter.hidden;
            } else if (type === 'google') {
                user.google.hidden = !user.google.hidden;
            }

            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.redirect('/user/my-profile/edit')
                }
            })
        })
    } else {
        res.render('404');
    }
});

app.get('/use-photo/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id}, function (err, user) {
            if (type === 'github') {
                user.avatar = user.github.avatarURL;
                user.activeAvatar = 'github';

            } else if (type === 'fb') {
                user.avatar = user.fb.avatarURL;
                user.activeAvatar = 'fb';
            } else if (type === 'twitter') {
                user.avatar = user.twitter.avatarURL;
                user.activeAvatar = 'twitter';
            } else if (type === 'google') {
                user.avatar = user.google.avatarURL;
                user.activeAvatar = 'google';
            }
            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.redirect('/user/my-profile/edit')
                }
            })
        })
    } else {
        res.render('404');
    }
});

module.exports = app;