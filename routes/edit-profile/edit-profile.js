var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const bodyParser = require('body-parser');
const passport = require('../../js/auth/jwt');


var User = require('../../js/db/models/User');

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
                res.status(500);
                res.send({
                    error: true,
                    message: err
                });
            } else if (user) {
                if (type === 'github') {
                    user.github = {};
                } else if (type === 'twitter') {
                    user.twitter = {};
                } else if (type === 'fb') {
                    user.fb = {};
                } else if (type === 'google') {
                    user.google = {};
                }
                //update one social
                var total = (user.github.id !== null) +
                    (user.twitter.id !== null) +
                    (user.fb.id !== null) +
                    (user.google.id !== null);
                if (total === 1) {
                    console.log("Now only have one social");
                    user.oneSocial = true;
                }
                user.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send({
                            error: true,
                            message: err
                        })
                    } else {
                        console.log("Removed social");
                        res.sendStatus(200);
                    }
                })
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

module.exports = app;