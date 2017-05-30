var passport = require('../../js/auth/facebook');

// fb login ================
// add fb to existing user
app.get('/auth/fb/add', isAuthenticated, passport.authenticate('addFB', {scope: 'email'}));
app.get('/auth/fb/callback/add',
    passport.authenticate('addFB', {
        successRedirect: '/user/my-profile/edit',
        failureRedirect: '/user/my-profile/add-failed'
    })
);
// register new user with fb
app.get('/auth/fb', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/fb/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/failure'}),
    function (req, res) {
        if (req.user.new) {
            res.redirect('/complete-registration');
        } else {
            res.redirect('/user/my-profile');
        }
    }
);