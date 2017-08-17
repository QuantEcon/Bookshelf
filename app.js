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
const validationRoutes = require('./routes/auth/validation');
const signOutRoutes = require('./routes/auth/signOut');
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
const secret = require('./_config').secret

// template engine
// const hbs = require('express-handlebars').create({
//     defaultLayout: 'mainLayout'
// });

const app = express();

// app.use(cors());

//set rendering engine
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit:50000
}));


// set location of assets
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    console.log('----------------------------------------------------------------\n')
    console.log("Looking for URL : " + req.url);
    console.log('\tmethod: ', req.method);
    console.log('\tbody: ', req.body);
    console.log('\tauthorization: ', req.headers['authorization']);
    // console.log('req.headers: ', req.headers);
    // console.log('req.cookies:',req.cookies);
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
    secret: secret,
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
app.use('/api/auth/validate-token', validationRoutes);
app.use('/api/edit-profile', editProfileRoutes)
app.use('/api/auth/sign-out', signOutRoutes)

//submit
app.use('/api/submit', submitRoutes);

//vote
app.use('/api/upvote', upvoteRoutes);
app.use('/api/downvote', downvoteRoutes);

app.get('/api/auth/popup/:provider', (req, res) => {
    res.sendFile('./views/partials/popup.html', {root: __dirname});
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