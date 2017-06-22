/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
// modules ===============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var mdb = require('mongodb');
var fuzzyTime = require('fuzzy-time');
var series = require('async/series');
var waterfall = require('async/waterfall');
var asyncApply = require('async/apply');
var exec = require('child_process').exec;
var sprintf = require('sprintf');

// passport modules
var passport = require('passport');
var passportInit = require('./js/auth/init');
//todo: export all routes into separate files
require('./js/auth/facebook');
require('./js/auth/twitter');
require('./js/auth/github');
require('./js/auth/google');
// var logout = require('express-passport-logout');

var session = require('express-session');

//file uploads
var multiparty = require('connect-multiparty');

//db
var mongoose = require('./js/db/mongoose');
// db Models ================
var User = require('./js/db/models/User');
var Submission = require('./js/db/models/Submission');
var Comment = require('./js/db/models/Comment');

// config ================================================================================
var port = require('./_config').port;
console.log('Port: ', port);

// template engine
var hbs = require('express-handlebars').create(
    {
        defaultLayout: 'mainLayout',
        helpers: {
            subSummary: function (submission, users) {
                var partial = hbs.handlebars.compile(fs.readFileSync(__dirname + "/views/partials/summary.handlebars", 'utf8'));
                var user = users.filter(function (e) {
                    return (e._id.equals(submission.author));
                })[0];

                var fTime = fuzzyTime(submission.published);
                var info = {
                    submissionID: submission._id,
                    title: submission.title,
                    authorID: submission.author,
                    authorName: user.name,
                    language: submission.language,
                    summary: submission.summary,
                    timestamp: fTime,
                    authorPic: user.avatar,
                    views: submission.views,
                    numComments: submission.comments.length,
                    votes: submission.score
                };
                return new hbs.handlebars.SafeString(partial(info));
            },
            comment: function (comment, replies, users) {
                var partial = hbs.handlebars.compile(fs.readFileSync(__dirname + "/views/partials/comment.handlebars", 'utf8'));
                var author = users.filter(function (user) {
                    return user._id.equals(comment.author);
                })[0];
                var fTime = fuzzyTime(comment.timestamp);
                var data = {
                    author: {
                        _id: comment.author,
                        avatar: "/assets/img/avatar/8.png",
                        name: author.name
                    },
                    comment: {
                        content: comment.content,
                        timestamp: fTime,
                        score: comment.score,
                        id: comment._id
                    }
                };

                return new hbs.handlebars.SafeString(partial(data));
            }
            ,
            reply: function (replyID, replies, users) {
                var partial = hbs.handlebars.compile(fs.readFileSync(__dirname + '/views/partials/reply.handlebars', 'utf8'));
                var reply = replies.filter(function (r) {
                    return r._id.equals(replyID);
                })[0];
                var author = users.filter(function (user) {
                    return user._id.equals(reply.author);
                })[0];
                var fTime = fuzzyTime(reply.timestamp);
                var data = {
                    author: {
                        _id: reply.author,
                        avatar: author.avatar,
                        name: author.name
                    },
                    comment: {
                        content: reply.content,
                        timestamp: fTime,
                        score: reply.score,
                        id: replyID
                    }
                };

                return new hbs.handlebars.SafeString(partial(data));
            }
        }
    })
;

var app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set location of assets
app.use(express.static(__dirname + "/public"));

// middleware ============================================================
// todo: loading screen?
var multipartyMiddleware = multiparty();

app.use(function (req, res, next) {
    // console.log("Looking for URL : " + req.url);
    next();
});

app.use(session({
    secret: 'banana horse',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport setup =========================================================================
passportInit();

//this isn't working...runs asynchronous
function getNBInfo(notebookID) {
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var replyAuthorIDs;

    waterfall({
            //get notebook
            nb: function (callback) {
                var nbID = notebookID;
                Submission.find({_id: notebookID, deleted: false}, function (err, submission) {
                    if (err) callback(err);
                    else {
                        notebook = submission;
                        callback(null, submission);
                    }
                });
            },
            //get author
            auth: function (callback) {
                User.find({_id: notebook.author}, function (err, author) {
                    if (err) callback(err);
                    else {
                        callback(null, author);
                    }
                })
            },
            //get co-authors
            coAuth: function (callback) {
                User.find({_id: {$in: notebook.coAuthors}}, function (err, coAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, coAuthors);
                    }
                })
            },
            //get comments
            coms: function (callback) {
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
                Comment.find({_id: {$in: replyIDs}, deleted: false}, function (err, replies) {
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
                var mergedAuthorIDs = [].concat(commentAuthorIDs).concat(replyAuthorIDs);
                User.find({_id: {$in: mergedAuthorIDs}}, function (err, commentAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, commentAuthors);
                    }
                });
            }
        },
        //callback
        function (err, results) {
            console.log("Got to callback");
            if (err) {
                if (notebook) {
                    return null;
                } else {
                    return 404;
                }
            }
            var fTime = fuzzyTime(results.nb.published);
            return {
                n: results.nb,
                u: results.auth,
                coAuthors: results.coAuth,
                comments: results.comments,
                replies: results.reps,
                numTotalComments: results.comments.length + results.replies.length,
                commentUsers: commentAuthorIDs,
                showNotebook: true,
                fuzzyTime: fTime
            }
        }
    );
}

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //not authenticated
        if (/^\/user\/my-profile/.test(req.url)) {
            res.redirect('/login');
        }
        else {
            return next();
        }
    }
};

