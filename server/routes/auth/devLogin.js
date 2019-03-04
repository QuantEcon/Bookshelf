var express = require('express');
var app = express.Router();

module.exports = function(passport) {
    console.log('this is the first one')
    app.use(function (req, res, next) {
        console.log('[DevLogin] - req.url:', req.url)
        console.log('[DevLogin] - req.method:', req.url)
        console.log('[DevLogin] - req.body:', req.body);
        console.log('[DevLogin] - authorization: ', req.headers['authorization']);
        next();
    })

    app.post('/', passport.authenticate('local'), (req, res) => {
        console.log('authenticated')
        res.status(200)
    })
    return app;
}