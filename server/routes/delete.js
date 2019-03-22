const express = require('express');
const passport = require('../js/auth/jwt');
const bodyParser = require('body-parser');

const User = require('../js/db/models/User');
const Submission = require('../js/db/models/Submission');
const AdminList = require('../js/db/models/AdminList')

const app = express.Router();

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

/**
 * @api {post} /api/delete/submission Delete Submission
 * @apiGroup Delete
 * @apiName DeleteSubmission
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Marks the submission as deleted in the database, removes submission ID
 * from the user's submissions and adds it to the user's deleted submisssions
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam {Object} body
 * @apiParam {String} body.submissionID ID of the submission being deleted
 *
 * @apiError (500) InternalServerError An error occurred finding, updating, or saving the submission document
 * @apiUse AuthorizationError
 */
app.post('/submission', passport.authenticate('jwt', {
    session: 'false'
}), (req, res) => {

    // function to set deleted flag in submission and save the information in the corresponding user object
    let deleteSubmission = (submission, user) => {
        submission.deleted = true;
        submission.deletedDate = Date.now()
        submission.save();
        user.deletedSubmissions.push(req.body.submissionID)
        user.save()
        res.sendStatus(200)
    }
    Submission.findById(req.body.submissionID, (err, submission) => {
        if (err) {
            res.status(500);
            res.send({
                error: err
            });
        } else {
            // find the user with the submission
            User.findOne({
                _id: req.user._id
            }, (err, user) => {
                if(err){
                    console.warn("[DeleteSubmssion] - error occured finding author:",err)
                    res.status(500)
                    res.send({
                        error: err
                    })
                } else if (user) {
                    let isAdmin = false;

                    // submitted by user
                    if (user.submissions.indexOf(req.body.submissionID) != -1) {
                        user.submissions = user.submissions.filter((id) => {
                            console.log("Checking ", id, " against ", req.body.submissionID)
                            return id != req.body.submissionID
                        })
                        // updating the sitemap to reflect the deletion of a notebook
                        sitemapFunction().then((resp) => {
                            fs.writeFileSync(sitemapPath, resp.toString());
                        })
                        deleteSubmission(submission, user)
                    } else {
                        // else check if the user is an Admin
                        AdminList.findOne({}, (err, adminList) => {
                            if(err){
                                res.status(500)
                                res.send({
                                    error: true,
                                    message: err
                                })
                            } else {
                                for (adminID of adminList['adminIDs'].toObject()) {
                                    if (String(adminID) === String(req.user._id)) {
                                        isAdmin = true;
                                        console.log(adminID, "matched")
                                        break;
                                    }
                                }
                                if (!isAdmin) {
                                    res.sendStatus(401)
                                    res.send({
                                        error: true,
                                        message: err
                                    })
                                } else {
                                    User.findOne({
                                        _id: submission.author
                                    }, (err, user)=> {
                                        deleteSubmission(submission, user)
                                    })
                                }
                            }
                        })
                    }
                }
                else {
                    console.warn("[DeleteSubmission] - couldn't find author")
                    res.status(500)
                    res.send({
                        error: "Couldn't find author"
                    })
                }
            })
        }
    })
})

module.exports = app;

// This route is in ../app.js
// Added it here because of complications with apiDoc

/**
 * @api {get} /api/about Get About Page
 * @apiGroup Information
 * @apiName GetAboutPage
 *
 * @apiDescription Returns the text to display on the About page
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {String} data.content Contents of the About page
 *
 * @apiError (500) InternalServerError An occurred reading the About page file
 */
