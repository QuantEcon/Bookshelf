var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const bodyParser = require('body-parser');
const passport = require('../../js/auth/jwt');
const sprintf = require('sprintf')

const User = require('../../js/db/models/User');
const Submission = require('../../js/db/models/Submission');
const Comment = require('../../js/db/models/Comment');

var app = express.Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    console.log('[EditProfile] - req.body:', req.body);
    console.log('[EditProfile] - authorization: ', req.headers['authorization']);
    next();
})

/**
 * @apiDefine AuthorizationHeader
 * @apiHeader (Headers) {String} authorization Authorization JSON Web Token
 * @apiHeaderExample {json} Header Example:
 *  {
 *      "Authorization": "JWT <web token>"
 *  }
 */

 /**
  * @apiDefine AuthorizationError
  * @apiError (501) Unauthorized A valid JWT was not provided in the Authorization header
  */


// Routes =======================================================

/**
 * @api {post} /api/edit-profile Edit Profile
 * @apiGroup Edit Profile
 * @apiName EditProfile
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates the user's database document with the supplied data.
 *
 * NOTE: While each of the social account objects are optional, at least one must
 * be provided.
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object}   body
 * @apiParam {String}   body.email              User's email address
 * @apiParam {String}   body.name               User's name
 * @apiParam {String}   body.summary            User's summary
 * @apiParam {URL}      body.website            User's website URL
 *
 * @apiParam {Object}   body.fb                 (OPTIONAL) User's Facebook profile details and OAuth credentials
 * @apiParam {String}   body.fb.id              User's Facebook OAuth ID
 * @apiParam {String}   body.fb.access_token    User's Facebook OAuth access token
 * @apiParam {String}   body.fb.displayName     User's Facebook display name
 * @apiParam {URL}      body.fb.url             URL to user's Facebook page
 * @apiParam {Boolean}  body.fb.hidden          Boolean flag to show the user's Facebook link publicly on their profile page
 * @apiParam {URL}      body.fb.avatarURL       URL to the user's Facebook profile picture
 *
 * @apiParam {Object}   body.twitter                 (OPTIONAL) User's Twitter profile details and OAuth credentials
 * @apiParam {String}   body.twitter.id              User's Twitter OAuth ID
 * @apiParam {String}   body.twitter.access_token    User's Twitter OAuth access token
 * @apiParam {String}   body.twitter.username        User's Twitter display name
 * @apiParam {URL}      body.twitter.url             URL to user's Twitter page
 * @apiParam {Boolean}  body.twitter.hidden          Boolean flag to show the user's Twitter link publicly on their profile page
 * @apiParam {URL}      body.twitter.avatarURL       URL to the user's Twitter profile picture
 *
 * @apiParam {Object}   body.github                 (OPTIONAL) User's Github profile details and OAuth credentials
 * @apiParam {String}   body.github.id              User's Github OAuth ID
 * @apiParam {String}   body.github.access_token    User's Github OAuth access token
 * @apiParam {String}   body.github.username        User's Github display name
 * @apiParam {URL}      body.github.url             URL to user's Github page
 * @apiParam {Boolean}  body.github.hidden          Boolean flag to show the user's Github link publicly on their profile page
 * @apiParam {URL}      body.github.avatarURL       URL to the user's Github profile picture
 *
 * @apiParam {Object}   body.google                 (OPTIONAL) User's Google profile details and OAuth credentials
 * @apiParam {String}   body.google.id              User's Google OAuth ID
 * @apiParam {String}   body.google.access_token    User's Google OAuth access token
 * @apiParam {String}   body.google.displayName     User's Google display name
 * @apiParam {Boolean}  body.google.hidden          Boolean flag to show the user's Google link publicly on their profile page
 * @apiParam {URL}      body.google.avatarURL       URL to the user's Google profile picture
 *
 * @apiParam {Object}   body.emailSettings              User's notification preferences
 * @apiParam {Boolean}  body.emailSettings.newComment   Boolean flag to notify a user when a new comment is posted on his/her submission
 * @apiParam {Boolean}  body.emailSettings.newReply     Boolean flag to notify a user when a new reply is posted to his/her comment
 * @apiParam {Boolean}  body.emailSettings.submission   Boolean flag to notify a user when a notebook submission is successful
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Object} data.user Updated user object from database
 *
 * @apiError (500) InternalServerError An error occured finding, updating, or saving the user document.
 * @apiUse AuthorizationError
 */
