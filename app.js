/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
var express = require('express');
var fs = require("fs");
var hbs = require('handlebars');
var mdb = require('mongodb');
var handlebars = require('express-handlebars').create(
    {
        defaultLayout: 'main',
        helpers: {
            subSummary: function (submission, users) {
                var partial = hbs.compile(fs.readFileSync(__dirname + "/views/partials/summary.handlebars", 'utf8'));
                var user = users.filter(function (e) {
                    return (e._id.equals(submission.author));
                })[0];
                var info = {
                    submissionID: submission._id,
                    title: submission.title,
                    authorID: submission.author,
                    authorName: user.name,
                    language: submission.language,
                    summary: submission.summary,
                    // authorPic: user.avatar,
                    views: submission.views,
                    numComments: submission.comments.length,
                    votes: submission.votes
                };
                var res = partial(info);
                return new hbs.SafeString(res);
            },
            comment: function (comment, replies, users) {
                var partial = hbs.compile(fs.readFileSync(__dirname + "/views/partials/comment.handlebars", 'utf8'));
                var author = users.filter(function (user) {
                    return user._id.equals(comment.author);
                })[0];
                var data = {
                    author: {
                        _id: comment.author,
                        avatar: author.avatar,
                        name: author.name
                    },
                    comment: {
                        content: comment.content,
                        timestamp: comment.timestamp,
                        score: comment.score
                    }
                };

                return new hbs.SafeString(partial(data));
            },
            reply: function (replyID, replies, users) {
                var partial = hbs.compile(fs.readFileSync(__dirname + '/views/partials/reply.handlebars', 'utf8'));
                var reply = replies.filter(function (r) {
                    return r._id.equals(replyID);
                })[0];
                var author = users.filter(function (user) {
                    return user._id.equals(reply.author);
                })[0];

                var data = {
                    author: {
                        _id: reply.author,
                        avatar: author.avatar,
                        name: author.name
                    },
                    comment: {
                        content: reply.content,
                        timestamp: reply.timestamp,
                        score: reply.score
                    }
                };

                return new hbs.SafeString(partial(data));
            }
        }
    });


var db = require('./js/db');
var port = 8080;

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(function (req, res, next) {
    console.log("Looking for URL : " + req.url);
    next();
});

// routes
app.get('/', function (req, res) {
    db.getSubmission({'deleted': false}).then(function (result) {
        db.getUser({}).then(function (userResult) {
            var data = {
                n: result,
                u: userResult
            };
            res.render('home', {
                data: data,
                numSubmissions: result.length
            });
        });

    });
});

app.get('/notebook/:nbID', function (req, res) {
    db.getSubmission({_id: new mdb.ObjectID(req.params.nbID)}).then(function (result) {
        if (result.length) {
            db.getUser({_id: new mdb.ObjectID(result[0].author)}).then(function (userResult) {
                //get co-authors
                db.getUser({_id: {$in: result[0].coAuthors}}).then(function (coAuthorResult) {
                    //get all comments
                    var comments = result[0].comments.map(function (a) {
                        return a;
                    });
                    db.getComment({_id: {$in: comments}}).then(function (commentsResult) {
                        //get all replies
                        var replyIDs = commentsResult.map(function (comment) {
                            return comment.replies.map(function (reply) {
                                return reply;
                            });
                        });
                        var mergedReplies = [].concat.apply([], replyIDs);
                        db.getComment({_id: {$in: mergedReplies}}).then(function (replyResult) {
                            //get users from comments
                            var commentUsers = commentsResult.map(function (comment) {
                                return comment.author;
                            });
                            var replyUsers = replyResult.map(function (reply) {
                                return reply.author;
                            });

                            var mergedUsers = [].concat(commentUsers).concat(replyUsers);

                            db.getUser({_id: {$in: mergedUsers}}).then(function (getAllResult) {
                                //set up data object
                                var data = {
                                    n: result[0],
                                    u: userResult[0],
                                    coAuthors: coAuthorResult,
                                    comments: commentsResult,
                                    replies: replyResult,
                                    commentUsers: getAllResult,
                                    showNotebook: true
                                };
                                console.log("DATA: \n",data);
                                // render page
                                res.render('submission', {
                                    data: data,
                                    layout: 'submission',
                                    title: result[0].title
                                })
                            });
                        });
                    });
                });
            });
        } else {
            //trigger 404
            res.status(404);
            res.render('404');
        }
    });
});

app.use(express.static(__dirname + "/public"));


app.use(function (req, res) {
    res.contentType('text/html');
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// start server
app.listen(port, function () {
    console.log("Server listening on port %d", port);
    db.initConnection(function () {
    });

});