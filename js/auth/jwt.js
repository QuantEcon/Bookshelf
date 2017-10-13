const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _config = require('../../_config');
const User = require('../db/models/User')

var opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('jwt'), ExtractJwt.fromUrlQueryParameter('jwt')]),
    secretOrKey: "banana horse laser muffin"
}
const select = 'name views numComments joinDate voteScore position submissions upvotes downvotes' +
' avatar website email summary activeAvatar currentProvider github fb twitter google oneSocial'
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
        _id: jwt_payload.user._id
    }, select, function (err, user) {
        if (err) {
            console.log('[JWTStrategy] - error finding user:', err);
            return done(err, false)
        } else if (user) {
            // console.log('[JWTStrategy] - found user: ', user);
            done(null, user);
        } else {
            console.log('[JWTStrategy] - no user');
            done(null, false);
        }
    })
}));

module.exports = passport;