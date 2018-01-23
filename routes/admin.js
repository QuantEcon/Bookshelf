var express = require('express')
var passport = require('../js/auth/adminjwt')
const bodyParser = require('body-parser');

var User = require('../js/db/models/User');
var Submission = require('../js/db/models/Submission');
var Comment = require('../js/db/models/Comment');
const AdminList = require('../js/db/models/AdminList')

var series = require('async/series');

var app = express.Router();

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

app.get("/flagged-content", passport.authenticate('adminjwt', {
    session:'false'
}), (req, res) => {
    var userSelect = "_id name avatar submissions flagged deleted"
    var submissionSelect = "_id title author summary published lang totalComments viewers views score deletedDate flagged deleted"
    series({
        // Get flagged users
        users: function(callback) {
            User.find({flagged: true}, userSelect, (err, users) => {
                if(err){
                    callback(err)
                } else {
                    callback(null, users)
                }
            })
        },
        // Get flagged submissions
        submissions: function(callback) {
            Submission.find({$or: [{flagged: true}, {deleted:true}]}, submissionSelect, (err, submissions) => {
                if(err){
                    callback(err)
                } else {
                    console.log("\n[FetchFlaggedContent] - Submissions: ", submissions)
                    var submissionAuthorIDs = []
                    submissions.forEach((submission) => {
                        console.log("[FetchFlaggedContent] - pushing author: ", submission.author)
                        submissionAuthorIDs.push(submission.author)
                    })

                    User.find({_id: {$in: submissionAuthorIDs}}, userSelect, (err, authors) => {
                        if(err){
                            console.log("\nERROR GETTING AUTHORS: ", err)
                            callback(err)
                        } else {
                            console.log("\n[FetchFlaggedContent] - submission authors: ", authors)
                            var submissionsData = []
                            submissions.forEach((submission) => {
                                var data = {
                                    data: submission,
                                    author: authors.filter((author) => {
                                        return String(author._id) == String(submission.author)
                                    })[0]
                                }
                                submissionsData.push(data)
                            })
                            console.log("\n[FetchFlaggedContent] - submissionsData: ",submissionsData)
                            callback(null, submissionsData)
                        }
                    })
                }
            })
        },
        // Get flagged comments
        comments: function(callback) {
            Comment.find({$or: [{flagged: true}, {deleted:true}]}, (err, comments) => {
                if(err){
                    callback(err)
                } else {
                    var commentAuthorIDs = []
                    comments.forEach((comment) => {
                        commentAuthorIDs.push(comment.author)
                    })

                    User.find({_id: {$in: commentAuthorIDs}}, userSelect, (err, authors) => {
                        if(err){
                            callback(err)
                        } else {
                            var commentsData = []
                            comments.forEach((comment) => {
                                var data = {
                                    data: comment,
                                    author: authors.filter((author) => {
                                        return String(author._id) == String(comment.author)
                                    })[0]
                                }
                                commentsData.push(data)
                            })
                            callback(null, commentsData)
                        }
                    })
                }
            })
        }
    },
    // callback
    function(err, results) {
        if(err){

        } else {
            console.log("[Admin] - flagged content: ", results)
            var data = {
                users: results.users,
                submissions: results.submissions,
                comments: results.comments
            }

            res.send(data)
        }
    })


})

app.get("/admin-users", passport.authenticate('adminjwt', {
    session:'false'
}), (req, res) => {
    var userSelect = "_id name avatar summary"

    AdminList.findOne({}, (err, adminList) => {
        if(err){
            res.status(500)
            res.send({
                error: true,
                message: err
            })
        } else {
            User.find({_id: {$in: adminList.adminIDs}}, (err, users) => {
                if(err){
                    res.status(500)
                    console.log("[Admin] - error: ", err)
                    res.send({
                        error: true,
                        message: err
                    })
                } else if(users){
                    res.send(users)
                } else {
                    res.status(401)
                    res.send({
                        error: true,
                        message: "There are no admins in the database"
                    })
                }
            })
        }
    })
})