// routes =================================================================
// GET ========================================
app.get('/', isAuthenticated, function (req, res) {
    Submission.find({deleted: false}, function (err, submissions) {
        User.find({deleted: false}, function (err, users) {
            var data = {
                n: submissions,
                u: users,
                currentUser: req.user
            };
            res.render('home', {
                data: data,
                title: 'QuantEconLib',
                numSubmissions: submissions.length
            })
        });
    });
});

app.get('/search/all-submissions', function (req, res) {
    console.log("req.query: ", req.query);
    var searchParams = {};
    //todo: implement sorting and pagination
    if (req.query.language !== 'All') {
        searchParams.language = req.query.language
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
    //todo: get page from search query
    var page = req.query.page;
    var select = "_id title author views comments score summary published language totalComments";

    var options = {
        limit: 10,
        sort: {published: -1},
        page: page,
        select: select
    };

    if (req.query.time) {
        //todo: restrict by time
        switch (req.query.time) {
            case 'Today':
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                searchParams.published = {$gt: today};
                break;
            case 'This month':
                var month = new Date();
                month.setDate(1);
                month.setHours(0, 0, 0, 0);
                searchParams.published = {$gt: month};
                break;
            case 'This year':
                var year = new Date();
                year.setMonth(1);
                year.setDate(1);
                year.setHours(0, 0, 0, 0);
                searchParams.published = {$gt: year};
                break;
            case 'All time':
                break;
        }
    }
    if (req.query.sortBy) {
        //todo: sort by sortBy
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

    console.log("-----------------------------");
    console.log("Performing search with: options: ", options);
    console.log("Performing search with: params: ", searchParams);


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

app.get('/search/notebook/:nbid', isAuthenticated, function (req, res) {
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
                var select = "_id title author views comments score summary published language notebook";
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
            //todo: only get name, id, and avatar from comment/reply authors
            //get comments
            coms: function (callback) {
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

            var data = {
                notebook: results.nb,
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

app.get('/search/users', function (req, res) {
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

app.get('/notebook/current-submission', isAuthenticated, function (req, res) {
    if (req.user) {
        User.findOne({_id: req.user._id}, '', function (err, user) {
            if (err) {
                console.log("Error getting current submission: ", err);
                res.render('500');
            } else if (user) {
                if (user.currentSubmission) {
                    var data = {
                        author: user,
                        notebook: user.currentSubmission,
                        currentUser: user
                    };
                    res.send(data);
                } else {
                    res.redirect('/submit');
                }
            } else {
                res.render('404');
            }
        });
    } else {
        res.redirect('/login');
    }
});

// notebook pages ==========================================================================
app.get('/notebook/:nbID/edit', isAuthenticated, function (req, res) {
    console.log("Got notebook edit");
    if (req.user) {
        res.render('submit', {
            title: 'Edit Notebook',
            data: {
                currentUser: req.user
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/notebook/:nbID', isAuthenticated, function (req, res) {

    Submission.findOne({_id: req.params.nbID}, function (err, submission) {
        if (err) {
            res.render('500');
        } else if (submission) {
            if (req.user) {
                var data = {};
                data.currentUser = req.user;
                res.render('submission', {
                    submission: submission,
                    layout: 'breadcrumbs',
                    title: submission.title,
                    data: data
                });
            } else {
                res.render('submission', {
                    submission: submission,
                    layout: 'breadcrumbs',
                    title: submission.title
                });
            }

        } else {
            res.render('404');
        }
    });

});

// user pages ==============================================================================
app.get('/user/my-profile/edit', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    res.render('edit-profile', {
        data: {
            user: req.user,
            currentUser: req.user,
            userAr: [req.user]
        },
        layout: 'breadcrumbs',
        title: 'Edit Profile'
    })
});

app.get('/user/my-profile', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    Submission.find({_id: {$in: req.user.submissions}, deleted: false}, function (err, submissions) {
        if (err) {
            res.render('500');
        } else {
            res.render('user', {
                title: 'My Profile',
                data: {
                    user: req.user,
                    currentUser: req.user,
                    userAr: [req.user],
                    myPage: true,
                    submissions: submissions
                }
            })
        }
    });

});

app.get('/user/:userID', isAuthenticated, function (req, res) {
    if (req.params.user && req.params.userID.equals(req.user._id)) {
        res.redirect('/user/my-profile');
    }
    User.findOne({_id: req.params.userID, deleted: false}, function (err, user) {
        if (err) {
            res.render('500');
        } else if (user) {
            Submission.find({_id: {$in: user.submissions}, deleted: false}, function (err, submissions) {
                if (err) {
                    res.render('500');
                } else {
                    res.render('user', {
                        data: {
                            user: user,
                            currentUser: req.user,
                            userAr: [user],
                            submissions: submissions
                        },
                        layout: 'breadcrumbs',
                        title: user.name
                    });
                }
            });
        }
        else {
            res.render('404');
        }
    });
});

// submission ==============================================================================
app.get('/submit', isAuthenticated, function (req, res) {
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err) {
            res.render('500');
        } else if (user) {
            if (user.currentSubmission) {
                res.redirect('/submit/preview');
            } else {
                res.render('submit', {
                    layout: 'breadcrumbs',
                    title: 'Submit Notebook',
                    data: {
                        currentUser: req.user,
                        submit: true
                    }
                });
            }
        }
    });
});

app.get('/submit/preview', isAuthenticated, function (req, res) {
    if (req.user._doc.currentSubmission) {
        res.render('submissionPreview', {
            title: req.user._doc.currentSubmission.title,
            data: {
                currentUser: req.user,
                submit: true
            }
        });
    } else {
        res.render('submit')
    }
});

app.get('/submit/cancel', isAuthenticated, function (req, res) {
    User.findOne({_id: req.user._id}, function (err, user) {
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

app.get('/submit/confirm', isAuthenticated, function (req, res) {
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err || !user) {
            res.render('500');
        } else if (user) {

            var newSub = new Submission(user.currentSubmission);
            newSub.author = req.user._id;
            newSub.save(function (err) {
                if (err) {
                    console.log("ERROR SAVING NEW SUB");
                    res.render('500');
                } else {
                    user.currentSubmission = null;
                    user.submissions.push(newSub._id);
                    user.save(function (err) {
                        if (err) {
                            console.log("ERROR SAVING USER");
                            res.render('500');
                        } else {
                            res.status(200);
                            res.send(newSub._doc._id);
                        }
                    })
                }
            })
        }
    })
});

//registration =============================================================================
app.get('/complete-registration', function (req, res) {
    res.render('edit-profile', {
        title: "Complete Registration",
        data: {
            user: req.user,
            registration: true,
            currentUser: req.user
        }
    })
});

// logout ==================================================================================
app.get('/logout', function (req, res, next) {
    console.log("logging out...");
    req.logout();
    res.redirect('/');
});

// login ===================================================================================
app.get('/login', function (req, res, next) {
    res.render('login', {
        layout: 'breadcrumbs',
        title: 'Login'
    });
});

app.get('/auth/success', function (req, res) {
    res.render('success');
});

// fb login ================================

// add fb to existing user
app.get('/auth/fb/add', isAuthenticated, passport.authenticate('addFB', {scope: 'email'}));
app.get('/auth/fb/callback/add',
    passport.authenticate('addFB', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with fb
app.get('/auth/fb', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/fb/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);

// github login ===========================

// add github to profile
app.get('/auth/github/add', isAuthenticated, passport.authenticate('addGithub', {scope: 'email'}));
app.get('/auth/github/callback/add',
    passport.authenticate('addGithub', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register with github
app.get('/auth/github', passport.authenticate('github', {scope: 'email'}));
app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);

// todo: fix this. getting redirect_uri mismatch
// google login ===========================
app.get('/auth/google/add', passport.authenticate('addGoogle', {scope: 'email'}));
app.get('/auth/google/callback/add', passport.authenticate('addGoogle', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/user/my-profile',
        failureRedirect: '/auth/failure'
    })
);

// twitter login ==========================

// add twitter to existing profile
app.get('/auth/twitter/add', passport.authenticate('addTwitter', {scope: 'email'}));
app.get('/auth/twitter/callback/add', passport.authenticate('addTwitter', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with twitter
app.get('/auth/twitter', passport.authenticate('twitter', {scope: 'email'}));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);


// profile editing ========================================================================
app.get('/edit-profile/remove/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id, deleted: false}, function (err, user) {
            if (err) {
                res.render('500');
            } else if (user) {
                if (type === 'github') {
                    user.github = {};
                } else if (type === 'twitter') {
                    user.twitter = {};
                } else if (type === 'fb') {
                    user.fb = {};
                } else if (type === 'google') {
                    user.google = {};
                }
                //update one social
                var total = (user.github.id !== null) +
                    (user.twitter.id !== null) +
                    (user.fb.id !== null) +
                    (user.google.id !== null);
                if (total === 1) {
                    console.log("Now only have one social");
                    user.oneSocial = true;
                }
                user.save(function (err) {
                    if (err) {
                        res.render('500');
                    } else {
                        console.log("Removed social");
                        res.redirect('/user/my-profile/edit');
                    }
                })
            }
        });
    } else {
        res.render('404');
    }
});

app.get('/edit-profile/toggle/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id}, function (err, user) {
            if (type === 'github') {
                user.github.hidden = !user.github.hidden;
            } else if (type === 'fb') {
                user.fb.hidden = !user.fb.hidden;
            } else if (type === 'twitter') {
                user.twitter.hidden = !user.twitter.hidden;
            } else if (type === 'google') {
                user.google.hidden = !user.google.hidden;
            }

            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.redirect('/user/my-profile/edit')
                }
            })
        })
    } else {
        res.render('404');
    }
});

app.get('/edit-profile/use-photo/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id}, function (err, user) {
            if (type === 'github') {
                user.avatar = user.github.avatarURL;
                user.activeAvatar = 'github';

            } else if (type === 'fb') {
                user.avatar = user.fb.avatarURL;
                user.activeAvatar = 'fb';
            } else if (type === 'twitter') {
                user.avatar = user.twitter.avatarURL;
                user.activeAvatar = 'twitter';
            } else if (type === 'google') {
                user.avatar = user.google.avatarURL;
                user.activeAvatar = 'google';
            }
            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.redirect('/user/my-profile/edit')
                }
            })
        })
    } else {
        res.render('404');
    }
});

