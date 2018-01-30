var passport = require('../../js/auth/google');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const jwtAuth = require('../../js/auth/jwt');
const appConfig = require('../../_config')
const AdminList = require('../../js/db/models/AdminList')

var app = express.Router();

// google login ===========================
//add google to existing account
//TODO: implement jwt in this route
app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}), passport.authenticate('google', {
    scope: 'email'
}));
app.get('/callback/add', passport.authenticate('addGoogle'), function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(500);
            res.send({
                error: true,
                message: err
            })
        } else if (user) {
            var token = jwt.sign({
                user: {
                    _id: user._id
                }
            }, "banana horse laser muffin");
            var queryString = qs.stringify({
                token,
                uid: req.user._id
            });
            res.redirect(appConfig.redirectURL + '?' + queryString);
        } else {
            res.status(400);
            res.send({
                error: true,
                message: 'No user found'
            });
        }
    })
});

//register/login with google
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
            //TODO: check if user is admin, issue admin token
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

                user.currentProvider = 'Google';
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
            res.sendStatus(500);
        }
    });
});

const adminToken = (data) => {
    var token = jwt.sign(data, "banana horse laser muffin")
    return token
}

module.exports = app;