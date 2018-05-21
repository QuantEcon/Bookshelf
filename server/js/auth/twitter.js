/**
 * Created by tlyon on 5/26/17.
 */

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('./_config');
var User = require('../db/models/User');

passport.use('twitter', new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
    },
    function (access_token, token_secret, profile, done) {
        process.nextTick(function () {
            User.findOne({'twitter.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        console.log("twitter profile: ", profile);
                        //set twitter info
                        newUser.twitter.id = profile.id;
                        newUser.twitter.access_token = access_token;
                        newUser.twitter.username = profile.username;

                        newUser.twitter.url = 'https://twitter.com/' + profile.username;

                        newUser.activeAvatar = 'twitter';
                        if (profile._json.profile_image_url) {
                            newUser.twitter.avatarURL = profile._json.profile_image_url.replace('_normal','');
                        } else {
                            newUser.twitter.avatarURL = '/assets/img/default-avatar.png';
                        }


                        newUser.oneSocial = true;

                        //set all other info
                        newUser.github = {};
                        newUser.fb = {};
                        newUser.google = {};

                        newUser.name = profile.displayName;
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];
                        newUser.emailSettings = {
                            newComment: true,
                            newReply: true,
                            submission: true
                        }

                        if (profile._json.profile_image_url) {
                            newUser.avatar = profile._json.profile_image_url.replace('_normal','');
                        } else {
                            newUser.avatar = '/assets/img/default-avatar.png';
                        }
                        if (profile.email) {
                            newUser.email = profile.email;
                        } else {
                            newUser.email = '';
                        }

                        newUser.summary = '';

                        newUser.website = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

                        newUser.new = true;

                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new twitter user: ", err);
                                return done(err);
                            } else {
                                return done(null, newUser);
                            }
                        });
                    }
                }
            });
        });
    }
));

passport.use('addTwitter', new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.addCallbackURL,
        passReqToCallback: true
    },
    function (req, access_token, token_secret, profile, done) {
        console.log('[AddTwitter] - in method:', req.user);
        process.nextTick(function () {
            //todo: check if profile is already registered with another account
            //find user with req.user._id
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    // add twitter details to user
                    // console.log("Add twitter profile: ", profile);
                    user.twitter.id = profile.id;
                    user.twitter.access_token = access_token;
                    user.twitter.username = profile.username;
                    if (profile._json.profile_image_url) {
                        user.twitter.avatarURL = profile._json.profile_image_url.replace('_normal','');
                    } else {
                        user.twitter.avatarURL = '/assets/img/default-avatar.png';
                    }

                    user.oneSocial = (user.github == {}) && (user.fb == {}) && (user.google == {});

                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        } else {
                            return done(null, user);
                        }
                    })
                } else {
                    return done("Couldn't find user with matching _id");
                }
            })
        })
    })
);

module.exports = passport;