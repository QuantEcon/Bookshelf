var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const bodyParser = require('body-parser');
const passport = require('../../js/auth/jwt');
const sprintf = require('sprintf')


var User = require('../../js/db/models/User');
const Submission = require('../../js/db/models/Submission')

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

// Routes =======================================================
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

// Helper methods ==================================================
const oneSocial = (user) => {
    var total = (user.github.id !== null) +
        (user.twitter.id !== null) +
        (user.fb.id !== null) +
        (user.google.id !== null);

    return total == 1 ? true : false
}
module.exports = app;