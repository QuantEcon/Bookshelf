var passport = require('../../js/auth/github');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const secret = require('../../_config').secret
const jwtAuth = require('../../js/auth/jwt');
const appConfig = require('../../_config')
const AdminList = require('../../js/db/models/AdminList')

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
        ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial new'
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
            console.log('[Github] - err1: ', err);
            res.sendStatus(500);
        } else if (user) {
            //sign new jwt
            AdminList.findOne({}, (err, adminList) => {
                var token = jwt.sign({
                    user: {
                        _id: user._id
                    }
                }, "banana horse laser muffin");

                if (!err && adminList && adminList.adminIDs.indexOf(user._id) != -1) {
                    console.log("User is admin")
                    token = adminToken({
                        user: {
                            _id: user._id
                        },
                        isAdmin: true
                    })
                }

                user.currentProvider = 'Github';
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
                            console.log("[Github Auth] - redirect: ", redirect)
                            res.redirect(redirect);
                        }
                    })
            })
        } else {
            console.log('[Github] - err2: ');
            res.sendStatus(500);
        }
    });
});

const adminToken = (data) => {
    var token = jwt.sign(data, "banana horse laser muffin")
    return token
}

module.exports = app;