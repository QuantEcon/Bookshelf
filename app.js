/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */

// modules ===============================================================================
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const series = require('async/series');
const waterfall = require('async/waterfall');
const path = require('path');
const cors = require('cors');

// routes ================================================================================
//auth
const fbAuthRoutes = require('./routes/auth/fb');
const githubAuthRoutes = require('./routes/auth/github');
const twitterAuthRoutes = require('./routes/auth/twitter');
const googleAuthRoutes = require('./routes/auth/google');
const editProfileRoutes = require('./routes/edit-profile/edit-profile');
const searchRoutes = require('./routes/search/search');
const submitRoutes = require('./routes/submit/submit');
const userRoutes = require('./routes/user/user');
const notebookRoutes = require('./routes/notebook/notebook');
const upvoteRoutes = require('./routes/vote/upvote');
const downvoteRoutes = require('./routes/vote/downvote');
// =======================================================================================

const isAuthenticated = require('./routes/auth/isAuthenticated').isAuthenticated;

// passport modules
const passport = require('passport');
const passportInit = require('./js/auth/init');

const session = require('express-session');

//file uploads
const multiparty = require('connect-multiparty');

//db
const mongoose = require('./js/db/mongoose');
// db Models ================
const User = require('./js/db/models/User');
const Submission = require('./js/db/models/Submission');
const Comment = require('./js/db/models/Comment');

// config ================================================================================
const port = require('./_config').port;

// template engine
const hbs = require('express-handlebars').create({
    defaultLayout: 'mainLayout'
});

const app = express();

// app.use(cors());

//set rendering engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// set location of assets
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    console.log('----------------------------------------------------------------\n')
    console.log("Looking for URL : " + req.url);
    console.log('\tmethod: ', req.method);
    console.log('req.headers: ', req.headers);
    console.log('req.cookies:',req.cookies);
    console.log('\n');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization " +
        "Access-Control-Allow-Credentials, Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Request-Headers', 'access-token,authorization,if-modified-since,uid');
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

// ROUTES ==================================================================================
// search pages
app.use("/api/search", searchRoutes);

// login
app.use('/api/auth/fb', fbAuthRoutes);
app.use('/api/auth/github', githubAuthRoutes);
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/auth/twitter', twitterAuthRoutes);

app.options('/api/auth/validate-token', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.sendStatus(200);
});

app.get('/api/auth/validate-token', function (req, res) {
    console.log('[ValidateToken] - req.headers.access-token: ', req.headers['access-token']);
    const select = 'name views numComments joinDate voteScore position submissions upvotes' +
        'downvotes avatar website email summary activeAvatar currentProvider' +
        'github.username github.url github.hidden github.avatarURL' +
        'fb.displayName fb.url fb.hidden fb.avatarURL' +
        'google.avatarURL google.hidden google.displayName' +
        'twitter.username twitter.avatarURL twitter.url twitter.hidden';
    //TODO: use passport-jwt for getting user
    User.findOne({
        'currentToken': req.headers['access-token']
    }, select, function (err, user) {
        if (err) {
            console.error('[ValidateToken] - err finding user:', err);
            res.sendStatus(500);
        } else if (user) {
            console.log('[ValidateToken] - user signed in');
            res.send({
                user: user,
                provider: user.currentProvider,
                uid: user._id,
                token: req.headers['access-token']
            });
        } else {
            console.error('[ValidateToken] - could not find user');
            res.sendStatus(400);
        }
    })
});

app.get('*', (req, res) => {
    console.log('Sending react app')
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
// =========================================================================================

// start server
app.listen(port, function () {
    console.log("Server listening on port %d", port);
});