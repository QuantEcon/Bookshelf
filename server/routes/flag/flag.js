var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const passport = require('../../js/auth/jwt');
const bodyParser = require('body-parser');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');
var AdminList = require('../../js/db/models/AdminList')

const notificationTypes = require("../../js/notifications").notificationTypes
const sendNotification = require('../../js/notifications').sendNotification

var app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/submission", (req, res) => {
    if(req.body.submissionID){
        Submission.findById(req.body.submissionID, (err, submission) => {
            if(err){
                res.sendStatus(500)
            } else if(submission){
                var notify = true
                if(submission.flagged) {
                    notify = false
                }
                submission.flagged = true
                submission.flaggedReason = req.body.flaggedReason;
                submission.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
                        // TODO: Send notification to admins
                        if(notify){
                            AdminList.findOne({}, (err, adminList) => {
                                if(err){
                                    console.warn("[FlagSubmission - Admin] - error finding admin list: ", err)
                                } else if(adminList){
                                    User.find({_id: {$in: adminList.adminIDs}}, (err, admins) => {
                                        if(err){
                                            console.warn("[FlagSubmission - Admin] - error finding admin details: ", err)
                                        } else if(admins){
                                            console.log("Sending email to admins...")
                                            admins.forEach(admin => {
                                                if(admin.email){
                                                    sendNotification({
                                                        recipient: {
                                                            email: admin.email,
                                                            name: admin.name
                                                        },
                                                        contentType: 'submission',
                                                        flaggedReason: req.body.flaggedReason,
                                                        type: notificationTypes.CONTENT_FLAGGED
                                                    })
                                                }
                                            });
                                        } else {
                                            console.warn("[FlagSubmission - Admin] - no admins found with ids: ", adminList.adminIDs)
                                        }
                                    })
                                } else {
                                    console.warn("[FlagSubmission - Admin] - no admin list in database!");
                                }
                            })
                        }

                        res.sendStatus(200)
                    }
                })
            } else {
                console.log("[Flag] (submission) - no submission found with id ", req.body.submissionID)
                res.sendStatus(404)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/user", (req, res) => {
    if(req.body.userID){
        User.findById(req.body.userID, (err, user) => {
            if(err){
                res.sendStatus(500)
            } else if(user){
                console.log("inside of /user", user);
                var notify = true
                if(user.flagged){
                    notify = false
                }
                user.flagged = true
                user.flaggedReason = req.body.flaggedReason
                user.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
                        // TODO: Send notification to admins
                        if(notify){
                            AdminList.findOne({}, (err, adminList) => {
                                if(err){
                                    console.warn("[FlagUser - Admin] - error finding admin list: ", err)
                                } else if(adminList){
                                    User.find({_id: {$in: adminList.adminIDs}}, (err, admins) => {
                                        if(err){
                                            console.warn("[FlagUser - Admin] - error finding admin details: ", err)
                                        } else if(admins){
                                            admins.forEach(admin => {
                                                if(admin.email){
                                                    sendNotification({
                                                        recipient: {
                                                            email: admin.email,
                                                            name: admin.name
                                                        },
                                                        contentType: 'user',
                                                        flaggedReason: req.body.flaggedReason
                                                    })
                                                }
                                            });
                                        } else {
                                            console.warn("[FlagUser - Admin] - no admins found with ids: ", adminList.adminIDs)
                                        }
                                    })
                                } else {
                                    console.warn("[FlagUser - Admin] - no admin list in database!");
                                }
                            })
                        }


                        res.sendStatus(200)
                    }
                })
            } else {
                res.sendStatus(404)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/comment", (req, res) => {
    if(req.body.commentID){
        Comment.findById(req.body.commentID, (err, comment) => {
            if(err){
                res.sendStatus(500)
            } else if(comment){
                var notify = true;
                if(comment.flagged){
                    notify = false
                }
                comment.flagged = true
                comment.flaggedReason = req.body.flaggedReason
                comment.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
                        console.log("Flagged comment!")

                        // TODO: Send notification to admins
                        if(notify){
                            AdminList.findOne({}, (err, adminList) => {
                                if(err){
                                    console.warn("[FlagComment - Admin] - error finding admin list: ", err)
                                } else if(adminList){
                                    User.find({_id: {$in: adminList.adminIDs}}, (err, admins) => {
                                        if(err){
                                            console.warn("[FlagComment - Admin] - error finding admin details: ", err)
                                        } else if(admins){
                                            admins.forEach(admin => {
                                                if(admin.email){
                                                    sendNotification({
                                                        type: notificationTypes.CONTENT_FLAGGED,
                                                        recipient: {
                                                            email: admin.email,
                                                            name: admin.name
                                                        },
                                                        contentType: 'Comment',
                                                        flaggedReason: req.body.flaggedReason
                                                    })
                                                }
                                            });
                                        } else {
                                            console.warn("[FlagComment - Admin] - no admins found with ids: ", adminList.adminIDs)
                                        }
                                    })
                                } else {
                                    console.warn("[FlagComment - Admin] - no admin list in database!");
                                }
                            })
                        }

                        res.sendStatus(200)
                    }
                })
            } else {
                res.sendStatus(404)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

module.exports = app
