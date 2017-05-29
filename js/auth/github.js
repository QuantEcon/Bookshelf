/**
 * Created by tlyon on 5/26/17.
 */

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('./_config');
var User = require('../db/models/User');

//registering new user with github
passport.use('github', new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    },
    function (access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            console.log("In github callback");
            User.findOne({'github.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        return done(null, user)
                    } else {
                        var newUser = new User();
                        console.log("Github profile: ", profile);
                        //set github info
                        newUser.github.id = profile.id;
                        newUser.github.access_token = access_token;
                        newUser.github.url = profile.profileUrl;
                        newUser.github.username = profile.username;
                        newUser.github.hidden = false;

                        //set all other info
                        if (profile.displayName) {
                            newUser.name = profile.displayName;
                        }
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];
                        if (profile._json.avatar_url) {
                            newUser.avatar = profile._json.avatar_url;
                        } else {
                            newUser.avatar = '/assets/img/default-avatar.png';
                        }
                        if (profile._json.email) {
                            newUser.email = profile._json.email;
                        } else {
                            newUser.email = '';
                        }

                        newUser.website = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

                        newUser.new = true;

                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new github user: ", err);
                                return done(err);
                            } else {
                                console.log("New github user created");
                                //todo: redirect to complete-registration
                                return done(null, newUser);
                            }
                        });
                    }
                }
            });
        })
    }));

// adding github details to user
passport.use('addGithub', new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.addCallbackURL,
        passReqToCallback: true
    },
    function (req, access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            //todo: what to do if github.id already exists?
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        //add github credentials to user
                        user.github.id = profile.id;
                        user.github.access_token = access_token;
                        user.github.url = profile.profileUrl;
                        user.github.username = profile.username;
                        user.github.hidden = false;
                        console.log("In add github: ", user);
                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            } else {
                                return done(null, user);
                            }
                        });
                    } else {
                        return done("Couldn't find matching user with _id");
                    }
                }
            });
        })
    }
));

module.exports = passport;