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
    console.log('[ValidateToken] - req.url:',req.url);
    const isAdd = getParameterByName('isAdd', req.url);
    const profile = getParameterByName('profile', req.url);
    console.log('[ValidateToken] - idAdd: ', isAdd);    
    console.log('[ValidateToken] - profile: ', isAdd);

    if (isAdd) {
        console.log('[ValidateToken] - is add. delete and send')
        User.findById(req.user._id).remove();
        console.log('[ValidateToken] - req.user: ', req.user[profile]);
        res.send({
            profile: req.user[profile]
        })
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