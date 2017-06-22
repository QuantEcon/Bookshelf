var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var app = express.Router();


app.get('/my-profile/edit', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    res.render('edit-profile', {
        data: {
            user: req.user,
            currentUser: req.user,
            userAr: [req.user]
        },
        layout: 'breadcrumbs',
        title: 'Edit Profile'
    })
});

app.get('/my-profile', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    Submission.find({_id: {$in: req.user.submissions}, deleted: false}, function (err, submissions) {
        if (err) {
            res.render('500');
        } else {
            res.render('user', {
                title: 'My Profile',
                data: {
                    user: req.user,
                    currentUser: req.user,
                    userAr: [req.user],
                    myPage: true,
                    submissions: submissions
                }
            })
        }
    });

});

app.get('/:userID', isAuthenticated, function (req, res) {
    if (req.params.user && req.params.userID.equals(req.user._id)) {
        res.redirect('/user/my-profile');
    }
    User.findOne({_id: req.params.userID, deleted: false}, function (err, user) {
        if (err) {
            res.render('500');
        } else if (user) {
            Submission.find({_id: {$in: user.submissions}, deleted: false}, function (err, submissions) {
                if (err) {
                    res.render('500');
                } else {
                    res.render('user', {
                        data: {
                            user: user,
                            currentUser: req.user,
                            userAr: [user],
                            submissions: submissions
                        },
                        layout: 'breadcrumbs',
                        title: user.name
                    });
                }
            });
        }
        else {
            res.render('404');
        }
    });
});

module.exports = app;