/**
 * Flags the submission given by submissionID as deleted
 */
app.post("/delete-submission", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // Flag as deletedDelete submission
    if (req.body.submissionID) {
        Submission.findById(req.body.submissionID, (err, submission) => {
            if (err) {
                res.status(500)
                res.send({
                    error: true,
                    message: "Error finding submission",
                    err
                })
            } else if (submission) {
                submission.deleted = true
                // Remove from user.submissions and add to user.deletedSubmissions
                User.findById(submission.author, (err, user) => {
                    if(err){
                        console.log("Error finding author of submission:" ,err)
                    } else if (user){
                        user.submissions = user.submissions.filter((id) => {
                            return id != submission._id
                        })
                        user.deletedSubmissions.push(submission._id)
                        user.save()
                    } else {
                        console.log("Error finding author of submission: author doesn't exist!")
                    }
                })
                submission.save((err) => {
                    if (err) {
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error saving after deleting",
                            err
                        })
                    } else {
                        res.send("Delete successful!")
                    }
                })
            } else {
                res.status(400)
                res.send({
                    error: true,
                    message: "Couldn't find submission with ID " + req.body.submissionID
                })
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
    if (req.body.submissionID) {
        // TODO: remove submission, comments, and replies from database
        Submission.findById(req.body.submissionID, (err, submission) => {
            if (err) {
                console.log("Error finding submission: ", err)
                res.status(500)
                res.send({
                    error: true,
                    message: "Error finding submission in database",
                    err
                })
            } else if (submission) {
                // Remove submission from author
                User.findById(submission.author, (err, author) => {
                    if (err) {
                        console.log("Error finding author of submission")
                    } else if (author) {
                        // Remove from submissions
                        if (author.submissions.indexOf(req.body.submissionID) != -1) {
                            author.submissions = author.submissions.filter((id) => {
                                return id != req.body.submissionID
                            })
                            author.save()
                        }
                        // Remove from deletedSubmissions
                        if (author.deletedSubmissions.indexOf(req.body.submissionID) != -1) {
                            author.deletedSubmissions = author.deletedSubmissions.filter((id) => {
                                return id != req.body.submissionID
                            })
                            author.save()
                        }
                    } else {
                        console.log("Error finding author of submission: User doesn't exist!")
                    }
                })
                submission.comments.forEach(comment => {
                    // Remove replies from each comment
                    Comment.remove({
                        "_id": {
                            "$in": comment.replies
                        }
                    }, (err) => {
                        if (err) {
                            console.log("ERROR REMOVING REPLIES FROM COMMENT")
                        }
                    })
                });
                // Remove comments from submission
                Comment.remove({
                    "_id": {
                        "$in": submission.comments
                    }
                }, (err) => {
                    if (err) {
                        console.log("ERROR REMOVING COMMENTS FROM SUBMISSION")
                    }
                })
            } else {
                console.log("Error couldn't find submission")
                res.status(400)
                res.send({
                    error: true,
                    message: "Couldn't find submission with id " + req.body.submissionID
                })
                return
            }
        })
        // Remove submission from database
        Submission.remove({
            "_id": req.body.submissionID
        }, (err) => {
            if (err) {
                console.log("ERROR REMOVING SUBMISSION")
                res.status(500)
                res.send({
                    error: true,
                    message: "Error removing submission from database",
                    err
                })
            } else {
                console.log("Remvoing successfull")
                res.sendStatus(200)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/restore-submission", passport.authenticate('adminjwt', {
    session:false
}), (req, res) => {
    if(req.body.submissionID){
        Submission.findById(req.body.submissionID, (err, submission) => {
            if(err){
                res.status(500)
                res.send({
                    error: true,
                    message: err
                })
            } else if(submission){
                submission.deleted = false
                submission.save((err) => {
                    if(err){
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error saving submission"
                        })
                    } else {
                        res.sendStatus(200)
                    }
                })
            } else {
                res.status(400)
                res.send({
                    error: true,
                    message: "No submission was found with given ID"
                })
            }
        })
    } else {
        res.status(400)
        res.send({
            error: true,
            message: "No submission ID was supplied in the request"
        })
    }
})

app.post("/make-admin", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if (req.body.userID) {
        User.findById(req.body.userID, (err, user) => {
            if(err) {
                console.log("[MakeAdmin] - error: ". err)
                res.status(500)
            } else if (user){
                AdminList.findOne({}, (err, adminList) => {
                    if (err) {
                        console.log("[MakeAdmin] - error: ". err)
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error finding admin list",
                            err
                        })
                    } else if (adminList) {
                        if (adminList.adminIDs.length < 5) {
                            // Add userID and user's email to adminList
                            adminList.adminIDs.push(req.body.userID)
                            adminList.save((err) => {
                                if (err) {
                                    console.log("[MakeAdmin] - error: ". err)
                                    res.status(500)
                                    res.send({
                                        error: true,
                                        message: "Error saving admin list",
                                        err
                                    })
                                } else {
                                    res.send(user)
                                }
                            })
                        } else {
                            res.status(400)
                            res.send({
                                error: true,
                                message: "Reached maxmium amount of admins"
                            })
                        }
                    } else {
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error finding admin list",
                            err
                        })
                    }
                })
            } else {
                res.status(404)
            }    
        })
        
    } else {
        res.sendStatus(400)
    }
})

