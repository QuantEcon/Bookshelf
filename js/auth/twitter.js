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

                        //set all other info
                        newUser.name = profile.displayName;
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];

                        if (profile.profile_image_url) {
                            newUser.avatar = profile.profile_image_url;
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

                        newUser.new = true;

                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new twitter user: ", err);
                                return done(err);
                            } else {
                                //todo: redirect to complete-registration
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
        process.nextTick(function () {
            //find user with req.user._id
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    // add twitter details to user

                    user.twitter.id = profile.id;
                    user.twitter.access_token = access_token;
                    user.twitter.username = profile.username;

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