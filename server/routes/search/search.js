var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
var series = require('async/series');
var mdb = require('mongodb');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var fs = require('fs');
var path = require('path');

var app = express.Router();

var config = require('../../_config');

/**
 * @api {get} /api/search/all-submissions Get Submissions
 * @apiGroup Search
 * @apiname GetSubmissions
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Queries the database for all submissions matching the parameters
 *
 * @apiParam {string}   lang        language of the notebook (Python, Julia, Other).
 * @apiParam {string}   topic       topic of the notebook. Given by the list of topics in the submission page.
 * @apiParam {id}       author      database id of the author.
 * @apiParam {string}   time        time of the submit date (Today, This month, This year, All time).
 * @apiParam {string}   keywords    string of keywords to check against the submission summary.
 * @apiParam {num}      page        used for pagination. Searches for the current page number.
 * @apiParam {string}   sortBy      attribute to sort by (Votes, Comments, Views, Trending, Date).
 *
 * @apiSuccess (200) {Object[]}    submissions         array of submission database objects.
 * @apiSuccess (200) {Number}       totalSubmissions    the number of submissions found.
 * @apiSuccess (200) {Object[]}     authors             the author database objects for each submission.
 */
app.get('/all-submissions', function (req, res) {
    var searchParams = {
        deleted: false
    };
    if (req.query.lang !== 'All') {
        searchParams.lang = req.query.lang
    }
    if (req.query.topic !== 'All') {
        console.log('[Search] - topic: ', req.query.topic)
        searchParams.topics = req.query.topic;
    }
    if (req.query.author) {
        if (req.query.author === 'my-profile') {
            searchParams.author = req.user._id;
        } else {
            searchParams.author = req.query.author;
        }
    }
    var page = req.query.page;
    var select = "_id title author views comments score summary published lang totalComments viewers flagged";

    var options = {
        limit: 10,
        sort: {
            published: -1
        },
        page: page,
        select: select
    };

    if (req.query.keywords !== "") {
        console.log('[Search] - has keywords: ', req.query.keywords)
        searchParams.$text = {
            $search: req.query.keywords
        };
    }

    if (req.query.time) {
        switch (req.query.time) {
            case 'Today':
                var today = new Date();
                //todo: subtract 24 hours, don't just set to 00:00
                today.setHours(today.getHours() - 24);
                searchParams.published = {
                    $gt: today
                };
                break;
            case 'This month':
                var month = new Date();
                //todo: subtract 30 days, don't just set to 1st
                month.setDate(month.getDate() - 30);
                month.setHours(0, 0, 0, 0);
                searchParams.published = {
                    $gt: month
                };
                break;
            case 'This year':
                var year = new Date();
                //todo: subtract 365 days, don't just set to Jan 1st
                year.setDate(year.getDate() - 365);
                year.setHours(0, 0, 0, 0);
                searchParams.published = {
                    $gt: year
                };
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
                options.sort = {
                    'totalComments': -1,
                    'published': -1
                };
                break;
            case 'Trending':
                break;
            case 'Views':
                console.log("Sort by views")
                options.sort = {
                    'viewers': -1,
                    'published': -1
                }
                break;
            case 'Votes':
                options.sort = {
                    'score': -1,
                    'published': -1
                };
        }

    }

    //todo: add select statement to only get required info
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
            User.find({
                _id: {
                    $in: authorIds
                }
            }, 'name avatar _id', function (err, authors) {
                if (err) {
                    console.log("Error occurred finding authors");
                    res.status(500);
                    res.send("Error occurred finding authors");
                } else {
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



/* get a list of users for co-Author list */

app.get('/userList', (req, res) => {
    var err = null;
    var select = "_id avatar name joinDate";
    if (err) {
        res.status(500);
        res.send({
            error: err
        });
    } else {
        User.find({},select, function(err, users) {

        var userMap = {};
        console.log(req.query._id);

        users.forEach(function(user) {
            if (user._id != req.query._id ) {
                userMap[user._id] = user;

            }


        });

        res.send(userMap);
      });
    }
});

/**
 * @api {get} /api/search/notebook/:nbid Get Submission
 * @apiGroup Search
 * @apiName GetSubmission
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {string} nbID the id of the submission being searched for.
 *
 * @apiDescription If the nbid matches one of the objects in the database, and object will be sent
 * back
 *
 * Note: the authors' objects will only contain the necessary data to display a summary -
 * avatar, name and author id
 *
 * If there is a current user supplied in the req.currentUser, then a data.user object will be appended to
 * the reponse
 *
 * @apiSuccess (200) {Object}   data                The data for the submission
 * @apiSuccess (200) {Object}   data.notebook       the notebook object from the database.
 * @apiSuccess (200) {String}   data.html           the pre-rendered notebook html (if pre-rendering was enabled).
 * @apiSuccess (200) {Object}   data.notebookJSON   the raw JSON of the ipynb file.
 * @apiSuccess (200) {String}   data.fileName        the original filename of the notebook.
 * @apiSuccess (200) {ID}       data.author         the author's user database object.
 * @apiSuccess (200) {Object[]} data.coAuthors      an array of email adresses and/or user objects.
 * @apiSuccess (200) {Object[]} data.comments       an array of comment database objects for the sumbission.
 * @apiSuccess (200) {Object[]} data.replies        an array of comment database ojects for the submission.
 * @apiSuccess (200) {Object[]} data.commentAuthors an array of user database objects for each author of a comment/reply.
 * @apiSuccess (200) {Object}   data.user           An object of the current user's data (if any)
 * @apiSuccess (200) {ID}       data.user._id       ID of the current user
 * @apiSuccess (200) {ID[]}     data.user.upvotes   Array of object id's representing the user's upvotes
 * @apiSuccess (200) {ID[]}     data.user.downvotes Array of object id's representing the user's downvotes
 *
 * @apiError (404) NotebookNotFound No notebook was found with matching id
 * @apiError (500) InternalServerError An error occurred searching the database for relevant data
 */
app.get('/notebook/:nbid', isAuthenticated, function (req, res) {
    // get nb info
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var mergedReplyIDs;
    var replyAuthorIDs;
    var coAuthorIds;

    var notebookID = req.params.nbid;

    //get notebook information
    series({
            //get notebook
            nb: function (callback) {

                var select = "_id title author views comments score summary topics published lang fileName viewers views coAuthors notebookJSONString";
                try {
                    Submission.findOne({
                        _id: mdb.ObjectId(notebookID),
                        deleted: false
                    }, select, function (err, submission) {
                        if (err) {
                            console.log("[Search] error searching for submission: ", err)
                            callback(err)
                        } else if (submission) {
                            notebook = submission
                            notebook.nbLength = submission.notebookJSONString.length
                            //TODO: This needs to be tested
                            //Increment total number of views
                            submission.views++;
                            coAuthorIds = submission.coAuthors
                            // TODO: This needs to be tested
                            //If there is a user, and he/she hasn't viewed this notebook before, add user._id to submission.viewers
                            var totalComments = submission.comments.length
                            console.log("comments.length: ", totalComments)
                            Comment.find({"_id": {"$in": submission.comments}}, (err, comments) => {
                                if(err){
                                    console.error("Error getting comments: ", err)
                                } else if(comments){
                                    comments.forEach((comment) => {
                                        console.log("replies: ", comment.replies)
                                        totalComments += comment.replies.length
                                        console.log("total comments now at ", totalComments)
                                    })
                                    console.log("total comments: ", totalComments)
                                    submission.totalComments = totalComments
                                    submission.save()
                                }
                            })


                            if(!submission.viewers){
                                console.log("No viewers")
                                submission.viewers = []
                            }
                            if (req.user && submission.viewers.indexOf(req.user._id) == -1) {
                                submission.viewers.push(req.user._id)
                            }
                            // Check if has been preRendered and we want to send the pre-rendered notebook
                            if (submission.preRendered && config.preRender) {
                                // Get html from preRendered file
                                var fileName = config.rootDirectory + config.filesDirectory + '/' + submission._id + '.html'
                                console.log('File path: ', fileName);
                                try {
                                    notebook.html = fs.readFileSync(fileName).toString();
                                } catch (ex) {
                                    console.warn('Error: ', ex, "\nDoes that file exist?")
                                }

                            } else {
                                // TODO: Submission hasn't already been pre-rendered, but we want it to be
                                // Render and save html now
                                if (config.preRender) {

                                }
                            }
                            submission.save((err) => {
                                console.log('[Search] - typeof notebookJSON: ', typeof (notebook.notebookJSON));
                                callback(null, notebook);
                            })
                            // notebook.notebookJSONString = null;
                        } else {
                            console.log('submission not found');
                            callback('Not found', null);
                        }
                    });
                } catch (err) {
                    console.log("[Search] submission not found")
                    callback("Not found", null)
                }
            },
            //get author
            auth: function (callback) {
                var select = "_id avatar name";

                User.findOne({
                    _id: mdb.ObjectId(notebook.author)
                }, select, function (err, author) {
                    if (err) callback(err);
                    else {
                        console.log("[Search] - found author: ", author)
                        callback(null, author);
                    }
                })
            },
            //get comments
            coms: function (callback) {
                // todo: add select statement
                Comment.find({
                    _id: {
                        $in: notebook.comments
                    },
                    deleted: false
                }, function (err, comments) {
                    if (err) callback(err);
                    else {
                        commentAuthorIDs = comments.map(function (comment) {
                            return comment.author;
                        });
                        replyIDs = comments.map(function (comment) {
                            return comment.replies.map(function (reply) {
                                console.log('\tReply: ', reply);
                                return reply;
                            });
                        });
                        mergedReplyIDs = [].concat.apply([], replyIDs);

                        callback(null, comments)
                    }
                })
            },
            reps: function (callback) {
                //get replies
                //TODO: add select statement
                Comment.find({
                    _id: {
                        $in: mergedReplyIDs
                    },
                    deleted: false
                }, function (err, replies) {
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
                User.find({
                    _id: {
                        $in: mergedAuthorIDs
                    }
                }, select, function (err, commentAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, commentAuthors);
                    }
                });
            },
            coAuth: (callback) => {
                var select = "_id avatar name";
                User.find({
                    _id: {
                        $in: coAuthorIds
                    },
                    deleted: false
                }, (err, coAuthors) => {
                    if(err) callback(err)
                    else {
                        callback(null, coAuthors)
                    }
                })
              }
        },
        //callback
        function (err, results) {
            // console.log("[Search] results: ", results)
            if (err) {
                if (notebook) {
                    console.log("Server err: ", err);
                    res.sendStatus('500');
                } else {
                    console.log("Couldn't find notebook");
                    res.sendStatus('404');
                    return;
                }
            }

            var nb = JSON.parse(JSON.stringify(results.nb))
            nb.notebookJSONString = null
            var data = {
                notebook: nb,
                html: results.nb.html,
                fileName: results.nb.fileName,
                author: results.auth,
                coAuthors: results.coAuth,
                comments: results.coms,
                replies: results.reps,
                commentAuthors: results.comAuth,
                nbLength: results.nb.nbLength
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

app.get('/notebook_json/:nbid', function(req, res) {
    var select = "notebookJSONString"

    Submission.findById(req.params.nbid, select, (err, submission) => {
        if(err) {
            console.warn("[Search-SubmissionJSON] - Error searching for notebook json: ", err)
            res.sendStatus(500)
        } else if(submission){
            const json = JSON.parse(submission.notebookJSONString)
            res.set('content-length', submission.notebookJSONString.length)
            res.send({
                json,
            })
        } else {
            res.sendStatus(404)
        }
    })

})


/**
 * @api {get} /api/search/users Get Users
 * @apiGroup Search
 * @apiName GetUsers
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Queries the database for a user with the matching _id from req.query.
 *
 * If no user is found with a matching id or if no id was supplied in the request,
 * a 404 will be returned.
 *
 * If a user is found with a matching id, an object will be returned
 *
 * @apiParam {string} _id Database id of the user being search for.
 *
 * @apiSuccess (200) {Object[]} users            Array of matching user objects.
 * @apiSuccess (200) {String} users._id          database id of the user.
 * @apiSuccess (200) {String} users.name         name of the user.
 * @apiSuccess (200) {String} users.avatar       url to user's avatar.
 * @apiSuccess (200) {String} users.email        user's email address.
 * @apiSuccess (200) {String} users.joinDate     date the user joined Bookshelf.
 * @apiSuccess (200) {Boolean} users.oneSocial   boolean flag if the user as only authenticated one social account.
 * @apiSuccess (200) {ID[]} users.submissions    array of submission id's.
 *
 * @apiError (404) UserNotFound No user was found with matching id
 *
 * @apiError (500) InternalServerError an error occured querying the database
 */
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

    var select = "_id avatar name summary joinDate fb.url github.url twitter.url email oneSocial submissions";

    User.find(params, select, function (err, users) {
        if (err) {
            res.status(500);
        } else {
            res.send(users);
        }
    });
});


module.exports = app;
