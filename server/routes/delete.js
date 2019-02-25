var express = require('express');
var passport = require('../js/auth/jwt');
const bodyParser = require('body-parser');

var User = require('../js/db/models/User');
var Submission = require('../js/db/models/Submission');
var Comment = require('../js/db/models/Comment');
const AdminList = require('../js/db/models/AdminList')

var app = express.Router();

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
    let deleteSubmission = (submission, user) => {
        submission.deleted = true;
        submission.deletedDate = Date.now()
        // go through and delete comments???
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
                    console.log(user.submissions, "user submissions are here")

                    // submitted by user
                    if (user.submissions.indexOf(req.body.submissionID) != -1) {
                        console.log("submitted by user")
                        user.submissions = user.submissions.filter((id) => {
                            console.log("Checking ", id, " against ", req.body.submissionID)
                            return id != req.body.submissionID
                        })
                        deleteSubmission(submission, user)
                    } else {
                        // check if the user is an Admin
                        console.log("not submitted by user")
                        AdminList.findOne({}, (err, adminList) => {
                            if(err){
                                res.status(500)
                                res.send({
                                    error: true,
                                    message: err
                                })
                            } else {
                                console.log(typeof(adminList['adminIDs'][0]))
                                console.log(req.user._id)
                                for (adminID of adminList['adminIDs'].toObject()) {
                                    console.log(adminID)
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
                                    deleteSubmission(submission, user)
                                }
                                // if (adminList['adminIDs'].includes(String(req.user._id))) {
                                //     console.log('I am an admin')
                                // } else {
                                //     console.log('I am not')
                                // }
                                //res.sendStatus(401)
                                // User.find({_id: {$in: adminList.adminIDs}}, (err, users) => {
                                //     if(err){
                                //         res.status(500)
                                //         console.log("[Admin] - error: ", err)
                                //         res.send({
                                //             error: true,
                                //             message: err
                                //         })
                                //     } else if(users){
                                //         res.send(users)
                                //     } else {
                                //         res.status(401)
                                //         res.send({
                                //             error: true,
                                //             message: "There are no admins in the database"
                                //         })
                                //     }
                                // })
                            }
                        })
                    }
                    // submission.deleted = true;
                    // submission.deletedDate = Date.now()
                    // go through and delete comments???
                    // submission.save();
                    // user.deletedSubmissions.push(req.body.submissionID)
                    // user.save()
                    //res.sendStatus(200)
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
