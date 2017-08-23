var express = require('express');
var multiparty = require('connect-multiparty');
const passport = require('../../js/auth/jwt');
const bodyParser = require('body-parser');
const multer = require('multer');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var sprintf = require('sprintf');
var exec = require('child_process').exec;

var fs = require('fs');
var path = require('path');

var multipartyMiddleware = multiparty();

const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
        cb(null, `${new Date()}-${file.originalname}`)
    }
});

const upload = multer({
    storage
});

var app = express.Router();

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit:50000
}));

// app.use(function(req, res, next){     // console.log('[Submit] - req.headers:
// ', req.headers)     // console.log('[Submit] - req.body: ', req.body);
// console.log('[Submit] - req: ', req);     next(); })

app.post('/', passport.authenticate('jwt', {
    session: 'false'
}), upload.single('file'), (req, res) => {
    let formData = JSON.parse(req.body.formData);
    console.log('[Submit] - req.body: ', formData);
    console.log('[Submit] - req.file: ', req.file);

    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log('[Submit] - error finding user');
            res.status(500);
            res.send({
                error: 'Error finding user'
            })
        } else if (user) {
            var newSub = new Submission();

            newSub.title = formData.title;

            newSub.topics = formData.topics;

            newSub.lang = formData.lang;
            newSub.summary = formData.summary;

            //todo: not sure if we should have this or not newSub.file = file;

            newSub.author = user._id;
            //todo: parse co-authors newSub.coAuthors = coAuthors
            newSub.comments = [];
            newSub.totalComments = 0;

            newSub.score = 0;
            newSub.views = 0;

            newSub.published = new Date();
            newSub.lastUpdated = new Date();

            newSub.deleted = false;
            newSub.flagged = false;

            newSub.fileName = req.file.originalname;
            newSub.ipynbFile = req.file.path;

            user.currentSubmission = newSub;

            user.save((err) => {
                if (err) {
                    console.log('[Submit] - error saving user: ', err);
                    res.status(500);
                    res.send({
                        error: true,
                        message: 'Error saving user'
                    })
                } else {
                    res.status(200);
                    console.log('[Submit] - success');
                    fs.readFile(req.file.path, 'utf8', (err, notebookString) => {
                        if (err) {
                            res.status(500);
                            res.send({
                                error: true,
                                message: 'Error reading file'
                            })
                        } else {
                            var sub = newSub;
                            sub.notebookJSON = JSON.parse(notebookString);
                            res.send({
                                submission: sub
                            })
                        }
                    })
                }
            })
        } else {
            res.status(400);
            res.send({
                error: 'Coudldn\'t find user'
            })
        }
    });
});

app.get('/cancel', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    User
        .findOne({
            _id: req.user._id
        }, function (err, user) {
            if (err || !user) {
                res.render('500');
            } else if (user) {
                user.currentSubmission = null;
                user.save(function (err) {
                    if (err) {
                        res.render('500');
                    } else {
                        res.status(200);
                        res.send('redirect');
                    }
                })
            }
        })
});

app.post('/confirm', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var newSub = new Submission();

    newSub.title = req.body.submission.title;

    newSub.topics = req.body.submission.topics;

    newSub.lang = req.body.submission.lang;
    newSub.summary = req.body.submission.summary;

    //todo: not sure if we should have this or not newSub.file = file;

    newSub.author = req.user._id;
    //todo: parse co-authors newSub.coAuthors = coAuthors
    newSub.comments = [];
    newSub.totalComments = 0;

    newSub.score = 0;
    newSub.views = 0;

    newSub.published = new Date();
    newSub.lastUpdated = new Date();

    newSub.deleted = false;
    newSub.flagged = false;

    newSub.fileName = req.body.submission.fileName;
    newSub.notebookJSONString = JSON.stringify(req.body.submission.notebookJSON)

    User.findById(req.user._id, (err, user) => {
        if(err) {
            res.status(500);
            res.send({error: err});
        } else if(user){
            newSub.save((err, submission) => {
                if(err){
                    res.status(500);
                    res.send({error: err});
                } else {
                    user.submissions.push(submission._id)

                }
            })
        } else {
            res.status(500);
            res.send({error: 'No user found'});
        }
    })
});

app.post('/edit-submission', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Submission.findById(req.body.submissionData._id, (err, submission) => {
        if (err) {
            res.status(500);
            res.send({
                error: err
            });
        } else if (submission) {
            //TODO: 
            submission.notebookJSON = JSON.stringify(req.body.submissionData.notebookJSON);
            submission.title = req.body.submissionData.title;
            submission.coAuthors = req.body.submissionData.coAuthors;
            submission.summary = req.body.submissionData.summary;
            submission.lang = req.body.submissionData.lang
            submission.lastUpdated = new Date();

            submission.save((err) => {
                if (err) {
                    res.status(500);
                    res.send({
                        error: err
                    });
                } else {
                    res.sendStatus(200);
                }
            });
        } else {
            res.status(500);
            res.send({
                error: 'Coulnd\'t find submission'
            });
        }
    })
});

