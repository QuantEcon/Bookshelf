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
var fbPassport = require('./js/auth/facebook');
var twitterPassport = require('./js/auth/twitter');
var githubPassport = require('./js/auth/github');
var linkedinPassport = require('./js/auth/linkedin');
// var googlePassport = require('./js/auth/google');

var session = require('express-session');
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

// routes =================================================================
// GET ========================================
app.get('/', function (req, res) {
    // db.getSubmission({'deleted': false}).then(function (result) {
    //     db.getUser({}).then(function (userResult) {
    //         var data = {
    //             n: result,
    //             u: userResult
    //         };
    //         res.render('home', {
    //             data: data,
    //             numSubmissions: result.length
    //         });
    //     });
    // });
    Submission.find({deleted: false}, function (err, submissions) {
        User.find({deleted: false}, function (err, users) {
            var data = {
                n: submissions,
                u: users
            };
            res.render('home', {
                data: data,
                numSubmissions: submissions.length
            })
        });
    });
});

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

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //todo: redirect to correct page
    }
};

//authenticated user middle-ware
app.get('/notebook/:nbID', isAuthenticated, function (req, res) {
    res.send("you are authenticated");
});

app.get('/notebook/:nbID#', function (req, res) {
    res.send("NOT AUTHENTICATED");
});

app.get('/user/:userID', isAuthenticated, function (req, res) {
    if(req.params.userID.equals(req.user._id)){
        res.redirect('/user/my-profile');
    }
    //get user with userID from database
    res.render('user', {
        data: {
            user: req.user
        }
    })
});

// app.get('/user/:userID', function (req, res) {
//     //get user
//     db.getUser({_id: mdb.ObjectID(req.params.userID)}).then(function (userResult) {
//         //et submissions
//         db.getSubmission({_id: {$in: userResult[0].submissions}}).then(function (submissionResult) {
//             //todo: use actual avatar
//             userResult[0].avatar = "/assets/img/avatar/8.png";
//             var data = {
//                 submissions: submissionResult,
//                 user: userResult[0],
//                 userAr: userResult
//             };
//             res.render('user', {
//                 data: data,
//                 layout: 'breadcrumbs',
//                 title: userResult[0].name
//             })
//         });
//     });
// });


app.get('/submit', function (req, res) {
    res.render('submit', {
        layout: 'breadcrumbs',
        title: 'Submit Notebook'
    });
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
app.get('/auth/fb', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/fb/callback',
    passport.authenticate('facebook', {
        //todo: change these once figure out how to set current user
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);
// github login ============
app.get('/auth/github', passport.authenticate('github', {scope: 'email'}));
app.get('/auth/github/callback',
    passport.authenticate('github', {
        //todo: change these once figure out how to set current user
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);
// google login ===========
app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        //todo: change these once figure out how to set current user
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);

// twitter login ==========
app.get('/auth/twitter', passport.authenticate('twitter', {scope: 'email'}));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        //todo: change these once figure out how to set current user
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);
// linkedin login =========
app.get('/auth/linkedin', passport.authenticate('linkedin', {scope: 'email'}));
app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
        //todo: change these one figure out how to set current user
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);

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