// POST ====================================================================================

app.post('/submit/file/edit/:nbID', isAuthenticated, multipartyMiddleware, function (req, res) {
    console.log("Got submit edit");
    var file = req.files.file;
    Submission.findOne({_id: req.params.nbID}, function (err, submission) {
        if (err) {
            console.log("Error 1");
            res.status(500);
            //todo: return error
        } else if (submission) {
            submission.title = req.body.title;
            submission.topicList = req.body.topicList;
            submission.language = req.body.language;
            submission.summary = req.body.summary;
            submission.file = file.name;
            submission.lastUpdated = new Date();

            var command = sprintf('jupyter nbconvert --to html %s --stdout', file.path);
            exec(command, {maxBuffer: 1024 * 500}, function (err, stdout, stderr) {
                if (err) {
                    console.log("Error 2");
                    res.status(500);
                } else {
                    submission.notebook = stdout.replace(/<title[^>]*>[^<]*<\/title>/, "");
                    submission.save(function (err) {
                        if (err) {
                            console.log("Error 3: ", err);
                            res.status(500);
                        } else {
                            res.send({
                                nbID: submission._id,
                                message: 'redirect'
                            })
                        }
                    })
                }
            });

        } else {
            console.log("Error 4");
            res.status(500);
        }
    });
});

