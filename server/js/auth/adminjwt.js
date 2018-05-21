const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _config = require('../../_config');
const User = require('../db/models/User')
const AdminList = require('../db/models/AdminList')

var opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('jwt'), ExtractJwt.fromUrlQueryParameter('jwt')]),
    secretOrKey: "banana horse laser muffin"
}

const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial emailSettings new'

passport.use('adminjwt', new JwtStrategy(opts, function (jwt_payload, done) {
    if(jwt_payload.isAdmin){
        // Check userid is listed as an admin
        AdminList.findOne({}, (err, adminList) => {
            if(err){
                return done({message: "Error getting admin list from database", code: "5-10"}, null)
            } else if(adminList){
                console.log("[AdminJWT] - adminList: ", adminList)

                if(adminList.adminIDs && adminList.adminIDs.indexOf(jwt_payload.user._id) != -1){
                    User.findById(jwt_payload.user._id, (err, user) => {
                        if (err){
                            return done({message: "Error finding user in database", code:"5-11"})
                        } else if (user){
                            return done(null, user)
                        } else {
                            return done({message: "Couldn't find user in database", code:"5-20"}, null)
                        }
                    })
                } else {
                    // TODO: SOMETHING BAD IS HAPPENING. TOKEN SAID WAS ADMIN BUT NOT LISTED IN DATABASE
                    return done({message: "User is not listed in database as admin", code: "5-5"}, null)
                }
            } else {
                return done({message: "Admin list doesn't exist in database", code: "5-21"},null)
            }
        })
    } else {
        return done({message: "User is not admin", code: 5}, null)
    }
}));

module.exports = passport;