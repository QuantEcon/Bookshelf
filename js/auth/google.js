/**
 * Created by tlyon on 5/26/17.
 */
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var config = require('./_config');
var appConfig = require('../../_config');
var User = require('../db/models/User');

passport.use('google', new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        realm: appConfig.url
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({'google.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        console.log("Google profile: ", profile);

                        //set up google info
                        newUser.google.id = profile.id;
                        newUser.google.avatarURL = profile._json.image.url;
                        newUser.google.hidden = false;
                        newUser.google.displayName = profile.displayName;
                        newUser.google.access_token = accessToken;

                        newUser.oneSocial = true;
                        newUser.activeAvatar = 'google';

                        //set up other info
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];

                        newUser.email = profile.email;
                        newUser.avatar = profile._json.image.url;
                        newUser.name = profile.displayName;

                        newUser.website = '';
                        newUser.email = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new google user: ", err);
                                return done(err);
                            } else {
                                console.log("New google account created!");
                                return done(null, newUser);
                            }
                        })
                    }
                }
            })
        })
    }
));

passport.use('addGoogle', new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.addCallbackURL
    },
    function (req, access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            User.findOne({_id: req.user._id}, function (err, user) {
                if(err){
                    return done(err);
                } else if(user){
                    user.google.id = profile.id;
                    user.google.avatarURL = profile._json.image.url;
                    user.google.hidden = false;
                    user.google.displayName = profile.displayName;
                    user.google.access_token = accessToken;

                    user.oneSocial = (user.twitter == {}) && (user.github == {}) && (user.fb == {});

                    user.save(function (err) {
                        if(err){
                            return done(err);
                        } else {
                            return done(null, user);
                        }
                    })
                } else {
                    return done ("Couldn't find user with id");
                }
            })
        })
    })
);

module.exports = passport;