/**
 * Created by tlyon on 5/26/17.
 */
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./_config');
var User = require('../db/models/User');

passport.use('facebook', new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['email', 'link', 'displayName', 'photos']
    },
    function (access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            //find user based off of facebook ID
            User.findOne({'fb.id': profile.id}, function (err, user) {
                if (err) {
                    return done(err)
                } else {
                    if (user) {
                        return done(null, user); //user was found. log in
                    } else {
                        // no user with matching facebook id
                        // create new User
                        var newUser = new User();
                        console.log("Facebook profile: ", profile);
                        //set all fb info
                        newUser.fb.id = profile.id;
                        newUser.fb.access_token = access_token;
                        newUser.fb.url = profile.profileUrl;
                        newUser.fb.displayName = profile.displayName;
                        newUser.fb.hidden = false;
                        newUser.activeAvatar = 'fb';
                        if (profile.photos[0].value) {
                            newUser.fb.avatarURL = profile.photos[0].value;
                        } else {
                            newUser.fb.avatarURL = '/assets/img/default-avatar.png';
                        }
                        newUser.oneSocial = true;
                        //set all other info
                        newUser.twitter = {};
                        newUser.github = {};
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
                        if (profile.photos[0].value) {
                            newUser.avatar = profile.photos[0].value;
                        } else {
                            newUser.avatar = '/assets/img/default-avatar.png';
                        }
                        newUser.website = '';
                        if (profile.emails[0].value) {
                            newUser.email = profile.emails[0].value;
                        }

                        newUser.emailSettings = {
                            newComment: true,
                            newReply: true,
                            submission: true
                        }
                        newUser.summary = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

                        newUser.new = true;

                        //save user to db
                        newUser.save(function (err) {
                            if (err) {
                                console.log("Error creating new user: ", err);
                                return done(err);
                            } else {
                                //return user on success
                                console.log("New facebook user created");
                                return done(null, newUser);
                            }
                        });
                    }
                }
            })
        })
    }));

passport.use('addFB', new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.addCallbackURL,
        profileFields: ['email', 'link', 'displayName', 'photos'],
        passReqToCallback: true
    },
    function (req, access_token, refresh_token, profile, done) {
        process.nextTick(function () {
            //todo: check if profile is already registered with another account
            //find user
            User.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    //found user, add fb details to user
                    // console.log("Add fb profile: ", profile);

                    user.fb.id = profile.id;
                    user.fb.access_token = access_token;
                    user.fb.url = profile.profileUrl;
                    user.fb.displayName = profile.displayName;
                    user.fb.hidden = false;
                    user.fb.avatarActive = false;
                    if (profile.photos[0].value) {
                        user.fb.avatarURL = profile.photos[0].value;
                    } else {
                        user.fb.avatarURL = '/assets/img/default-avatar.png';
                    }
                    user.oneSocial = (user.twitter == {}) && (user.github == {}) && (user.google == {});

                    if (!user.email && profile.emails[0].value) {
                        user.email = profile.emails[0].value;
                    }

                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        } else {
                            return done(null, user);
                        }
                    })
                } else {
                    return done("Couldn't find matching user with _id");
                }
            });
        })
    })
);
module.exports = passport;