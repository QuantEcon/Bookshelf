var passport = require('../../js/auth/google');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const jwtAuth = require('../../js/auth/jwt');
const appConfig = require('../../_config')

// import model schemas
const AdminList = require('../../js/db/models/AdminList')
const User = require('../../js/db/models/User');

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
        ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial new';

    // find user in db
    User.findOne({
        '_id': req.user._id
    }, select, function (err, user) {
        if (err) {
            res.sendStatus(500);
        } else if (user) {
            // check if the user has been deleted
            User.findById(req.user._id, (error, user) => {
              if(error) {
                return res.sendStatus(500)
              } else {
                // if user.deleted is true, then do not log user in
                if(user.deleted) {
                  res.send('User has been deleted.');
                } else {
                  //sign new jwt
                  //TODO: check if user is admin, issue admin token
                  AdminList.findOne({}, (err, adminList) => {
                      var token = jwt.sign({
                          user: {
                              _id: user._id
                          }
                      }, "banana horse laser muffin", { expiresIn: 3600 }); // expires in one hour - users will have to log back in

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
                      // save user in db
                      user.save(function (err) {
                              if (err) {
                                  res.sendStatus(500);
                              } else {
                                  const redirect = appConfig.redirectURL + "?" + queryString
                                  console.log("[Google Auth] - redirect: ", redirect)
                                  res.redirect(redirect);
                              }
                          })
                  }) // end of logging in user & checking if user is admin via Google
                }
              }
            }); // end of findById

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