//file uploads
app.post('/submit/file', isAuthenticated, multipartyMiddleware, function (req, res) {
    var file = req.files.file;
    console.log("Req.body: ", req.body);
    console.log("File name: ", file.name);
    console.log("File type: ", file.type);
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err || !user) {
            res.render('500');
        } else if (user) {
            var newSub = new Submission();

            newSub.title = req.body.title;

            newSub.topicList = req.body.topicList;

            newSub.language = req.body.language;
            newSub.summary = req.body.summary;


            newSub.file = file;

            newSub.author = user._id;
            //todo: parse co-authors
            // newSub.coAuthors = coAuthors
            newSub.comments = [];
            newSub.totalComments = 0;

            newSub.score = 0;
            newSub.views = 0;

            newSub.published = new Date();
            newSub.lastUpdated = new Date();

            newSub.deleted = false;
            newSub.flagged = false;

            var command = sprintf('jupyter nbconvert --to html %s --stdout', file.path);
            console.log("command: ", command);
            exec(command, {maxBuffer: 1024 * 500}, function (err, stdout, stderr) {
                console.log("stderr: ", stderr);
                console.log("err: ", err);

                if (err) {
                    res.status(500);
                } else {
                    newSub.notebook = stdout.replace(/<title[^>]*>[^<]*<\/title>/, "");
                    console.log("New sub: ", newSub);

                    user.currentSubmission = newSub;
                    user.save(function (err) {
                        if (err) {
                            res.render('500');
                        } else {
                            res.status(200);
                            res.send('redirect');
                        }
                    });
                }
            });


        }
    });

});

