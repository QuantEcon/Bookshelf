/**
 * Created by tlyon on 5/26/17.
 */

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('./_config');
var User = require('../db/models/User');

passport.use('github', new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    },
    function (access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            User.findOne({'github.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        return done(null, user)
                    } else {
                        var newUser = new User();

                        //set github info
                        newUser.github.id = profile.id;
                        newUser.github.access_token = access_token;
                        newUser.github.url = profile.url;

                        //set all other info
                        newUser.name = profile.login;
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];
                        if (profile.avatar_url) {
                            newUser.avatar = profile.avatar_url;
                        } else {
                            newUser.avatar = '/assets/img/default-avatar.png';
                        }
                        if (profile.email) {
                            newUser.email = profile.email;
                        } else {
                            newUser.email = '';
                        }

                        newUser.website = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new github user: ", err);
                                return done(err);
                            } else {
                                console.log("New github user created");
                                return done(null, newUser);
                            }
                        });
                    }
                }
            });
        })
    }));

//todo: need to get the user._id to be able to add github info
passport.use('addGithub', new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.addCallbackURL
    },
    function (access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            //todo: User.findOne({_id: user._id}, function(err, user){}
        })
    }
));

module.exports = passport;