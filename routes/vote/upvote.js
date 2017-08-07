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
    console.log('[Upvote] - req.headers: ', req.headers);
    console.log('[Upvote] - body: ', req.body);
    next();
})

app.post('/submission', passport.authenticate('jwt', {session:false}), function (req, res) {
    if (!req.user) {
        console.log("User not logged in");
        res.status(401);
        res.send({code: 1, message: 'Login Required'});
        return;
    }
    Submission.findOne({_id: req.body.submissionID}, function (err, submission) {
        if (err) {
            res.sendStatus(500);
        } else if (submission) {
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    res.sendStatus(500);
                } else if (user) {
                    //has not upvoted
                    if (user.upvotes.indexOf(submission._id) === -1) {
                        console.log('[Upvote] - has not upvoted');
                        //has not downvoted
                        if (user.downvotes.indexOf(submission._id) !== -1) {
                            console.log('[Upvote] - has not downvoted');
                            //no upvote, downvote
                            //remove submissionID from user.downvotes
                            user.downvotes.remove(submission._id);
                            //increment submission.score
                            submission.score += 1;
                        }
                        //add submissionID to user.upvotes
                        user.upvotes.push(submission._id);
                        //increment submission.score
                        submission.score += 1;

                        user.save(function (err, user) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.sendStatus(500);
                                        //todo: edit user?
                                    } else {
                                        res.send({
                                            submissionID: submission._id
                                        });
                                    }
                                });
                            }
                        })

                    }

                    //has upvoted
                    else {
                        console.log('[Upvote] - has upvoted');
                        user.upvotes.remove(submission._id);
                        submission.score -= 1;
                        user.save(function (err, user) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.sendStatus(500);
                                        //todo: edit user?
                                    } else {
                                        res.send({
                                            submissionID: submission._id
                                        });
                                    }
                                });
                            }
                        })
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            console.log('[UpvoteSubmission] - no submission');
            res.status(500);
            res.send({
                error: true,
                code: 2,
                message: 'Couldn\'t find submission'
            })
        }
    })
});

app.post('/comment', passport.authenticate('jwt', {session:false}), function (req, res) {
    console.log("Received upvote comment: ", req.body);
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
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    res.status(500);
                } else if (user) {
                    //has not upvoted
                    if (user.upvotes.indexOf(comment._id) === -1) {
                        //has not downvoted
                        if (user.downvotes.indexOf(comment._id) !== -1) {
                            //no upvote, downvote
                            //remove commentID from user.downvotes
                            user.downvotes.remove(comment._id);
                            //increment comment.score
                            comment.score += 1;
                        }
                        //add commentID to user.upvotes
                        user.upvotes.push(comment._id);
                        //increment comment.score
                        comment.score += 1;

                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                comment.save(function (err, comment) {
                                    if (err) {
                                        res.status(500);
                                        //todo: edit user?
                                    } else {
                                        res.send({
                                            commentID: comment._id
                                        });
                                    }
                                });
                            }
                        })

                    }

                    //has upvoted
                    else {
                        user.upvotes.remove(comment._id);
                        comment.score -= 1;
                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                comment.save(function (err, comment) {
                                    if (err) {
                                        res.status(500);
                                        //todo: edit user?
                                    } else {
                                        res.send({
                                            commentID: comment._id
                                        });
                                    }
                                });
                            }
                        })
                    }
                } else {
                    res.status(500);
                }
            });
        } else {
            res.status(500);
        }
    })
});

module.exports = app;