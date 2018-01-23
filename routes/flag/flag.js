var express = require('express');
var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
const passport = require('../../js/auth/jwt');
const bodyParser = require('body-parser');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

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
                submission.flagged = true
                submission.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
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
                user.flagged = true
                user.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
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
                comment.flagged = true
                comment.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
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