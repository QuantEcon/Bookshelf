var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
var series = require('async/series');
var mdb = require('mongodb');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var fs = require('fs');

var app = express.Router();


app.get('/all-submissions', function (req, res) {
    console.log("req.query: ", req.query);
    var searchParams = {};
    if (req.query.lang !== 'All') {
        searchParams.lang = req.query.lang
    }
    if (req.query.topic !== 'All') {
        searchParams.topicList = req.query.topic;
    }
    if (req.query.author) {
        if (req.query.author === 'my-profile') {
            searchParams.author = req.user._id;
        } else {
            searchParams.author = req.query.author;
        }
    }
    var page = req.query.page;
    var select = "_id title author views comments score summary published lang totalComments";

    var options = {
        limit: 10,
        sort: {published: -1},
        page: page,
        select: select
    };

    if (req.query.keywords !== "") {
        console.log("Search has keywords");
        searchParams.$text = {$search: req.query.keywords};
    }

    if (req.query.time) {
        switch (req.query.time) {
            case 'Today':
                var today = new Date();
                //todo: subtract 24 hours, don't just set to 00:00
                today.setHours(today.getHours() - 24);
                searchParams.published = {$gt: today};
                break;
            case 'This month':
                var month = new Date();
                //todo: subtract 30 days, don't just set to 1st
                month.setDate(month.getDate() - 30);
                month.setHours(0, 0, 0, 0);
                searchParams.published = {$gt: month};
                break;
            case 'This year':
                var year = new Date();
                //todo: subtract 365 days, don't just set to Jan 1st
                year.setDate(year.getDate() - 365);
                year.setHours(0, 0, 0, 0);
                searchParams.published = {$gt: year};
                break;
            case 'All time':
                break;
        }
    }
    if (req.query.sortBy) {
        switch (req.query.sortBy) {
            case 'Date':
                break;
            case 'Comments':
                options.sort = {'totalComments': -1, 'published': -1};
                break;
            case 'Trending':
                break;
            case 'Views':
                break;
            case 'Votes':
                options.sort = {'score': -1, 'published': -1};
        }

    }

    // console.log("-----------------------------");
    // console.log("Performing search with: options: ", options);
    // console.log("Performing search with: params: ", searchParams);


    //todo: add select statement to only get required info
    var select = "_id author lang published summary views comments score";
    Submission.paginate(searchParams, options).then(function (result) {
        var submissions = result.docs;
        var err = null;
        if (err) {
            console.log("Error occurred finding submissions");
            res.status(500);
            res.send("Error occurred finding submissions")
        } else {
            //get users
            var authorIds = submissions.map(function (submission) {
                return submission.author;
            });
            User.find({_id: {$in: authorIds}}, 'name avatar _id isAdmin', function (err, authors) {
                if (err) {
                    console.log("Error occurred finding authors");
                    res.status(500);
                    res.send("Error occurred finding authors");
                } else {
                    res.status(200);
                    res.send({
                        submissions: submissions,
                        totalSubmissions: result.total,
                        authors: authors
                    })
                }
            })
        }
    });
});

app.get('/notebook/:nbid', isAuthenticated, function (req, res) {
    // get nb info
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var replyAuthorIDs;

    var notebookID = req.params.nbid;

    //get notebook information
    series({
            //get notebook
            nb: function (callback) {
                var select = "_id title author views comments score summary published lang notebook fileName";
                Submission.findOne({_id: mdb.ObjectId(notebookID), deleted: false}, select, function (err, submission) {
                    if (err) callback(err);
                    else {
                        notebook = submission;
                        callback(null, submission);
                    }
                });
            },
            //get author
            auth: function (callback) {
                var select = "_id avatar name";

                User.findOne({_id: mdb.ObjectId(notebook.author)}, select, function (err, author) {
                    if (err) callback(err);
                    else {
                        callback(null, author);
                    }
                })
            },
            //get co-authors
            coAuth: function (callback) {
                var select = "_id avatar name";
                User.find({_id: {$in: notebook.coAuthors}}, function (err, coAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, coAuthors);
                    }
                })
            },
            //get comments
            coms: function (callback) {
                // todo: add select statement
                Comment.find({_id: {$in: notebook.comments}, deleted: false}, function (err, comments) {
                    if (err) callback(err);
                    else {
                        commentAuthorIDs = comments.map(function (comment) {
                            return comment.author;
                        });
                        replyIDs = comments.map(function (comment) {
                            return comment.replies.map(function (reply) {
                                return reply;
                            });
                        });

                        callback(null, comments)
                    }
                })
            },
            reps: function (callback) {
                //get replies
                // todo: add select statement
                Comment.find({_id: {$in: replyIDs[0]}, deleted: false}, function (err, replies) {
                    if (err) callback(err);
                    else {
                        replyAuthorIDs = replies.map(function (reply) {
                            return reply.author;
                        });
                        callback(null, replies);
                    }
                });
            },
            //get comments/replies authors
            comAuth: function (callback) {
                //only get name, id, and avatar from comment/reply authors
                var select = "_id avatar name";
                var mergedAuthorIDs = [].concat(commentAuthorIDs).concat(replyAuthorIDs);
                User.find({_id: {$in: mergedAuthorIDs}}, select, function (err, commentAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, commentAuthors);
                    }
                });
            }
        },
        //callback
        function (err, results) {
            if (err) {
                if (notebook) {
                    console.log("Server err: ", err);
                    res.render('500');
                } else {
                    console.log("Couldn't find notebook");
                    res.render('404');
                }
            }

            var location = __dirname + notebook.notebook;
            var notebookHTML = fs.readFileSync(location, 'utf8');

            var data = {
                notebook: results.nb,
                notebookHTML: notebookHTML,
                fileName: results.nb.fileName,
                author: results.auth,
                coAuthors: results.coAuth,
                comments: results.coms,
                replies: results.reps,
                commentAuthors: results.comAuth
            };
            // console.log("notebook data: ", data);
            if (req.user) {
                data.currentUser = {
                    _id: req.user._id,
                    upvotes: req.user.upvotes,
                    downvotes: req.user.downvotes
                }
            }
            res.send(data);
        }
    );
});

app.get('/users', function (req, res) {
    console.log("Received user search request: ", req.query);
    var params = {};
    if (req.query._id) {
        if (req.query._id == 'my-profile') {
            params._id = req.user._id;
        } else {
            params._id = req.query._id;
        }
    }

    console.log("Searching users: ", params);

    var select = "_id avatar name summary joinDate facebook.url github.url twitter.url email";

    User.find(params, select, function (err, users) {
        if (err) {
            res.status(500);
        } else {
            res.send(users);
        }
    });
});

module.exports = app;