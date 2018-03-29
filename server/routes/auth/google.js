var passport = require('../../js/auth/google');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const jwtAuth = require('../../js/auth/jwt');
const appConfig = require('../../_config')


var app = express.Router();

// google login ===========================
//add google to existing account
//TODO: implement jwt in this route
app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), passport.authenticate('google', {
    scope: 'email'
}));

//register/login with google

/**
 * @api {get} /api/auth/fb Google
 * @apiGroup Authentication
 * @apiName AuthenticateGoogle
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription API endpoint for Google OAuth. The user is redirected to Google's OAuth
 * screen.
 * 
 * On a successful authentication, the window will be redirected with a JSON Web Token in the url
 * parameters which the client uses for future authentication
 */
app.get('/', passport.authenticate('google', {
    scope: 'email'
}));

app.get('/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure'
}), function (req, res) {
    const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
        ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
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
            user.currentProvider = 'Google';
        } else {
            res.sendStatus(500);
        }
        user
            .save(function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    const redirect = req.headers.referer + "?" + queryString
                    console.log("[Google Auth] - redirect: ",redirect)
                    res.redirect(redirect);
                }
            })
    });

});

module.exports = app;