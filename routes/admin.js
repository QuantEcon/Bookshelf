var express = require('express')
var passport = require('../js/auth/adminjwt')
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
 * Flags the submission given by submissionID as deleted
 */
app.post("/delete-submission", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete submission
    if(req.body.submissionID){
        Submission.findById(req.body.submissionID, (err, submission) => {
            if(err){
                res.status(500)
                res.send({error: true, message: "Error finding submission", err})
            } else if(submission){
                submission.deleted = true
                submission.save((err) => {
                    if(err){
                        res.status(500)
                        res.send({error: true, message: "Error saving after deleting", err})
                    } else {
                        res.send("Delete successful!")
                    }
                })
            } else {
                res.status(400)
                res.send({error: true, message: "Couldn't find submission with ID " + req.body.submissionID})
            }
        })
    } else {
        res.sendStatus(400)
    }
})

/**
 * Removes the submission given by submissionID from the database along
 * with it's comments and replies
 */
app.post("/remove-submission", passport.authenticate("adminjwt", {
    session: 'false'
}), (req, res) => {
    if(req.body.submissionID){
        // TODO: remove submission, comments, and replies from database
    } else {
        res.sendStatus(400)
    }
})

app.post("/make-admin", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if(req.body.userID){
        AdminList.findOne({}, (err, adminlist) => {
            if(err){
                res.status(500)
                res.send({error:true, message: "Error finding admin list", err})
            } else if(adminlist){
                if(adminlist.length > 5){
                    adminlist.adminIDs.append(req.body.userID)
                    adminlist.save((err) => {
                        if(err){
                            res.status(500)
                            res.send({error: true, message: "Error saving admin list", err})
                        } else {
                            res.sendStatus(200)
                        }
                    })
                } else {
                    res.send({error: true, message: "Reached maxmium amount of admins"})
                }
            } else {
                res.status(500)
                res.send({error:true, message: "Error finding admin list", err})            
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/remove-admin", passport.authenticate("adminjwt", {
    session: 'false'
}), (req,res) => {
    if(req.body.userID){
        AdminList.findOne({}, (err, adminList) => {
            if(err){
                res.status(500)
                res.send({error: true, message: "Error finding admin list", err})
            } else if (adminList){
                if(adminList.adminIDs.indexOf(req.body.userID) != -1){
                    adminList.adminIDs.splice(adminList.adminIDs.indexOf(req.body.userID), 1)
                    adminList.save((err) => {
                        if(err){
                            res.status(500)
                            res.send({error: true, message: "Error saving admin list", err})
                        } else {
                            res.sendStatus(200)
                        }
                    })
                }
            } else {
                res.status(500)
                res.send({error: true, message: "Error finding admin list", err})
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/delete-comment", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete comment
    if(req.body.commentID && req.body.submissionID){

    } else {
        res.sendStatus(400)
    }
})

app.post("/delete-reply", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete reply
    if(req.body.commentID && res.body.submissionID && res.body.replyID) {

    } else {
        res.sendStatus(400)
    }
})

app.post("/delete-user", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete user
    if(req.body.userID){

    } else {
        res.sendStatus(400)
    }
})