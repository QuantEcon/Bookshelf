const passport = require('../../js/auth/jwt');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../js/db/models/User')
const url = require('url')
var app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.options('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.sendStatus(200);
});

app.get('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log('[ValidateToken] - req.url:', req.url);
    const isAdd = getParameterByName('isAdd', req.url);
    const profile = getParameterByName('profile', req.url);
    console.log('[ValidateToken] - idAdd: ', isAdd);
    console.log('[ValidateToken] - profile: ', profile);

    if (isAdd) {
        //check to see if it already exists
        console.log('[ValidateToken] - is add')
        if (req.user.isNew) {
            console.log('[ValidateToken] - profile is new')
            User.findById(req.user._id).remove(function () {
                console.log('[ValidateToken] - req.user: ', req.user[profile]);
                res.send({
                    profile: req.user[profile]
                })
            });
        } else {
            // profile is not new, ask if user wants to merge
            console.log('[ValidateToken] - profile already exists')
            res.send({
                error: {
                    status: 4,
                    message: 'A user alread exists with given social account'
                },
                user: req.user
            })
        }

    } else {
        console.log('[ValidateToken] - normal login');
        res.send({
            user: req.user,
            provider: req.user.currentProvider,
            uid: req.user._id,
            token: req.headers['access-token']
        })
    }

})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

module.exports = app