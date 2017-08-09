var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const passport = require('../../js/auth/jwt');

const bodyParser = require('body-parser');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next){
    console.log('[Downvote] - req.headers: ', req.headers);
    console.log('[Downvote] - body: ', req.body);
    next();
})

app.post('/submission',  passport.authenticate('jwt', {session:false}), function (req, res) {
    console.log("Received downvote submission: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({code: 1, message: 'Login Required'});
        return;
    }
    Submission.findOne({_id: req.body.submissionID}, function (err, submission) {
        if (err) {
            res.status(500);
        } else if (submission) {
            // get user
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    res.sendStatus(500);
                } else if (user) {

                    //has not downvoted
                    if (req.user.downvotes.indexOf(req.body.submissionID) === -1) {
                        console.log('[Downvote] - has not downvoted');
                        //has not upvoted
                        if (req.user.upvotes.indexOf(req.body.submissionID) !== -1) {
                            console.log('[Downvote] - has not upvoted');
                            // no downvote, upvote
                            //remove commentID from user.upvotes
                            user.upvotes.remove(req.body.submissionID);
                            submission.score -= 1;
                        }
                        //add commentID to user.upvotes
                        user.downvotes.push(submission._id);
                        //decrement comment.score
                        submission.score -= 1;
                        //save user
                        user.save(function (err, user) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                //save submission
                                submission.save(function (err, comment) {
                                    if (err) {
                                        console.log('[Downvote] - error saving submission');
                                        res.sendStatus(500);
                                    } else {
                                        console.log('[Downvote] - success');
                                        res.send({
                                            submissionID: submission._id
                                        });
                                    }
                                });
                            }
                        });
                    }

                    // has downvoted
                    else {
                        console.log('[Downvote] - has downvoted');
                        //remove commentID from user.downvotes
                        user.downvotes.remove(req.body.submissionID);
                        //increment comment score
                        submission.score += 1;
                        //save user
                        user.save(function (err, user) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                //save comment
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.sendStatus(500);
                                    } else {
                                        res.send({
                                            submissionID: submission._id
                                        });
                                    }
                                });
                            }
                        });
                    }

                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(500);
        }
    });

});

app.post('/comment',  passport.authenticate('jwt', {session:false}), function (req, res) {
    console.log("Received downvote comment: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({code: 1, message: 'Login Required'});
        return;
    }
    Comment.findOne({_id: req.body.commentID}, function (err, comment) {
        if (err) {
            res.status(500);
        } else if (comment) {
            // get user
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    res.status(500);
                } else if (user) {
                    //has not downvoted
                    if (user.downvotes.indexOf(req.body.commentID) === -1) {
                        //has not upvoted
                        if (user.upvotes.indexOf(req.body.commentID) !== -1) {
                            // no downvote, upvote
                            //remove commentID from user.upvotes
                            user.upvotes.remove(req.body.commentID);
                            comment.score -= 1;
                        }
                        //add commentID to user.downvotes
                        user.downvotes.push(comment._id);
                        //decrement comment.score
                        comment.score -= 1;
                        //save user
                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                //save comment
                                comment.save(function (err, comment) {
                                    if (err) {
                                        res.status(500);
                                    } else {
                                        res.send({
                                            commentID: comment._id
                                        });
                                    }
                                });
                            }
                        });

                    } else { // has downvoted
                        //remove commentID from user.downvotes
                        user.downvotes.remove(req.body.commentID);
                        //increment comment score
                        comment.score += 1;
                        //save user
                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                //save comment
                                comment.save(function (err, comment) {
                                    if (err) {
                                        res.status(500);
                                    } else {
                                        res.send({
                                            commentID: comment._id
                                        });
                                    }
                                });
                            }
                        });
                    }
                } else {
                    res.status(500);
                }
            })

        } else {
            res.status(500);
        }
    });
});

module.exports = app;