// var passport = require('../../js/auth/facebook');
// var express = require('express');
// var isAuthenticated = require('./isAuthenticated').isAuthenticated;
// const qs = require('query-string');
// const User = require('../../js/db/models/User');
// const jwt = require('jsonwebtoken');
// const jwtAuth = require('../../js/auth/jwt');
// const AdminList = require('../../js/db/models/AdminList')

// const appConfig = require('../../_config')

// const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
//     ' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial new'

// var app = express.Router();

// app.get('/add', jwtAuth.authenticate('jwt', {
//     session: false
// }), passport.authenticate('facebook', {
//     scope: 'email'
// }));

// app.options('/', function (req, rex) {
//     console.log('in options for fb auth');
// })


// app.get('/', passport.authenticate('facebook', {
//     scope: 'email'
// }));

// app.get('/callback', passport.authenticate('facebook', {
//     failureRedirect: '/auth/failure'
// }), function (req, res) {
//     User.findOne({
//         '_id': req.user._id
//     }, select, function (err, user) {
//         if (err) {
//             res.status(500);
//             res.send({
//                 error: err
//             });
//         } else if (user) {
//             AdminList.findOne({}, (err, adminList) => {
//                 var token = jwt.sign({
//                     user: {
//                         _id: user._id
//                     }
//                 }, "banana horse laser muffin");

//                 if (!err && adminList && adminList.adminIDs.indexOf(user._id) != -1) {
//                     console.log("User is admin")
//                     token = adminToken({
//                         user: {
//                             _id: user._id
//                         },
//                         isAdmin: true
//                     })
//                 }

//                 user.currentProvider = 'Facebook';
//                 var queryString = qs.stringify({
//                     token,
//                     uid: req.user._id,
//                     fromAPI: true
//                 });

//                 user
//                     .save(function (err) {
//                         if (err) {
//                             res.sendStatus(500);
//                         } else {
//                             const redirect = appConfig.redirectURL + "?" + queryString
//                             console.log("[Google Auth] - redirect: ", redirect)
//                             res.redirect(redirect);
//                         }
//                     })
//             })
//         } else {
//             res.status(500);
//             res.send({
//                 error: 'No user found'
//             });
//         }

//     });
// });

// const adminToken = (data) => {
//     var token = jwt.sign(data, "banana horse laser muffin")
//     return token
// }

// module.exports = app;