/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
// modules ===============================================================
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var mdb = require('mongodb');
var fuzzyTime = require('fuzzy-time');
var series = require('async/series');
var waterfall = require('async/waterfall');
var asyncApply = require('async/apply');

// passport modules
var passport = require('passport');
var passportInit = require('./js/auth/init');
//todo: export all routes into separate files
require('./js/auth/facebook');
require('./js/auth/twitter');
require('./js/auth/github');
require('./js/auth/linkedin');
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

// config ================================================================
var port = 8080;
var websiteURL = 'http://localhost:8080';

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
                    votes: submission.votes
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
    console.log("Looking for URL : " + req.url);
    next();
});

app.use(session({
    secret: 'banana horse',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport setup =======================================================
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
                numSubmissions: submissions.length
            })
        });
    });
});

app.get('/search/submissions', function (req, res) {
    console.log("Got search request: ", req.query);
    var searchParams = {};
    if (req.query.language != 'All') {
        searchParams.language = req.query.language
    }
    if (req.query.topic != 'All') {
        searchParams.topic = req.query.topic
    }
    if (req.query.author) {
        if (req.query.author == 'my-profile') {
            searchParams.author = req.user._id;
        } else {
            searchParams.author = req.query.author;
        }
    }
    console.log("Searching submissions: ", searchParams);

    Submission.find(searchParams, function (err, submissions) {
        if (err) {
            console.log("Error occurred finding submissions");
            res.status(500);
            res.send("Error occurred finding submissions")
        } else {
            //get users
            var authorIds = submissions.map(function (submission) {
                return submission.author;
            });
            User.find({_id: {$in: authorIds}}, function (err, authors) {
                if (err) {
                    console.log("Error occurred finding authors");
                    res.status(500);
                    res.send("Error occurred finding authors");
                } else {
                    res.status(200);
                    res.send({
                        submissions: submissions,
                        authors: authors
                    })
                }
            })
        }
    });
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

    User.find(params, function (err, users) {
       if(err){
           res.status(500);
       } else {
           res.send(users);
       }
    });


});
// notebook pages ==========================================
app.get('/notebook/:nbID', isAuthenticated, function (req, res) {
    // get nb info
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var replyAuthorIDs;

    var notebookID = req.params.nbID;

    series({
            //get notebook
            nb: function (callback) {
                Submission.findOne({_id: mdb.ObjectId(notebookID), deleted: false}, function (err, submission) {
                    if (err) callback(err);
                    else {
                        notebook = submission;
                        callback(null, submission);
                    }
                });
            },
            //get author
            auth: function (callback) {
                User.findOne({_id: mdb.ObjectId(notebook.author)}, function (err, author) {
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
            if (err) {
                if (notebook) {
                    console.log("Server err: ", err);
                    res.render('500');
                } else {
                    console.log("Couldn't find notebook");
                    res.render('404');
                }
            }
            var fTime = fuzzyTime(results.nb.published);
            var data = {
                n: results.nb,
                u: results.auth,
                coAuthors: results.coAuth,
                comments: results.comments,
                replies: results.reps,
                numTotalComments: results.coms.length + results.reps.length,
                commentUsers: commentAuthorIDs,
                showNotebook: true,
                fuzzyTime: fTime
            };
            res.render('submission', {
                data: data,
                currentUser: req.user,
                title: data.n.title,
                layout: 'breadcrumbs'
            });
        }
    );
});

// user pages ==============================================
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

// submission ==============================================
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
    User.findOne({_id: req.user._id}, function (err, user) {
        if (err) {
            res.render('500');
        } else if (user) {
            if (user.currentSubmission) {
                var data = {
                    author: user,
                    notebook: user.currentSubmission
                };
                res.render('submissionPreview', {
                        data: data,
                        title: user.currentSubmission.title
                    }
                );
            } else {
                res.redirect('/submit');
            }
        } else {
            res.render('404');
        }
    });

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

//registration ==============================================
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

// logout ===================================================
app.get('/logout', function (req, res, next) {
    console.log("logging out...");
    req.logout();
    res.redirect('/');
});

// login ====================================================
app.get('/login', function (req, res, next) {
    res.render('login', {
        layout: 'breadcrumbs',
        title: 'Login'
    });
});

//todo: loading screen?

app.get('/auth/success', function (req, res) {
    res.render('success');
});

// fb login ================
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

// github login ============

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
// google login ===========
// app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));
// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/user/my-profile',
//         failureRedirect: '/auth/failure'
//     })
// );

// twitter login ==========

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

// todo: fix this. getting redirect_uri mismatch
// linkedin login =========
// app.get('/auth/linkedin', passport.authenticate('linkedin', {scope: 'email'}));
// app.get('/auth/linkedin/callback',
//     passport.authenticate('linkedin', {
//         successRedirect: '/user/my-profile',
//         failureRedirect: '/auth/failure'
//     })
// );

// profile editing ============
app.get('/edit-profile/remove/:social', isAuthenticated, function (req, res) {
    var type = req.params.social;
    if (typeof type === 'string') {
        User.findOne({_id: req.user._id, deleted: false}, function (err, user) {
            if (err) {
                res.render('500');
            } else if (user) {
                if (type == 'github') {
                    user.github = {};
                } else if (type == 'twitter') {
                    user.twitter = {};
                } else if (type == 'fb') {
                    user.fb = {};
                } else if (type == 'google') {
                    user.google = {};
                }
                //todo: add google
                //update one social
                var total = (user.github.id != null) +
                    (user.twitter.id != null) +
                    (user.fb.id != null) +
                    (user.google.id != null);
                if (total == 1) {
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
            if (type == 'github') {
                user.github.hidden = !user.github.hidden;
            } else if (type == 'fb') {
                user.fb.hidden = !user.fb.hidden;
            } else if (type == 'twitter') {
                user.twitter.hidden = !user.twitter.hidden;
            }
            //todo: add google

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
            if (type == 'github') {
                user.avatar = user.github.avatarURL;
                user.activeAvatar = 'github';

            } else if (type == 'fb') {
                user.avatar = user.fb.avatarURL;
                user.activeAvatar = 'fb';

            } else if (type == 'twitter') {
                user.avatar = user.twitter.avatarURL;
                user.activeAvatar = 'twitter';
            }
            //todo: add google

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

// POST ======================================
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
            //todo: parse topic list
            // newSub.topicList = topicList
            newSub.language = req.body.language;
            newSub.summary = req.body.summary;
            //todo: convert ipynb to html
            // newSub.notebook = fileHTML

            newSub.author = user._id;
            //todo: parse co-authors
            // newSub.coAuthors = coAuthors
            newSub.comments = [];

            newSub.votes = 0;
            newSub.views = 0;

            newSub.published = new Date();
            newSub.lastUpdated = new Date();

            newSub.deleted = false;
            newSub.flagged = false;


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