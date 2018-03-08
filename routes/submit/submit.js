var express = require('express');
var multiparty = require('connect-multiparty');
const passport = require('../../js/auth/jwt');
const bodyParser = require('body-parser');
const multer = require('multer');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

const notificationTypes = require("../../js/notifications").notificationTypes
const sendNotification = require('../../js/notifications').sendNotification

var sprintf = require('sprintf');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var config = require('../../_config')
var renderer = require('../../js/render');

var multipartyMiddleware = multiparty();
const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({
    storage
});

var app = express.Router();

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
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

            newSub.published = Date.now();
            newSub.lastUpdated = Date.now();

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

/**
 * @apiDefine AuthorizationHeader
 * @apiHeader (Headers) {String} authorization Authorization JSON Web Token
 * @apiHeaderExample {json} Header Example:
 *  {
 *      "Authorization": "JWT <web token>"
 *  }
 */

/**
 * @api {post} /api/submit/confirm Notebook
 * @apiGroup Submit
 * @apiName SubmitNotebook
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Creates a new document in the database for the submission
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object}       submission              Object containing the data the user entered in the form
 * @apiParam {String[]}     submission.coAuthors    Array of emails
 * @apiParam {String}       submission.fileName      Name of the ipynb file being submitted
 * @apiParam {String}       submission.lang         Language of the notebook (Python, Julia, Other)
 * @apiParam {String}       submission.summary      Summary of the submission
 * @apiParam {Object}       submission.notebookJSON Raw JSON of the ipynb file
 * @apiParam {String}       submission.title        Title of the submission
 * @apiParam {String[]}     submission.topics       Array of topics from the list of topics on the submit page
 * 
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {String} data.submissionID Database ID of the new submission
 * 
 * @apiError (500) InternalServerError Error occured creating the submission document 
 */
app.post('/confirm', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var newSub = new Submission();
    console.log("[Submit] - confirm. req.body: ", req.body)

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

    newSub.published = Date.now();
    newSub.lastUpdated = Date.now();

    newSub.deleted = false;
    newSub.flagged = false;

    newSub.fileName = req.body.submission.fileName;
    newSub.notebookJSONString = JSON.stringify(req.body.submission.notebookJSON)

    newSub.views = 0
    newSub.viewers = []


    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.err('[Submit] - error finding user: ', err);
            res.status(500);
            res.send({
                error: err
            });
        } else if (user) {
            newSub.save((err, submission) => {
                if (err) {
                    console.err('[Submit] - error saving user: ', err);
                    res.status(500);
                    res.send({
                        error: err
                    });
                } else {
                    // TODO insert pre-render support here========================================
                    if (config.preRender) {
                        renderer.renderHTMLFromJSON(submission.notebookJSONString, submission._id);
                        submission.preRendered = true;
                        submission.save();
                    }
                    // ============================================================================

                    console.log('[Submit] - add to user.submissions: ', submission._id);
                    user.submissions.push(submission._id)
                    user.save((err, savedUser) => {
                        if (err) {
                            console.error('[Submit] - error saving user: ', err);
                        } else {
                            console.log('[Submit] - user saved. Submissions: ', savedUser.submissions)
                            if (savedUser.email && savedUser.emailSettings && savedUser.emailSettings.submission) {
                                //TODO: notify user
                                sendNotification({
                                    type: notificationTypes.SUBMISSION,
                                    recipient: savedUser,
                                    submissionID: submission._id
                                })
                            }
                        }
                    });
                    res.send({
                        submissionID: submission._id
                    });
                }
            })
        } else {
            console.warn('[Submit] - no user was found');
            res.status(500);
            res.send({
                error: 'No user found'
            });
        }
    })
});


/**
 * @api {post} /api/submit/edit-submission Notebook
 * @apiGroup Edit
 * @apiName EditNotebook
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Edits a submission and replaces the data in the database with information provided
 * by the user
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object}       submissionData              Object containing the data the user entered in the form
 * @apiParam {ID}           submissionData._id          ID of the submission being edited
 * @apiParam {String[]}     submissionData.coAuthors    Array of emails
 * @apiParam {String}       submissionData.fileName      Name of the ipynb file being submitted
 * @apiParam {String}       submissionData.lang         Language of the notebook (Python, Julia, Other)
 * @apiParam {String}       submissionData.summary      Summary of the submission
 * @apiParam {Object}       submissionData.notebookJSON Raw JSON of the ipynb file
 * @apiParam {String}       submissionData.title        Title of the submission
 * @apiParam {String[]}     submissionData.topics       Array of topics from the list of topics on the submit page
 * 
 * @apiError (500) InternalServerError Error occured editing the submission document 
 */
