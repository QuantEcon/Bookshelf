var passport = require('../../js/auth/twitter');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const jwtAuth = require('../../js/auth/jwt');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const appConfig = require('../../_config')
const AdminList = require('../../js/db/models/AdminList')

var app = express.Router();
var referer = '';
// twitter login ==========================

// add twitter to existing profile
app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), passport.authenticate('twitter', {
    scope: 'email'
}));

// register/login with twitter
/**
 * @api {get} /api/auth/fb Twitter
 * @apiGroup Authentication
 * @apiName AuthenticateTwitter
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription API endpoint for Twitter OAuth. The user is redirected to Twitter's OAuth
 * screen.
 * 
 * On a successful authentication, the window will be redirected with a JSON Web Token in the url
 * parameters which the client uses for future authentication
 */
app.get('/', passport.authenticate('twitter', {
    scope: 'email'
}));

app.get('/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/auth/failure'
    }),
    function (req, res) {
        console.log('[TwitterAuth] - after second auth');

        const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
            ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'
        User.findOne({
            '_id': req.user._id
        }, select, function (err, user) {
            if (err) {
                console.log('[TwitterAuth] - error finding user')
                res.sendStatus(500);
            } else if (user) {
                AdminList.findOne({}, (err, adminList) => {
                    var token = jwt.sign({
                        user: {
                            _id: user._id
                        }
                    }, "banana horse laser muffin");

                    if (!err && adminList && adminList.adminIDs.indexOf(user._id) != -1) {
                        console.log("User is admin")
                        token = adminToken({
                            user: {_id: user._id},
                            isAdmin: true
                        })
                    }

                    user.currentProvider = 'Twitter';

                    var queryString = qs.stringify({
                        token,
                        uid: req.user._id,
                        fromAPI: true
                    });

                    user
                        .save(function (err) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                const redirect = appConfig.redirectURL + "?" + queryString
                                console.log("[Google Auth] - redirect: ", redirect)
                                res.redirect(redirect);
                            }
                        })
                })
            } else {
                console.log('[TwitterAuth] - no user found')
                res.sendStatus(500);
            }
        });

    }
);

const adminToken = (data) => {
    var token = jwt.sign(data, "banana horse laser muffin")
    return token
}

module.exports = app;