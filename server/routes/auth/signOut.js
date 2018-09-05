var passport = require('../../js/auth/twitter');
var express = require('express');
var isAuthenticated = require('./isAuthenticated').isAuthenticated;
const jwtAuth = require('../../js/auth/jwt');
const jwt = require('jsonwebtoken');
const qs = require('query-string');

var app = express.Router();

app.get('/', jwtAuth.authenticate('jwt', {session:false}), (req, res) => {
    //TODO: invalidate token
    console.log("user signed out!");
    // destory the session
    req.session.destroy();
    // logout req.user
    req.logout();
    res.sendStatus(200);
});

module.exports = app;
