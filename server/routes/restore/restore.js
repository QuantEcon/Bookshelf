const express = require('express');
const appConfig = require('../../_config')
const bodyParser = require('body-parser');
var fs = require('fs');

// import model schemas
const User = require('../../js/db/models/User');
const { sitemapPath, sitemapFunction } = require('../../js/sitemap')

// import an instance from express Router
const app = express.Router();

// Bodyparser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * @api {post} /api/restore Restore User
 * @apiGroup Restore
 * @apiName RestoreUser
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Restore the user
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} body.user User who has been deleted
 *
 * @apiError (500) InternalServerError An error occurred finding, updating, or saving the user
 * @apiUse AuthorizationError
 */
app.post('/', (req, res) => {
    const user = req.body.user;
    User.findOne({_id: user._id}, (err, user) => {
        if(err) {
            res.sendStatus(500);
        } else if(user) {
            // change user.deleted to false to restore
            user.deleted = false;
            user.save((err, user) => {
                if(err) {
                    res.sendStatus(500);
                } else {
                    // updating the sitemap to reflect the restoration of user
                    sitemapFunction().then((resp) => {
                        fs.writeFileSync(sitemapPath, resp.toString());
                    })
                    res.send({message: 'Success'});
                }
            })
        }
    })
});

// export the app to be used elsewhere
module.exports = app;
