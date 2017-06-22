var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var app = express.Router();


app.get('/current-submission', isAuthenticated, function (req, res) {
    if (req.user) {
        User.findOne({_id: req.user._id}, '', function (err, user) {
            if (err) {
                console.log("Error getting current submission: ", err);
                res.render('500');
            } else if (user) {
                if (user.currentSubmission) {
                    var data = {
                        author: user,
                        notebook: user.currentSubmission,
                        currentUser: user
                    };
                    res.send(data);
                } else {
                    res.redirect('/submit');
                }
            } else {
                res.render('404');
            }
        });
    } else {
        res.redirect('/login');
    }
});

// notebook pages ==========================================================================
app.get('/:nbID/edit', isAuthenticated, function (req, res) {
    console.log("Got notebook edit");
    if (req.user) {
        res.render('submit', {
            title: 'Edit Notebook',
            data: {
                currentUser: req.user
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/:nbID', isAuthenticated, function (req, res) {

    Submission.findOne({_id: req.params.nbID}, function (err, submission) {
        if (err) {
            res.render('500');
        } else if (submission) {
            if (req.user) {
                var data = {};
                data.currentUser = req.user;
                res.render('submission', {
                    submission: submission,
                    layout: 'breadcrumbs',
                    title: submission.title,
                    data: data
                });
            } else {
                res.render('submission', {
                    submission: submission,
                    layout: 'breadcrumbs',
                    title: submission.title
                });
            }

        } else {
            res.render('404');
        }
    });

});

module.exports = app;