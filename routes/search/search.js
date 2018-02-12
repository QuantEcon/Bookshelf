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

/*
    Query the url with the following parameters
    {
        lang: 'language the notebook is in'
        topic: 'topic of the notebook'
        author: 'id of author of notebook'
        time: 'time filter'
        keywords: 'string of key words to search for'
        page: 'current page # to search for'
        sortBy: 'sorting by characteristic'
    }
*/

/**
 * Endpoint: /api/search/all-submissions
 * 
 * Queries the database for all submissions matching the parameters:
 *  lang: language of the notebook (Python, Julia, Other)
 *  topic: topic of the notebook. Given by the list of topics in the submission page
 *  author: database id of the author
 *  time: time of the submit date (Today, This month, This year, All time)
 *  keywords: string of keywords to check against the submission summary
 *  page: used for pagination. Searches for the current page number
 *  sortBy: attribute to sort by (Votes, Comments, Views, Trending, Date)
 * 
 * If any submissions match the criteria, then an object will be sent back following
 * this pattern: 
 * {
 *      submissions: array of submission database objects,
 *      totalSubmissions: the number of submissions found,
 *      authors: the author database objects for each submission
 * }
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
    var select = "_id title author views comments score summary published lang totalComments viewers";

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

/**
 * Endpoint: /api/search/notebook/:nbid
 * 
 * The 'nbid' in the url is the database id of the notebook being searched for
 * 
 * If the nbid matches one of the objects in the database, and object will be sent
 * back following this pattern:
 * data = {
 *    notebook: the notebook object from the database,
 *    html: the pre-rendered notebook html (if pre-rendering was enabled),
 *    notebookJSON: the raw JSON of the ipynb file,
 *    fileName: the original filename of the notebook,
 *    author: the author's user database object,
 *    coAuthors: an array of email adresses and/or user object id's,
 *    comments: an array of comment database objects for the sumbission,
 *    replies: an array of comment dtabase ojects for the submission,
 *    commentAuthors: an array of user database objects for each author of a comment/reply
 * };
 * 
 * Note: the authors' objects will only contain the necessary data to display a summary - 
 * avatar, name and author id
 * 
 * If the req has a current user then data.user will be appeneded:
 * data.user = {
 *      _id: id of the current user
 *      upvotes: array of id's of objects the current user has upvoted (submissions, comments/replies)
 *      downvotes: array of id's of objects the current user has downvoted (submissions, comments/replies)
 * }
 * 
 * If no notebook was found with a matching id, then a 404 will be returned
 */
app.get('/notebook/:nbid', isAuthenticated, function (req, res) {
    // get nb info
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var mergedReplyIDs;
    var replyAuthorIDs;

    var notebookID = req.params.nbid;

    //get notebook information
    series({
            //get notebook
            nb: function (callback) {
                var select = "_id title author views comments score summary topics published lang fileName notebookJSONString preRendered viewers views";
                try {
                    Submission.findOne({
                        _id: mdb.ObjectId(notebookID),
                        deleted: false
                    }, select, function (err, submission) {
                        if (err) {
                            console.log("[Search] error searching for submission: ", err)
                            callback(err)
                        } else if (submission) {
                            console.log("[Search] - found submission")
                            console.log("[Seach] - submission author: ", submission.author)
                            notebook = submission
                            console.log("[Search] - copied submission. author: ", notebook.author)
                            // console.log("[Search] - copied submission:" , notebook)
                            notebook.notebookJSON = JSON.parse(submission.notebookJSONString);
                            //TODO: This needs to be tested
                            //Increment total number of views
                            submission.views++;
                            // TODO: This needs to be tested
                            //If there is a user, and he/she hasn't viewed this notebook before, add user._id to submission.viewers
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
            //get co-authors
            coAuth: function (callback) {
                var select = "_id avatar name";
                User.find({
                    _id: {
                        $in: notebook.coAuthors
                    }
                }, function (err, coAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, coAuthors);
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

            var location = __dirname + notebook.notebook;
            // var notebookHTML = fs.readFileSync(path.resolve(location), 'utf8');
            //TODO: refactor to store JSON on submission then send that

            var nb = JSON.parse(JSON.stringify(results.nb))
            nb.notebookJSONString = null
            var data = {
                notebook: nb,
                html: results.nb.html,
                notebookJSON: results.nb.notebookJSON,
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


/**
 * Endpoint: /api/search/users/?_id=
 * 
 * Queries the database for a user with the matching _id from req.query.
 * 
 * If no user is found with a matching id or if no id was supplied in the request,
 * a 404 will be returned.
 * 
 * If a user is found with a matching id, an object will be returned: 
 * data = {
 *      _id: database id of the user,
 *      name: name of the user,
 *      avatar: url to user's avatar,
 *      email: user's email address,
 *      joinDate: date the user joined Bookshelf
 *      oneSocial: boolean flag if the user as only authenticated one social account,
 *      submissions: array of submission id's
 * }
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