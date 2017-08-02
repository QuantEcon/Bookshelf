// const passport = require('../../js/auth/jwt');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //not authenticated
        console.log('not authenticated');
        if (/^\/user\/my-profile/.test(req.url)) {
            res.redirect('/login');
        }
        else {
            return next();
        }
    }
};



module.exports = {
    isAuthenticated,
};