app.post('/edit-submission', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Submission.findById(req.body.submissionData._id, (err, submission) => {
        if (err) {
            res.status(500);
            console.log("Error finding submission: ", err);
            res.send({
                error: err
            });
        } else if (submission) {
            //TODO: 
            submission.notebookJSONString = JSON.stringify(req.body.submissionData.notebookJSON);
            // TODO insert pre-render support here========================================
            if (config.preRender) {
                console.log("Pre-rendering submission...");
                var filePath = renderer.renderHTMLFromJSON(submission.notebookJSON, submission._id);
                submission.htmlFilePath = filePath;
                submission.save();
            }
            // ============================================================================
            submission.title = req.body.submissionData.title;
            submission.coAuthors = req.body.submissionData.coAuthors;
            submission.summary = req.body.submissionData.summary;
            submission.lang = req.body.submissionData.lang
            submission.lastUpdated = Date.now();
            submission.topics = req.body.submissionData.topics
            if(req.body.submissionData.fileName) {
                submission.fileName = req.body.submissionData.fileName
            }
            submission.save((err) => {
                if (err) {
                    console.log('Error saving submission: ', err)
                    res.status(500);
                    res.send({
                        error: err
                    });
                } else {
                    console.log('Submission saved!')
                    res.sendStatus(200);
                }
            });
        } else {
            console.log("Couldn't find submission");
            res.status(500);
            res.send({
                error: 'Coulnd\'t find submission'
            });
        }
    })
});

/**
 * @api {post} /api/submit/comment/edit Comment
 * @apiGroup Edit
 * @apiName EditComment
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Edits a comment and replaces the data in the database with the information provided 
 * by the user. A valid JSON Web Token must be supplied in the "Authorization" header. The user ID of the
 * token must match the comment.author.
 * 
 * Note: This endpoint is also used to edit replies, as there is virtualy no difference between a reply
 * and a comment
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {ID}       commentID       ID of the comment being edited
 * @apiParam {String}   newCommentText  Edited text of the comment
 * 
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Object} data.comment The saved comment database object
 * 
 * @apiError (500) InternalServerError Error occurred finding, editing, or saving the comment
 */
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
                comment.editedDate = Date.now()
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

/**
 * @api {post} /api/submit/comment Comment
 * @apiGroup Submit
 * @apiName SubmitComment
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Creates a new comment object in the database for the reply
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {String}   content         Content of the new comment
 * @apiParam {ID}       submissionID    ID of the submission being commented on
 * 
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Object} data.comment      The new comment database object
 * @apiSuccess (200) {ID}     data.submissionID The ID of the submission being commented on
 * 
 * @apiError (500) InternalServerError Error occurred finding, editing, or saving the comment
 */
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
    newComment.timestamp = Date.now();
    newComment.content = req.body.content;
    newComment.replies = [];
    newComment.score = 0;
    newComment.flagged = false;
    newComment.deleted = false;
    newComment.edited = false;
    newComment.editedDate = null;
    newComment.submission = req.body.submissionID;

    newComment.save(function (err, comment) {
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
                            .push(comment._id);
                        submission.totalComments += 1;

                        submission.save(function (err) {
                            if (err) {
                                res.status(500);
                                res.send({
                                    error: err
                                })
                            } else {
                                console.log("Successfully submitted comment");

                                User.findById(submission.author, (err, author) => {
                                    if (err) {
                                        console.error("[Submit] - Error finding author of submission for notification")
                                    } else if (author) {
                                        if (author._id != comment.author && author.email && author.emailSettings && author.emailSettings.newComment) {
                                            const notification = {
                                                type: notificationTypes.NEW_COMMENT,
                                                recipient: author,
                                                comment,
                                                submissionID: submission._id
                                            }

                                            sendNotification(notification)
                                        }
                                    }
                                })

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

/**
 * @api {post} /api/submit/reply Reply
 * @apiGroup Submit
 * @apiName SubmitReply
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Creates a new comment object in the database
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {String}   reply       Content of the reply
 * @apiParam {ID}       commentID   ID of the comment being replied to
 * 
 * @apiSuccess (200) {Object}   data
 * @apiSuccess (200) {ID}       data.commentID      ID of the comment being replied to
 * @apiSuccess (200) {Object}   data.reply          New comment database object for the reply
 * @apiSuccess (200) {ID}       data.submissionID   ID of the submission
 * 
 * @apiError (500) InternalServerError An error occurred finding, creating, saving the reply object
 */
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
    newReply.timestamp = Date.now();
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
                                                // Notify author of comment
                                                User.findById(comment.author, (err, author) => {
                                                    if (err) {
                                                        console.error("[Submit] - error finding author for notification: ", err)
                                                    } else if (author){
                                                        if (author._id != reply.author && author.email && author.emailSettings && author.emailSettings.newComment) {
                                                            const notification = {
                                                                type: notificationTypes.NEW_REPLY,
                                                                recipient: author,
                                                                submissionID: submission._id,
                                                                commentID: comment._id
                                                            }
                                                            sendNotification(notification)
                                                        }
                                                    } else {
                                                        console.warn("[Submit] - couldn't find author of comment for notifications")
                                                    }
                                                    
                                                })
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