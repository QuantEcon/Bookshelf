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
    console.log("Looking for URL : " + req.url);
    console.log('\tmethod: ', req.method);
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Access-Control-Allow-Origin");
    // res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// app.use(session({
//     secret: 'banana horse',
//     resave: true,
//     saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());
passportInit();

// app.get('/', isAuthenticated, function (req, res) {
//     Submission.find({
//         deleted: false
//     }, function (err, submissions) {
//         User.find({
//             deleted: false
//         }, function (err, users) {
//             var data = {
//                 n: submissions,
//                 u: users,
//                 currentUser: req.user
//             };
//             res.render('home', {
//                 data: data,
//                 title: 'QuantEconLib',
//                 numSubmissions: submissions.length
//             })
//         });
//     });
// });
//registration
// app.get('/complete-registration', function (req, res) {
//     res.render('edit-profile', {
//         title: "Complete Registration",
//         data: {
//             user: req.user,
//             registration: true,
//             currentUser: req.user
//         }
//     })
// });
// // logout
// app.get('/logout', function (req, res, next) {
//     console.log("logging out...");
//     req.logout();
//     res.redirect('/');
// });
// // login
// app.get('/login', function (req, res, next) {
//     res.render('login', {
//         layout: 'breadcrumbs',
//         title: 'Login'
//     });
// });

// ROUTES ==================================================================================
// search pages
app.use("/api/search", searchRoutes);
// // notebook pages
// app.use('/notebook', notebookRoutes);
// // user pages
// app.use('/user', userRoutes);
// // submission
// app.use('/submit', submitRoutes);
// login
app.use('/api/auth/fb', fbAuthRoutes);
app.use('/api/auth/github', githubAuthRoutes);
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/auth/twitter', twitterAuthRoutes);
const validateToken = (token) => {

}
app.get('/api/auth/validate-token', function(req, res){
    console.log('[ValidateToken] - req.headers.access-token: ', req.headers['access-token']);

    User.findOne({'github.access_token': req.headers.access_token}, function (err, user) {
        if(err){
            console.log('[ValidateToken] - err finding user:',err);
            res.sendStatus(500);
        } else if(user){
            console.log('[ValidateToken] - found user');
            res.send(user);
        } else {
            console.log('[ValidateToken] - could not find user');
            res.sendStatus(400);
        }
    })
});
// // profile editing
// app.use('/edit-profile', editProfileRoutes);
// //voting
// app.use('/vote/upvote', upvoteRoutes);
// app.use('/vote/downvote', downvoteRoutes);

// app.use(function (req, res) {
//     console.log('404 on the server: ', req.url);
//     res.status(404);
//     res.sendStatus(404);
// });

// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500);
//     res.render('500');
// });

app.get('*', (req, res) => {
    console.log('Sending react app')
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
// =========================================================================================



// start server
app.listen(port, function () {
    console.log("Server listening on port %d", port);
});