app.post('/', passport.authenticate('jwt', {
    session: 'false'
}), function (req, res) {

    User.findOne({
        _id: req.user._id
    }, function (err, user) {
        if (err) {
            res.status(500);
            res.send({
                error: true,
                message: err
            })
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.website = req.body.website;
            user.summary = req.body.summary;
            console.log("settings email settings")
            user.emailSettings = req.body.emailSettings
            console.log("user: ", user)
            if (req.body.google) {
                user.google = Object.assign({}, user.google, req.body.google);
            } else {
                user.google = {}
            }
            if (req.body.twitter) {
                user.twitter = Object.assign({}, user.twitter, req.body.twitter);
            } else {
                user.twitter = {}
            }
            if (req.body.github) {
                user.github = Object.assign({}, user.github, req.body.github);
            } else {
                user.github = {}
            }
            if (req.body.fb) {
                user.fb = Object.assign({}, user.fb, req.body.fb);
            } else {
                user.fb = {}
            }
            const twitter = (user.twitter == {});
            const github = (user.github == {});
            const fb = (user.fb == {});
            const google = (user.google == {});
            const total = twitter + google + fb + github;
            if (total > 2) {
                user.oneSocial = true;
            } else {
                user.oneSocial = false
            }

            user.new = false;

            user.save(function (err, savedUser) {
                if (err) {
                    res.status(500);
                    res.send({
                        error: true,
                        message: err
                    });
                } else {
                    res.status(200);
                    res.send({
                        user: savedUser
                    });
                }
            })
        }
    });
});

/**
 * @api {post} /api/edit-profile/remove-social
 * @apiGroup Edit Profile
 * @apiName RemoveSocial
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Removes the supplied social account from the user's profile
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} body.social The social account to remove (github, twitter, fb, google)
 *
 * @apiError (500) InternalServerError An error occurred finding, updating, or saving the user document.
 * @apiError (400) BadRequest Either no user was found, or the user's final social account was trying to be removed.
 * @apiUse AuthorizationError
 */
app.post('/remove-social', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var type = req.body.social;
    if (typeof type === 'string') {
        User.findOne({
            _id: req.user._id,
            deleted: false
        }, function (err, user) {
            if (err) {
                console.error("[RemoveSocial] Error finding user: ", err)
                res.status(500);
                res.send({
                    error: true,
                    message: err
                });
            } else if (user) {

                //Check if user only has one social
                //If only one social, don't remove it
                if (oneSocial(user)) {
                    console.warn("[RemoveSocial] - User only has one social!")
                    res.status(400)
                    res.send({
                        error: true,
                        message: "User only has one social"
                    })
                } else {
                    if (type === 'github') {
                        user.github = {};
                    } else if (type === 'twitter') {
                        user.twitter = {};
                    } else if (type === 'fb') {
                        user.fb = {};
                    } else if (type === 'google') {
                        user.google = {};
                    }

                    if (oneSocial(user)) {
                        console.log("[RemoveSocial] - Now only have one social");
                        user.oneSocial = true;
                    }
                    user.new = false;
                    user.save(function (err) {
                        if (err) {
                            console.error("[RemoveSocial] - error saving user: ", err)
                            res.status(500);
                            res.send({
                                error: true,
                                message: err
                            })
                        } else {
                            console.log("[RemoveSocial] - Removed social");
                            res.sendStatus(200);
                        }
                    })
                }

            }
        });
    } else {
        res.status(400);
        res.send({
            error: true,
            message: 'No user found'
        })
    }
});

