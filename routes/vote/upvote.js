var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var app = express.Router();

app.post('/submission', isAuthenticated, function (req, res) {
    console.log("Received upvote submission: ", req.body, req.user);
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
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    res.status(500);
                } else if (user) {
                    //has not upvoted
                    if (user.upvotes.indexOf(submission._id) === -1) {
                        //has not downvoted
                        if (user.downvotes.indexOf(submission._id) !== -1) {
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
                                res.status(500);
                            } else {
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.status(500);
                                        //todo: edit user?
                                    } else {
                                        res.send('success');
                                    }
                                });
                            }
                        })

                    }

                    //has upvoted
                    else {
                        user.upvotes.remove(submission._id);
                        submission.score -= 1;
                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.status(500);
                                        //todo: edit user?
                                    } else {
                                        res.send('success');
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

app.post('/comment', isAuthenticated, function (req, res) {
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
                                        res.send('success');
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
                                        res.send('success');
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