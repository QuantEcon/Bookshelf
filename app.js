/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
// modules ===============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var series = require('async/series');
var waterfall = require('async/waterfall');
var sprintf = require('sprintf');

// routes ================================================================================
//auth
var fbAuthRoutes = require('./routes/auth/fb');
var githubAuthRoutes = require('./routes/auth/github');
var twitterAuthRoutes = require('./routes/auth/twitter');
var googleAuthRoutes = require('./routes/auth/google');
//edit profile
var editProfileRoutes = require('./routes/edit-profile/edit-profile');
//search
var searchRoutes = require('./routes/search/search');
//submit
var submitRoutes = require('./routes/submit/submit');
//user
var userRoutes = require('./routes/user/user');
//notebook
var notebookRoutes = require('./routes/notebook/notebook');
//vote
var upvoteRoutes = require('./routes/vote/upvote');
var downvoteRoutes = require('./routes/vote/downvote');
// =======================================================================================

var isAuthenticated = require('./routes/auth/isAuthenticated').isAuthenticated;

// passport modules
var passport = require('passport');
var passportInit = require('./js/auth/init');

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

// template engine
var hbs = require('express-handlebars').create({
    defaultLayout: 'mainLayout'
});

var app = express();

//set rendering engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set location of assets
app.use(express.static(__dirname + "/public"));

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
passportInit();

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

//registration
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
// logout
app.get('/logout', function (req, res, next) {
    console.log("logging out...");
    req.logout();
    res.redirect('/');
});
// login
app.get('/login', function (req, res, next) {
    res.render('login', {
        layout: 'breadcrumbs',
        title: 'Login'
    });
});

// ROUTES ==================================================================================
// search pages
app.use("/search", searchRoutes);
// notebook pages
app.use('/notebook', notebookRoutes);
// user pages
app.use('/user', userRoutes);
// submission
app.use('/submit', submitRoutes);
// login
app.use('/auth/fb', fbAuthRoutes);
app.use('/auth/github', githubAuthRoutes);
app.use('/auth/google', googleAuthRoutes);
app.use('/auth/twitter', twitterAuthRoutes);
// profile editing
app.use('/edit-profile', editProfileRoutes);
//voting
app.use('/vote/upvote', upvoteRoutes);
app.use('/vote/downvote', downvoteRoutes);
// =========================================================================================

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
});