var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
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

            newSub.topicList = formData.topics;

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

// app.get('/preview', passport.authenticate('jwt', {
//     session: false
// }), function (req, res) {
//     if (req.user._doc.currentSubmission) {
//         res.render('submissionPreview', {
//             layout: 'breadcrumbs',
//             title: req.user._doc.currentSubmission.title,
//             data: {
//                 currentUser: req.user,
//                 submit: true
//             }
//         });
//     } else {
//         res.render('submit', {
//             layout: 'breadcrumbs',
//             title: 'Submission Preview'
//         })
//     }
// });

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

app.get('/confirm', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    User
        .findOne({
            _id: req.user._id
        }, function (err, user) {
            if (err || !user) {
                res.render('500');
            } else if (user) {

                var newSub = new Submission(user.currentSubmission);
                newSub.author = req.user._id;
                newSub.save(function (err) {
                    if (err) {
                        console.log("ERROR SAVING NEW SUB: ", err);
                        res.render('500');
                    } else {
                        user.currentSubmission = null;
                        user
                            .submissions
                            .push(newSub._id);
                        user.save(function (err) {
                            if (err) {
                                console.log("ERROR SAVING USER");
                                res.render('500');
                            } else {
                                //save file in system
                                res.status(200);
                                res.send({id: newSub._doc._id});
                            }
                        })
                    }
                })
            }
        })
});

app.post('/comment/edit/:commentID', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Comment
        .findOne({
            _id: req.params.commentID
        }, function (err, comment) {
            if (err) {
                res.status(500);
            } else if (comment) {
                //todo: need to save previous submissions for legal reasons?
                console.log("Edit comment content: ", req.body);
                comment.edited = true;
                comment.content = req.body.content;
                comment.editedDate = new Date();
                comment.save(function (err) {
                    if (err) {
                        res.status(500);
                    } else {
                        res.send({
                            message: 'Redirect',
                            error: false
                        });
                    }
                })
            } else {
                res.status(500);
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
        } else {
            Submission
                .findOne({
                    _id: req.body.submissionID
                }, function (err, submission) {
                    if (err) {
                        res.status(500);
                    } else if (submission) {
                        submission
                            .comments
                            .push(c._id);
                        submission.totalComments += 1;
                        submission.save(function (err) {
                            if (err) {
                                res.status(500);
                            } else {
                                console.log("Successfully submitted comment");
                                res.send({
                                    comment: newComment,
                                    submissionID: submission._id
                                });
                            }
                        })
                    } else {
                        res.status(400);
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
    newReply.content = req.body.content;
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
        } else if (reply) {
            Comment
                .findOne({
                    _id: req.body.inReplyTo
                }, function (err, comment) {
                    if (err) {
                        // TODO: delete reply
                        console.log("Error 2");
                        res.status(500);
                    } else if (comment) {
                        comment
                            .replies
                            .push(reply._id);
                        comment.save(function (err) {
                            if (err) {
                                // TODO: delete reply
                                console.log("Error 3");
                                res.status(500);
                            } else {
                                Submission
                                    .findOne({
                                        _id: comment.submission
                                    }, function (err, submission) {
                                        if (err) {
                                            res.status(500);
                                        } else if (submission) {
                                            submission.totalComments += 1;
                                            submission.save(function (err) {
                                                if (err) {
                                                    //TODO: clean up added documents?
                                                    res.status(500);
                                                } else {
                                                    console.log("Successfully submitted reply");
                                                    res.send({
                                                        commentID: comment._id,
                                                        reply: newReply,
                                                        submissionID: submission._id
                                                    });
                                                }
                                            });
                                        } else {
                                            res.status(500);
                                        }
                                    });

                            }
                        })
                    } else {
                        // TODO: delete reply
                        console.log("Error 4");
                        res.status(500);
                    }
                })
        } else {
            console.log("Error 5");
            res.status(500);
        }
    });

});

app.post('/file', passport.authenticate('jwt', {
    session: false
}), multipartyMiddleware, function (req, res) {
    var file = req.files.file;
    console.log("Req.body: ", req.body);
    console.log("File name: ", file.name);
    console.log("File type: ", file.type);
    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        if (err || !user) {
            res.render('500');
        } else if (user) {
            var newSub = new Submission();

            console.log("File: ", file);

            newSub.title = req.body.title;

            newSub.topicList = req.body.topicList;

            newSub.lang = req.body.lang;
            newSub.summary = req.body.summary;

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

            newSub.fileName = file.name;

            //=============================================================
            var outputDir = __dirname + '/../../files/html/';
            var fileSaveDir = __dirname + '/../../files/ipynb/';
            var outputName = newSub._id;
            //=============================================================

            var notebookJSON = JSON.parse(fs.readFile(file.path, 'utf8'), function (err) {
                if (err) {
                    res.status(500);
                } else {
                    //save notebookJSON
                    newSub.notebookJSON = notebookJSON;
                    user.currentSubmission = newSub;
                    user.save(function (err) {
                        if (err) {
                            res.status(500);
                        } else {
                            res.status(200);
                            res.send('redirect');
                        }
                    })
                }
            })
        }
    });

});

//todo redirect to submission preview instead of instantly saving it?
app.post('/file/edit/:nbID', passport.authenticate('jwt', {
    session: false
}), multipartyMiddleware, function (req, res) {
    console.log("Got submit edit");
    var file = req.files.file;
    Submission.findOne({
        _id: req.params.nbID
    }, function (err, submission) {
        if (err) {
            console.log("Error 1");
            res.status(500);
            //TODO: return error
        } else if (submission) {
            var notebookJSON = JSON.parse(fs.readFile(file.path, 'utf8'), function (err) {
                if (err) {
                    res.status(500);
                } else {
                    submission.title = req.body.title;
                    submission.topicList = req.body.topicList;
                    submission.lang = req.body.lang;
                    submission.summary = req.body.summary;
                    submission.file = file.name;
                    submission.lastUpdated = new Date();
                    submission.notebookJSON = notebookJSON;
                    submission.save(function (err) {
                        if (err) {
                            console.log('Error saving edited submission');
                            res.status(500);
                        } else {
                            res.send(200);
                        }
                    });
                }
            });

        } else {
            console.log("Error 4");
            res.status(500);
        }
    });
});

module.exports = app;