/**
 * @api {post} /api/edit-profile/toggle-social Toggle Social
 * @apiGroup Edit Profile
 * @apiName ToggleSocial
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Toggles the visibility of the social account on the user's public profile page
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} body.social Social account to toggle (github, fb, twitter, google)
 *
 * @apiError (400) BadRequest A social account was not provided
 * @apiError (500) InternalServerError An error occurred finding, updating, or saving the user's database document
 * @apiUse AuthorizationError
 */
app.post('/toggle-social', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log('[EditProfile] - received toggle social request');
    var type = req.body.social;
    if (typeof type === 'string') {
        User.findOne({
            _id: req.user._id
        }, function (err, user) {
            if (err) {
                res.status(500);
                res.send({
                    error: true,
                    message: err
                });
            } else if (user) {
                if (type === 'github') {
                    user.github.hidden = !user.github.hidden;
                } else if (type === 'fb') {
                    user.fb.hidden = !user.fb.hidden;
                } else if (type === 'twitter') {
                    user.twitter.hidden = !user.twitter.hidden;
                } else if (type === 'google') {
                    user.google.hidden = !user.google.hidden;
                } else {
                    res.sendStatus(400)
                }
                user.new = false;

                user.save(function (err) {
                    if (err) {
                        console.log('[EditProfile] - error saving user');
                        res.status(500);
                        res.send({
                            error: true,
                            message: err
                        })
                    } else {
                        console.log('[EditProfile] - success toggling social');
                        res.sendStatus(200)
                    }
                })
            } else {
                console.log('[EditProfile] - error finding user')
                res.status(400);
                res.send({
                    error: true,
                    message: 'No user found'
                })
            }

        })
    } else {
        console.log('[EditProfile] - type of social is not string');
        res.status(400);
        res.send({
            error: true,
            message: 'Social must be a string'
        })
    }
});

/**
 * @api {post} /api/edit-profile/set-avatar Set Avatar
 * @apiGroup Edit Profile
 * @apiName SetAvatar
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Set's the user's avatar to the given social avatar.
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} social Social avatar to use (google, fb, twitter, github)
 *
 * @apiError (500) InternalServerError An error ocurred finding, updating, or saving the user database document
 * @apiError (400) BadRequest A valid social account wasn't provided (github, facebook, twitter, google)
 * @apiUse AuthorizationError
 */
app.post('/set-avatar', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var type = req.body.social;
    if (typeof type === 'string') {
        User.findOne({
            _id: req.user._id
        }, function (err, user) {
            if (err) {
                res.status(500);
                res.send({
                    error: true,
                    message: err
                });
            } else {
                if (type === 'github') {
                    user.avatar = user.github.avatarURL;
                    user.activeAvatar = 'github';

                } else if (type === 'fb') {
                    user.avatar = user.fb.avatarURL;
                    user.activeAvatar = 'fb';
                } else if (type === 'twitter') {
                    user.avatar = user.twitter.avatarURL;
                    user.activeAvatar = 'twitter';
                } else if (type === 'google') {
                    user.avatar = user.google.avatarURL;
                    user.activeAvatar = 'google';
                } else {
                    res.sendStatus(400)
                    return;
                }
                user.new = false;
                user.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send({
                            error: true,
                            message: err
                        })
                    } else {
                        res.sendStatus(200)
                    }
                })
            }

        })
    } else {
        res.status(400);
        res.send({
            error: true,
            message: 'No user found'
        })
    }
});

/**
 * @api {post} /api/edit-profile/merge-accounts Merge Accounts
 * @apiGroup Edit Profile
 * @apiName MergeAccounts
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Merges two accounts into the one making the request. All submissions, votes, comments
 * and replies from the second will be added to the first account
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} body.accountToMerge   Social account that is being merged (github, fb, twitter, google)
 * @apiParam {String} body.socialID         OAuth ID of the social account that is being merged
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Object} data.profile  The profile that was merged and removed from the database
 * @apiUse AuthorizationError
 * @apiError (500) InternalServerError An error occured finding, updating, saving, or removing the old socia
 * account
 */
