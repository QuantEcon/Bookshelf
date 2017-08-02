const passport = require('../../js/auth/jwt');
const express = require('express');

var app = express.Router();

app.options('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.sendStatus(200);
});

app.get('/', passport.authenticate('jwt', {session:false}), function(req, res){
    // console.log('[ValidateToken] - req.user: ', req.user);
    res.send({
        user: req.user,
        provider: req.user.currentProvider,
        uid: req.user._id,
        token: req.headers['access-token']
    })
})

module.exports = app