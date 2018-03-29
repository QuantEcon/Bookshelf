var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const secret = require('../../_config').secret
const jwtAuth = require('../../js/auth/jwt');
const appConfig = require('../../_config')


const qs = require('query-string');

var app = express.Router();

// github login =========================== 
app.use(function (req, res, next) {
    next();
}); //add github to profile

app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), passport.authenticate('github', {
    scope: 'email'
}));

// register with github
/**
 * @api {get} /api/auth/fb Github
 * @apiGroup Authentication
 * @apiName AuthenticateGithub
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription API endpoint for Github OAuth. The user is redirected to Github's OAuth
 * screen.
 * 
 * On a successful authentication, the window will be redirected with a JSON Web Token in the url
 * parameters which the client uses for future authentication
 */
app.get('/', passport.authenticate('github', {
    scope: 'email'
}));

app.get('/callback', passport.authenticate('github', {
    failureRedirect: '/api/auth/failure'
}), function (req, res) {
    const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
        ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
            console.log('[Github] - err1: ', err);
            res.sendStatus(500);
        } else if (user) {
            //sign new jwt
            var token = jwt.sign({
                user: {
                    _id: user._id
                }
            }, "banana horse laser muffin");
            var queryString = qs.stringify({
                token,
                uid: req.user._id,
                fromAPI: true
            });
            console.log('[Github] - query string:', queryString);
            user.currentProvider = 'Github';
        } else {
            console.log('[Github] - err2: ');
            res.sendStatus(500);
        }
        user
            .save(function (err) {
                if (err) {
                    console.log('[Github] - err3: ', err);
                    res.sendStatus(500);
                } else {
                    console.log("[Github Auth] - req.body: ", req)
                    console.log('[Github] - req.headers.referer: ', req.headers.referer)
                    res.redirect(req.headers.referer + '?' + queryString)
                    // if (appConfig.debug) {
                    //     console.log('[Github] - redirect: ', appConfig.clientHostNameAndPort + '/signin' + '?' + queryString)
                    //     res.redirect(appConfig.clientHostNameAndPort + '/signin?' + queryString)
                    // } else {
                    //     console.log('[Github] - redirect: ', appConfig.hostName + '/signin' + '?' + queryString)
                    //     res.redirect(appConfig.hostName + '/signin' + '?' + queryString);
                    // }
                }
            })
    });
});

module.exports = app;