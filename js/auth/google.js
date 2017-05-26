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
    function (googleId, done) {
        process.nextTick(function () {
            User.findOne({'google.id': googleId}, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        //set up google info
                        newUser.google.id = googleId;

                        //set up other info
                        newUser.views = 0;
                        newUser.numComments = 0;
                        newUser.joinDate = new Date();
                        newUser.voteScore = 0;
                        newUser.position = '';
                        newUser.submissions = [];
                        newUser.upvotes = [];
                        newUser.downvotes = [];
                        newUser.email = '';
                        newUser.avatar = '/assets/img/default-avatar.png';

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