app.post('/edit-profile', isAuthenticated, function (req, res) {
    console.log('Received /edit-profile post request');
    console.log("request: ", req.body);
    //change in db
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err) {
            res.render('500');
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.summary = req.body.summary;
            user.website = req.body.website;
            user.save(function (err) {
                if (err) {
                    res.render('500');
                } else {
                    res.status(200);
                    res.send("Saved profile");
                }
            })
        }
    });
});

app.post('/submit/comment/edit/:commentID', isAuthenticated, function (req, res) {
    Comment.findOne({_id: req.params.commentID}, function (err, comment) {
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

app.post('/submit/comment', isAuthenticated, function (req, res) {
    console.log("Received submit comment: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({code: 1, message: 'Login Required'});
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
            Submission.findOne({_id: req.body.submissionID}, function (err, submission) {
                if (err) {
                    res.status(500);
                } else if (submission) {
                    submission.comments.push(c._id);
                    submission.totalComments += 1;
                    submission.save(function (err) {
                        if (err) {
                            res.status(500);
                        } else {
                            console.log("Successfully submitted comment");
                            res.send("Success");
                        }
                    })
                } else {
                    res.status(400);
                }
            });

        }
    })
});

app.post('/submit/reply', isAuthenticated, function (req, res) {
    console.log("Received submit reply: ", req.body);
    if (!req.user) {
        console.log("User not logged in");
        res.status(400);
        res.send({code: 1, message: 'Login Required'});
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
            Comment.findOne({_id: req.body.inReplyTo}, function (err, comment) {
                if (err) {
                    // todo: delete reply
                    console.log("Error 2");
                    res.status(500);
                } else if (comment) {
                    comment.replies.push(reply._id);
                    comment.save(function (err) {
                        if (err) {
                            // todo: delete reply
                            console.log("Error 3");
                            res.status(500);
                        } else {
                            Submission.findOne({_id: comment.submission}, function (err, submission) {
                                if (err) {
                                    res.status(500);
                                } else if (submission) {
                                    submission.totalComments += 1;
                                    submission.save(function (err) {
                                        if (err) {
                                            //todo: clean up added documents?
                                            res.status(500);
                                        } else {
                                            console.log("Successfully submitted reply");
                                            res.send("Success");
                                        }
                                    });
                                } else {
                                    res.status(500);
                                }
                            });

                        }
                    })
                } else {
                    // todo: delete reply
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

app.post('/upvote/submission', isAuthenticated, function (req, res) {
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

app.post('/downvote/submission', isAuthenticated, function (req, res) {
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
                    res.status(500);
                } else if (user) {

                    //has not downvoted
                    if (req.user.downvotes.indexOf(req.body.submissionID) === -1) {
                        //has not upvoted
                        if (req.user.upvotes.indexOf(req.body.submissionID) !== -1) {
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
                                res.status(500);
                            } else {
                                //save comment
                                submission.save(function (err, comment) {
                                    if (err) {
                                        res.status(500);
                                    } else {
                                        res.send('Success');
                                    }
                                });
                            }
                        });
                    }

                    // has downvoted
                    else {
                        //remove commentID from user.downvotes
                        user.downvotes.remove(req.body.submissionID);
                        //increment comment score
                        submission.score += 1;
                        //save user
                        user.save(function (err, user) {
                            if (err) {
                                res.status(500);
                            } else {
                                //save comment
                                submission.save(function (err, submission) {
                                    if (err) {
                                        res.status(500);
                                    } else {
                                        res.send('Success');
                                    }
                                });
                            }
                        });
                    }

                } else {
                    res.status(500);
                }
            });
        } else {
            res.status(500);
        }
    });

});

app.post('/upvote/comment', isAuthenticated, function (req, res) {
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

app.post('/downvote/comment', isAuthenticated, function (req, res) {
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
                                        res.send('Success');
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
                                        res.send('Success');
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
    // db.initConnection(function () {
    // });
    // connect to mongoose
});