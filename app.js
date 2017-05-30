/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
// modules ===============================================================
var express = require('express');
var fs = require("fs");
var mdb = require('mongodb');
var fuzzyTime = require('fuzzy-time');
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
                var fTime = fuzzyTime(submission.timestamp);
                var info = {
                    submissionID: submission._id,
                    title: submission.title,
                    authorID: submission.author,
                    authorName: user.name,
                    language: submission.language,
                    summary: submission.summary,
                    timestamp: fTime,
                    authorPic: "/assets/img/avatar/8.png",
                    views: submission.views,
                    // todo: get total number of comments (comments + replies)
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
            },
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
                        //todo: use actual avatar
                        avatar: "/assets/img/avatar/8.png",
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
    });

var app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set location of assets
app.use(express.static(__dirname + "/public"));

// middleware ============================================================
// todo: loading screen?
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


// app.get('/notebook/:nbID', function (req, res) {
//     db.getSubmission({_id: new mdb.ObjectID(req.params.nbID)}).then(function (result) {
//         if (result.length) {
//             db.getUser({_id: new mdb.ObjectID(result[0].author)}).then(function (userResult) {
//                 //get co-authors
//                 db.getUser({_id: {$in: result[0].coAuthors}}).then(function (coAuthorResult) {
//                     //get all comments
//                     var comments = result[0].comments.map(function (a) {
//                         return a;
//                     });
//                     db.getComment({_id: {$in: comments}}).then(function (commentsResult) {
//                         //get all replies
//                         var replyIDs = commentsResult.map(function (comment) {
//                             return comment.replies.map(function (reply) {
//                                 return reply;
//                             });
//                         });
//                         var mergedReplies = [].concat.apply([], replyIDs);
//                         db.getComment({_id: {$in: mergedReplies}}).then(function (replyResult) {
//                             //get users from comments
//                             var commentUsers = commentsResult.map(function (comment) {
//                                 return comment.author;
//                             });
//                             var replyUsers = replyResult.map(function (reply) {
//                                 return reply.author;
//                             });
//
//                             var mergedUsers = [].concat(commentUsers).concat(replyUsers);
//
//                             db.getUser({_id: {$in: mergedUsers}}).then(function (getAllResult) {
//                                 //todo: use actual avatar
//                                 userResult[0].avatar = "/assets/img/avatar/8.png";
//                                 var fTime = fuzzyTime(result[0].timestamp);
//                                 //set up data object
//                                 var data = {
//                                     n: result[0],
//                                     u: userResult[0],
//                                     coAuthors: coAuthorResult,
//                                     comments: commentsResult,
//                                     replies: replyResult,
//                                     numTotalComments: commentsResult.length + replyResult.length,
//                                     commentUsers: getAllResult,
//                                     showNotebook: true,
//                                     fuzzyTime: fTime
//                                 };
//                                 // render page
//                                 res.render('submission', {
//                                     data: data,
//                                     layout: 'breadcrumbs',
//                                     title: result[0].title
//                                 })
//                             });
//                         });
//                     });
//                 });
//             });
//         } else {
//             //trigger 404
//             res.status(404);
//             res.render('404');
//         }
//     });
// });

var getNBInfo = function (notebookID) {
    Submission.findOne({_id: mdb.ObjectId(notebookID)}, function (err, notebook) {
            if (err) {
                return null
            } else if (notebook) {
                //get author
                User.findOne({_id: mdb.ObjectId(notebook.author)}, function (err, author) {
                    if (err) {
                        return null;
                    }
                    //get co-authors
                    User.find({_id: {$in: notebook.coAuthors}}, function (err, coAuthors) {
                        if (err) {
                            return null;
                        }
                        //get comments
                        Comment.find({_id: {$in: notebook.comments}}, function (err, comments) {
                            if (err) {
                                return null;
                            }
                            //get replyID's from all comments
                            var replyIDs = comments.map(function (comment) {
                                return comment.replies.map(function (reply) {
                                    return reply;
                                });
                            });
                            //get replies
                            Comment.find({_id: {$in: replyIDs}}, function (err, replies) {
                                if (err) {
                                    return null;
                                }
                                //get authors of comments and replies
                                var commentUsers = comments.map(function (comment) {
                                    return comment.author;
                                });
                                var replyUsers = replies.map(function (reply) {
                                    return reply.author;
                                });
                                var mergedUsers = [].concat(commentUsers).concat(replyUsers);

                                User.find({_id: {$in: mergedUsers}}, function (err, commentAuthors) {
                                    //todo: build data object and return
                                    var fTime = fuzzyTime(notebook.timestamp);
                                    return {
                                        n: notebook,
                                        u: author,
                                        coAuthors: coAuthors,
                                        comments: comments,
                                        replies: replies,
                                        numTotalComments: comments.length + replies.length,
                                        commentUsers: commentAuthors,
                                        showNotebook: true,
                                        fuzzyTime: fTime
                                    };
                                });
                            });
                        })
                    });
                });
            }
            else {
                return 400;
            }
        }
    );
};

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Is Authenticated!");
        return next();
    } else {
        //not authenticated
        if (/^\/user\/my-profile/.test(req.url)) {
            res.redirect('/login');
        }
        else if (/^\/user\//.test(req.url)) {
            User.findOne({_id: mdb.ObjectId(req.params.userID)}, function (err, user) {
                if (err) {
                    res.render('500');
                } else if (user) {
                    res.render('user', {
                        data: {
                            user: user,
                            currentUser: null
                        },
                        layout: 'breadcrumbs',
                        title: user.name
                    });
                } else {
                    res.render('400', {
                        title: "User Not Found"
                    });
                }
            });
        } else if (/^\/notebook\//.test(req.url)) {
            //get notebook info
            res.render('submission', {
                data: getNBInfo(req.params.nbID),
                currentUser: null
            });
        } else {
            res.render('home', {
                //todo: get submissions and users
                currentUser: null
            });
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

//authenticated user middle-ware
app.get('/notebook/:nbID', isAuthenticated, function (req, res) {
    // get nb info
    var data = getNBInfo(req.params.nbID);
    // render notebook
    res.render('notebook', {
        data: data,
        title: data.n.title,
        layout: 'breadcrumbs'
    });
});

app.get('/user/my-profile/edit', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    res.render('edit-profile', {
        data: {
            user: req.user,
            currentUser: req.user
        },
        layout: 'breadcrumbs',
        title: 'Edit Profile'
    })
});

app.get('/user/my-profile', isAuthenticated, function (req, res) {
    if (req.user.new) {
        res.redirect('/complete-registration');
    }
    res.render('user', {
        title: 'My Profile',
        data: {
            user: req.user,
            currentUser: req.user,
            myPage: true
        }
    })
});

app.get('/user/:userID', isAuthenticated, function (req, res) {
    if (req.params.userID.equals(req.user._id)) {
        res.redirect('/user/my-profile');
    }
    User.findOne({_id: req.params.userID}, function (err, user) {
        if (err) {
            res.render('500');
        } else if (user) {
            res.render('user', {
                data: {
                    user: user,
                    currentUser: req.user
                },
                layout: 'breadcrumbs',
                title: user.name
            });
        }
    });
});

app.get('/submit', isAuthenticated, function (req, res) {
    res.render('submit', {
        layout: 'breadcrumbs',
        title: 'Submit Notebook',
        data: {
            currentUser: req.user,
            submit: true
        }
    });
});

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

// logout ===================================
app.get('/logout', function (req, res, next) {
    console.log("logging out...");
    req.logout();
    res.redirect('/');
});

// login ====================================
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

// POST ======================================

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