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
        callbackURL: config.facebook.callbackURL
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

                        //set all fb info
                        newUser.fb.id = profile.id;
                        newUser.fb.access_token = access_token;

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
                        newUser.avatar = '/assets/img/default-avatar.png';

                        newUser.website = '';
                        newUser.email = '';

                        newUser.flagged = false;
                        newUser.deleted = false;

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

//todo: addFB passport strategy

module.exports = passport;