app.post('/comment/edit', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Comment
        .findOne({
            _id: req.body.commentID
        }, function (err, comment) {
            if (err) {
                res.status(500);
            } else if (comment) {
                //todo: need to save previous submissions for legal reasons?
                console.log("Edit comment content: ", req.body);
                comment.edited = true;
                comment.content = req.body.newCommentText;
                comment.editedDate = new Date();
                comment.save(function (err, savedComment) {
                    if (err) {
                        res.status(500);
                        res.send({
                            error: err
                        })
                    } else {
                        res.send({
                            comment: savedComment
                        });
                    }
                })
            } else {
                res.status(500);
                res.send({
                    error: "Couldn't find comment"
                });
            }
        })
});

app.post('/comment', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log("Received submit comment: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({
            code: 1,
            message: 'Login Required'
        });
        return;
    }

    var newComment = new Comment();
    newComment.author = req.user._id;
    newComment.timestamp = new Date();
    newComment.content = req.body.content;
    newComment.replies = [];
    newComment.score = 0;
    newComment.flagged = false;
    newComment.deleted = false;
    newComment.edited = false;
    newComment.editedDate = null;
    newComment.submission = req.body.submissionID;

    newComment.save(function (err, c) {
        if (err) {
            res.status(500);
            res.send({
                error: 'Error saving comment'
            });
        } else {
            Submission
                .findOne({
                    _id: req.body.submissionID
                }, function (err, submission) {
                    if (err) {
                        res.status(500);
                        res.send({
                            error: 'Error finding submission'
                        });
                    } else if (submission) {
                        submission
                            .comments
                            .push(c._id);
                        submission.totalComments += 1;
                        submission.save(function (err) {
                            if (err) {
                                res.status(500);
                                res.send({
                                    error: err
                                })
                            } else {
                                console.log("Successfully submitted comment");
                                res.send({
                                    comment: newComment,
                                    submissionID: submission._id,
                                });
                            }
                        })
                    } else {
                        res.status(400);
                        res.send({
                            error: 'No submission found'
                        });
                    }
                });

        }
    })
});

app.post('/reply', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log("Received submit reply: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({
            code: 1,
            message: 'Login Required'
        });
        return;
    }

    var newReply = new Comment();
    newReply.author = req.user._id;
    newReply.timestamp = new Date();
    newReply.content = req.body.reply;
    newReply.replies = [];
    newReply.score = 0;
    newReply.flagged = false;
    newReply.deleted = false;
    newReply.edited = false;
    newReply.editedDate = null;

    newReply.save(function (err, reply) {
        if (err) {
            console.log("Error 1");
            res.status(500);
            res.send({
                error: err
            })
        } else if (reply) {
            Comment.findById(req.body.commentID, function (err, comment) {
                if (err) {
                    // TODO: delete reply
                    console.log("Error 2");
                    res.status(500);
                    res.send({
                        error: err
                    });
                } else if (comment) {
                    comment
                        .replies
                        .push(reply._id);
                    comment.save(function (err) {
                        if (err) {
                            // TODO: delete reply
                            console.log("Error 3");
                            res.status(500);
                            res.send({
                                error: err
                            });
                        } else {
                            Submission
                                .findOne({
                                    _id: comment.submission
                                }, function (err, submission) {
                                    if (err) {
                                        res.status(500);
                                        res.send({
                                            error: err
                                        })
                                    } else if (submission) {
                                        submission.totalComments += 1;
                                        submission.save(function (err) {
                                            if (err) {
                                                //TODO: clean up added documents?
                                                res.status(500);
                                                res.send({
                                                    error: err
                                                });
                                            } else {
                                                console.log("Successfully submitted reply");
                                                res.send({
                                                    commentID: comment._id,
                                                    reply: reply,
                                                    submissionID: submission._id
                                                });
                                            }
                                        });
                                    } else {
                                        res.status(500);
                                        res.send({
                                            error: 'Error finding submission'
                                        });
                                    }
                                });

                        }
                    })
                } else {
                    // TODO: delete reply
                    console.log("Error 4");
                    res.status(500);
                    res.send({
                        error: 'Error finding comment'
                    })
                }
            })
        } else {
            console.log("Error 5");
            res.status(500);
            res.send({
                error: 'Error saving reply'
            });
        }
    });

});

module.exports = app;