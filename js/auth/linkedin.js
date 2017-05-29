/**
 * Created by tlyon on 5/26/17.
 */
//todo: resolve error 'callback uri does not match registered value'
var passport = require('passport');
var LIStrategy = require('passport-linkedin-oauth2').Strategy;
var User = require('../db/models/User');
var config = require('./_config');

passport.use('linkedin', new LIStrategy({
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: config.linkedin.callbackURL
    },
    function (access_token, refreshToken, profile, done) {
        process.nextTick(function () {
            console.log("Finding user...");
            User.findOne({'linkedin.id': profile.id}, function (err, user) {
                if (err) {
                    console.log("Error finding user");
                    return done(err);
                } else {
                    if(user){
                        console.log("Found user");
                        return done(null, user);
                    } else {
                        console.log("Creating new user");
                        var newUser = new User();

                        console.log("Linkedin profile: ", profile);
                        //set LinkedIn info
                        newUser.linkedin.id = profile.id;
                        newUser.linkedin.access_token = access_token;

                        //set other info
                        newUser.name = profile.name;
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

                        newUser.save(function (err) {
                            if(err){
                                console.log("Error creating new linkedin user: ", err);
                                return done(err);
                            } else {
                                console.log("New linkedin user created!");
                                return done(null, newUser);
                            }
                        });
                    }
                }
            })
        })
    }
));

module.exports = passport;