app.post("/remove-admin", passport.authenticate("adminjwt", {
    session: 'false'
}), (req, res) => {
    if (req.body.userID) {
        AdminList.findOne({}, (err, adminList) => {
            if (err) {
                res.status(500)
                res.send({
                    error: true,
                    message: "Error finding admin list",
                    err
                })
            } else if (adminList) {
                // Remove ID from adminList.adminIDs
                if (adminList.adminIDs.indexOf(req.body.userID) != -1) {
                    adminList.adminIDs = adminList.adminIDs.filter((id) => {
                        return id != req.body.userID
                    })
                    adminList.save((err) => {
                        if (err) {
                            res.status(500)
                            res.send({
                                error: true,
                                message: "Error saving admin list",
                                err
                            })
                        } else {
                            res.sendStatus(200)
                        }
                    })
                }
            } else {
                res.status(500)
                res.send({
                    error: true,
                    message: "Error finding admin list",
                    err
                })
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/delete-comment", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if (req.body.commentID && req.body.submissionID) {
        // TODO: Flag as deleted
        Comment.findById(req.body.commentID, (err, comment) => {
            if(err){
                res.status(500)
                res.send({
                    error: true,
                    message: err,
                    status: 500
                })
            } else if(comment){
                comment.deleted = true
                comment.save((err) => {
                    if(err){
                        res.status(500)
                        res.send({
                            error: true,
                            message: err,
                            status: 500
                        })
                    } else {
                        res.sendStatus(200)
                    }
                })
            } else {
                res.status(400)
                res.send({
                    status: 400,
                    error: true,
                    message: "No coment was found with given ID"
                })
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/remove-comment", passport.authenticate("adminjwt", {
    session: "false"
}), (req, res) => {
    if (req.body.commentID && req.body.submissionID) {
        // TODO: Remove comment id from submission.comments
        // TODO: Remove replies from database
        // TODO: Remove comment from database
    } else {
        res.sendStatus(400)
    }
})

app.post("/restore-comment", passport.authenticate('adminjwt', {
    session: false
}), (req, res) => {
    if(req.body.commentID){
        Comment.findById(req.body.commentID, (err, comment) => {
            if(err){
                res.status(500)
                res.send({
                    error: true,
                    message: err
                })
            } else if(comment){
                comment.deleted = false
                comment.save((err) => {
                    if(err){
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error saving comment"
                        })
                    } else {
                        res.sendStatus(200)
                    }
                })
            } else {
                res.sendStatus(400)
            }
        })
    } else {
        res.status(400)
    }
})

app.post("/delete-reply", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if (req.body.commentID && req.body.submissionID && req.body.replyID) {
        Comment.findById(req.body.replyID, (err, reply) => {
            if(err){
                res.status(500)
                res.send({
                    error: true,
                    message: err,
                    status: 500
                })
            } else if(reply) {
                reply.deleted = true
                reply.save((err) =>{
                    if(err){
                        res.status(500)
                        res.send({
                            error: true,
                            message: err
                        })
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/remove-reply", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if (req.body.commentID && req.body.submissionID && req.body.replyID) {
        // TODO: Remove from comment.replies
        // TODO: Remove reply from database
    }
})

app.post("/restore-reply", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if(req.body.replyID){
        Comment.findById(req.body.replyID, (err, reply) => {
            if(err){
                res.status(500)
                res.send({
                    error: true,
                    message: err,
                    status: 500
                })
            } else if (reply) {
                reply.deleted = false
                reply.save((err) => {
                    if(err){
                        res.status(500)
                        res.send({
                            error: true,
                            message: "Error saving reply",
                            status: 500
                        })
                    } else{
                        res.sendStatus(200)
                    }
                }) 
            } 
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/delete-user", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if (req.body.userID) {
        // TODO: flag user as deleted
        // TODO: remove from admin list, if applicable
    } else {
        res.sendStatus(400)
    }
})

app.post("/remove-user", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if (req.body.userID) {
        // TODO: remove submissions
        // TODO: remove comments
        // TODO: remove replies
        // TODO: remove from admin list, if applicable
        // TODO: remove user from database
    } else {
        res.sendStatus(400)
    }
})

app.post("/search-users", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if(req.body.keywords){
        AdminList.findOne({}, (err, adminList) => {
            if(err){
                res.sendStatus(500)
            } else if(adminList){
                User.find({$or: [
                    {name: {$regex: req.body.keywords, $options: 'i'}},
                    {"github.username": {$regex: req.body.keywords, $options: 'i'}},
                    {"fb.displayName": {$regex: req.body.keywords, $options: 'i'}},
                    {"google.displayName": {$regex: req.body.keywords, $options: 'i'}},
                    {"twitter.username": {$regex: req.body.keywords, $options: 'i'}},
                    {email: {$regex: req.body.keywords, $options: 'i'}}
                ], _id: {"$nin": adminList.adminIDs}}, (err, users) => {
                    if(err){
                        console.log("[Admin] - search users returned error: " ,err)
                        res.status(500)
                    } else if(users){
                        res.send(users)
                    } else {
                        res.status(404)
                    }
                })
            } else {
                res.sendStatus(500)
            }
            
        })
        
    } else {
        res.sendStatus(400)
    }
})

app.post("/unflag-user", passport.authenticate("adminjwt", {
    session: false
}), (req, res) => {
    if(req.body.userID){
        User.findById(req.body.userID, (err, user) => {
            if(err){
                console.log("[Admin] (unflagUser) - err: ", err)
                res.sendStatus(500)
            } else if(user){
                user.flagged = "false"
                user.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(200)
                    }
                })
            } else {
                console.log("[Admin] (unflagUser) - no user found with ID")
                req.sendStatus(404)
            }
        })
    } else {
        req.sendStatus(400)
    }
})

app.post("/unflag-submission", passport.authenticate("adminjwt", {
    session: false
}), (req, res) => {
    if(req.body.submissionID){
        Submission.findById(req.body.submissionID, (err, submission) => {
            if(err){
                res.sendStatus(500)
            } else if(submission){
                submission.flagged = false
                submission.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else{
                        res.sendStatus(200)
                    }
                })
            } else{
                res.sendStatus(404)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

app.post("/unflag-comment", passport.authenticate("adminjwt", {
    session: false
}), (req, res) => {
    if(req.body.commentID){
        Comment.findById(req.body.commentID, (err, comment) => {
            if(err){
                res.sendStatus(500)
            } else if(comment){
                comment.flagged = false
                comment.save((err) => {
                    if(err){
                        res.sendStatus(500)
                    } else{
                        res.sendStatus(200)
                    }
                })
            } else{
                res.sendStatus(404)
            }
        })
    } else {
        res.sendStatus(400)
    }
})


module.exports = app