app.post('/merge-accounts', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var socialToMerge = req.body.accountToMerge;
    var socialID = req.body.socialID;
    if (!socialToMerge || !socialID) {
        res.status(400);
        console.log('[MergeAccounts] no socialToMerge or socialID: ', socialToMerge, socialID)
        res.send({
            error: true,
            message: 'Bad request. Must include the name of the social to merge and the social account\'s id'
        })
        return;
    }
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.error("[MergeAccounts] - error finding user: ", err);
            // res.status(500);
            res.send({
                error: err
            })
        } else if (user) {
            var options;
            switch (socialToMerge) {
                case 'google':
                    options = {
                        'google.id': socialID
                    }
                    break;
                case 'fb':
                    options = {
                        'fb.id': socialID
                    }
                    break
                case 'github':
                    options = {
                        'github.id': socialID
                    }
                    break
                case 'twitter':
                    options = {
                        'twitter.id': socialID
                    }
                    break
                default:
                    console.warn("[MergeAccounts] - provided unsupported social: ", socialToMerge);
                    res.status(500)
                    res.send({
                        error: true,
                        message: "Unsupported social account requested"
                    })
                    return;
            }

            User.findOne(options, (err, userToMerge) => {
                if (err) {
                    // res.status(500);
                    res.send({
                        error: err
                    })
                } else if (userToMerge) {
                    console.log('[MergeAccounts] - user to merge: ', userToMerge);
                    //change author of all submissions to user._id
                    //move all submission._id's from userToMerge.submissions to user.submissions
                    Submission.find({
                        author: userToMerge._id
                    }, (err, submissions) => {
                        submissions.forEach(function (submission) {
                            submission.author = user._id;
                            submission.save();
                        }, this);
                    })
                    userToMerge.submissions.forEach((submissionID) => {
                        user.submissions.push(submissionID);
                    })
                    user[socialToMerge] = userToMerge[socialToMerge]
                    console.log('[MergeAccounts] - done moving submissions')
                    user.save((err) => {
                        if (err) {
                            // res.status(500)
                            console.log('[MergeAccounts] - Error saving user');
                            res.send({
                                error: true,
                                message: "Error saving user"
                            })
                        } else {
                            const addedSocial = Object.assign(userToMerge)
                            userToMerge.remove((err) => {
                                if (err) {
                                    //TODO: Figure out what to do here
                                    // res.status(500);
                                    console.log('[MergeAccounts] - Error removing user');
                                    res.send({
                                        error: true,
                                        message: "Error deleting old user"
                                    })
                                } else {
                                    console.log('[MergeAccounts] - success')
                                    res.send({profile: addedSocial})
                                }
                            });
                        }
                    });
                } else {
                    console.log('[MergeAccounts] - Couldn\'t find user with associated social account')
                    // res.status(404);
                    res.send({
                        error: true,
                        message: "Couldn't find user with associated social account"
                    })
                }

            });
        } else {
            console.log('[MergeAccounts] - Coulnd\'t find user');
            // res.status(404);
            res.send({
                error: 'Couln\'t find user'
            })
        }
    });
})

/**
 * @api {post} /api/edit-profile/delete-account
 * @apiGroup Delete Profile
 * @apiName DeleteAccount
 */
 app.post('/delete-account', passport.authenticate('jwt', {
   session: false
 }), (req, res) => {
   res.json({
     message: 'YAPIEEE!'
   });
 });
// app.post('/delete-account', passport.authenticate('jwt', {
//   session: false
// }), (req, res) => {
//
//   res.json({message: 'WELCOME TO DELETE_ACCOUNT'})
// });


// Helper methods ==================================================
const oneSocial = (user) => {
    var total = (user.github.id !== null) +
        (user.twitter.id !== null) +
        (user.fb.id !== null) +
        (user.google.id !== null);

    return total == 1 ? true : false
}
module.exports = app;
