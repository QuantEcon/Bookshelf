const passport = require('../../js/auth/jwt');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const User = require('../../js/db/models/User')
const url = require('url')
var app = express.Router();
const AdminList = require('../../js/db/models/AdminList')
const { sitemapPath, sitemapFunction } = require('../../js/sitemap')

// Bodyparser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.options('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.sendStatus(200);
});

/**
 * @api {get} /api/auth/validate-token Validate Token
 * @apiGroup Authentication
 * @apiName ValidateToken
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Validates a JWT token and returns the user database object associated
 * with the token.
 *
 * If the user is adding another social account to an existing account, only the social
 * profile will be returned
 *
 * @apiUse AuthorizationHeader
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Object} data.user     Database user object associated with the token
 * @apiSuccess (200) {String} data.provider Social account used to sign in with (google, github, fb, twitter)
 * @apiSuccess (200) {String} data.uid      Database user ID
 * @apiSuccess (200) {String} data.token    JSON Web Token
 * @apiSuccess (200) {Object} data.profile   (ONLY RETURNED IF ADDING SOCIAL) Social profile added to the user's account
 *
 * @apiUse AuthorizationError
 *
 */
app.get('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    const isAdd = getParameterByName('isAdd', req.url);
    const profile = getParameterByName('profile', req.url);

    if (isAdd) {
        //check to see if it already exists
        console.log('[ValidateToken] - is add')
        if (req.user.new) {
            console.log('[ValidateToken] - profile is new')
            User.findById(req.user._id).remove(function () {
                console.log('[ValidateToken] - req.user: ', req.user[profile]);
                res.send({
                    profile: req.user[profile]
                })
            });
            // updating the sitemap to reflect the addition of a user account
            sitemapFunction().then((resp) => {
                fs.writeFileSync(sitemapPath, resp.toString());
            })
        } else {
            // profile is not new, ask if user wants to merge
            console.log('[ValidateToken] - profile already exists')
            res.send({
                error: {
                    status: 4,
                    message: 'A user already exists with given social account'
                },
                user: req.user
            })
        }

    } else {
        console.log('[ValidateToken] - normal login');
        let isAdmin = false;
        if(req.user._id) {
            AdminList.findOne({}, (err, adminList) => {
                if(err){
                    console.log("[ValidateToken] - error getting admin list: ", err)
                } else if (adminList){
                    for (adminID of adminList.adminIDs.toObject()) {
                        if (String(adminID) == String(req.user._id)) {
                            isAdmin = true;
                        }
                    }
                }
            })
            //find if user has been deleted
            User.findOne({'_id': req.user.id}, (err, user) => {
                const userDeleted = user.deleted;
                let userRequestObj = Object.assign({}, req.user.toObject(), { isAdmin: isAdmin})
                if(userDeleted){
                    res.send({
                        error: {
                            message: 'deleted'
                        },
                        user
                    })
                } else {
                    res.send({
                        user: userRequestObj,
                        provider: req.user.currentProvider,
                        uid: userRequestObj._id,
                        token: req.headers['access-token'],
                        isAdmin: isAdmin,
                        error: {
                            message: 'active'
                        }
                    })
                }
            });
        }
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
