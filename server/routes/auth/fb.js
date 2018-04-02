var passport = require('../../js/auth/facebook');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const qs = require('query-string');
const User = require('../../js/db/models/User');
const jwt = require('jsonwebtoken');
const jwtAuth = require('../../js/auth/jwt');

const appConfig = require('../../_config')

const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'

var app = express.Router();

app.get('/add', jwtAuth.authenticate('jwt', {
    session: false
}),passport.authenticate('facebook', {
    scope: 'email'
}));

app.options('/', function (req, rex) {
    console.log('in options for fb auth');
})

/**
 * @api {get} /api/auth/fb Facebook
 * @apiGroup Authentication
 * @apiName AuthenticateFacebook
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription API endpoint for Facebook OAuth. The user is redirected to Facebook's OAuth
 * screen.
 * 
 * On a successful authentication, the window will be redirected with a JSON Web Token in the url
 * parameters which the client uses for future authentication
 */
app.get('/', passport.authenticate('facebook', {
    scope: 'email'
}));

app.get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/auth/failure'
}), function (req, res) {
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
            res.status(500);
            res.send({error: err});
        } else if (user) {
            var token = jwt.sign({
                user: {
                    _id: user._id
                }
            }, 'banana horse laser muffin');
            var queryString = qs.stringify({
                token,
                uid: req.user._id,
                fromAPI: true
            });
            user.currentProvider = 'Facebook'
            user
                .save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send({error: err});
                    } else {
                        console.log('[FBAuth] - headers: ', req.headers)
                        if(req.headers.referer){
                            console.log('[FBAuth] - redirect: ', req.headers.referer + '?' + queryString);
                            res.redirect(req.headers.referer + '?' + queryString);
                        } else {
                            console.log('[FBAuth] - no referer header. Redirect: ', appConfig.urlAndPort + '/signin' + '?' + queryString)
                            res.redirect(appConfig.urlAndPort + '/signin' + '?' + queryString);
                        }
                    }
                })
        } else {
            res.status(500);
            res.send({error: 'No user found'});
        }

    });
});

module.exports = app;