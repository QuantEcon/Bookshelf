const passport = require('../../js/auth/dev');
var express = require('express');
var app = express.Router();

app.use(function (req, res, next) {
    console.log('[DevLogin] - req.url:', req.url)
    console.log('[DevLogin] - req.body:', req.body);
    console.log('[DevLogin] - authorization: ', req.headers['authorization']);
    next();
})

app.post('/api/auth/devlogin', passport.authenticate('local', {
    session: 'true'
}), (req, res) => {
    console.log('authenticated')
    res.status(200)
})

module.exports = app;