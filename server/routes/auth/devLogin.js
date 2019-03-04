const passport = require('../../js/auth/dev');
var express = require('express');
var app = express.Router();

app.post('', passport.authenticate('local', {
    session: 'true'
}), (req, res) => {
    console.log('authenticated')
    res.sendStatus(200)
})

module.exports = app;