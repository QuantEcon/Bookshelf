var express = require('express')
var passport = require('../js/auth/adminjwt')
const bodyParser = require('body-parser');

var User = require('../js/db/models/User');
var Submission = require('../js/db/models/Submission');
var Comment = require('../js/db/models/Comment');
const AdminList = require('../js/db/models/AdminList')
const Announcement = require('../js/db/models/Announcement')
const config = require('../_config')

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

/**
 * @apiDefine AuthorizationHeader
 * @apiHeader (Headers) {String} authorization Authorization JSON Web Token
 * @apiHeaderExample {json} Header Example:
 *  {
 *      "Authorization": "JWT <web token>"
 *  }
 */

/**
 * @api {get} /api/admin/flagged-content
 * @apiGroup AdminTools
 * @apiName GetFlaggedContent
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription API endpoint to retrieve all flagged and/or deleted content on the website
 * 
 * @apiSuccess  (200) {Object}      data                Data for all flagged/deleted content
 * @apiSuccess  (200) {Array}       data.users          All flagged users
 * @apiSuccess  (200) {Array}       data.submissions    All flaggged submissions
 * @apiSuccess  (200) {Array}       data.comments       All flagged comments
 * 
 */
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
                    console.log("commentAuthorIDs: ", commentAuthorIDs)
                    User.find({_id: {$in: commentAuthorIDs}}, userSelect, (err, authors) => {
                        if(err){
                            console.log("Error finding user: ", err)
                            callback(err)
                        } else {
                            console.log("authors: ", authors)
                            console.log("Got here. Comments: ", comments)
                            var commentsData = []
                            comments.forEach((comment) => {
                                console.log("checking comment: ", comment)
                                
                                var data = {
                                    data: comment,
                                    author: authors.filter((author) => {
                                        console.log("comparing: ", author._id, comment.author)
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

/**
 * @api {get} /api/admin/admin-users
 * @apiGroup AdminTools
 * @apiName GetAdminUsers
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Retrieves all information for each of the admin users
 * 
 * @apiSuccess  (200)   {Object}    data        Data for the admin users
 * @apiSuccess  (200)   {Array}     data.users  Array of objects for each admin user
 * 
 * @apiError    (401)   NoAdmins    There are no admins in the database
 * @apiError    (500)   InternalServerError An error occurred finding the admin users in the database     
 */
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
 * @api {post} /api/admin/delete-submission
 * @apiGroup AdminTools
 * @apiName AdminDeleteSubmission
 * 
 * @apiVersion 1.0.0
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiDescription Flags the submission given by submissionID as deleted
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.submissionID     ID of the submission being deleted
 * 
 * @apiSuccess (200) Success Submisison was deleted
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the submission
 * @apiError (401) Unathourized
 * @apiError (400) NoSubmission Couldn't find submission with provided ID
 * 
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
                submission.flagged = false
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
 * @api {post} /api/admin/remove-submission
 * @apiGroup AdminTools
 * @apiName AdminRemoveSubmission
 * 
 * @apiVersion 1.0.0
 * 
 * @apiDescription Removes the submission given by submissionID from the database along
 * with it's comments and replies
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.submissionID     ID of the submission being deleted
 * 
 * @apiSuccess (200) Success Submission was removed
 * 
 * @apiError (500) InternalServerError An error occurred removing the submission/comments from the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoSubmission Coudln't find a submission with the provided submissionID in the database
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

                submission.comments.forEach(commentID => {
                    // Remove replies from each comment
                    console.log("Removing replies for comment ", commentID)
                    Comment.findById(commentID, (err, comment) => {
                        if(err){
                            console.log("error finding comment: ", err)
                        } else if (comment){
                            console.log("Removing replies to comment: ", comment.replies)
                            Comment.remove({
                                "_id": {
                                    "$in": comment.replies
                                }
                            }, (err) => {
                                if (err) {
                                    console.log("ERROR REMOVING REPLIES FROM COMMENT")
                                }
                            })
                            comment.remove()
                        } else {
                            console.log("comment not found")
                        }
                    })
                });

                submission.remove(err => {
                    if(err){
                        console.error("ERROR REMOVING SUBMISSION: ", err)
                    } else {
                        console.log("Success removing submission")
                        res.sendStatus(200)
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
        // Submission.remove({
        //     "_id": req.body.submissionID
        // }, (err) => {
        //     if (err) {
        //         console.log("ERROR REMOVING SUBMISSION")
        //         res.status(500)
        //         res.send({
        //             error: true,
        //             message: "Error removing submission from database",
        //             err
        //         })
        //     } else {
        //         console.log("Remvoing successfull")
        //         res.sendStatus(200)
        //     }
        // })
    } else {
        res.sendStatus(400)
    }
})

/**
 * @api {post} /api/admin/restore-submission
 * @apiGroup AdminTools
 * @apiName AdminRestoreSubmission
 * 
 * @apiDescription Removes the deleted flag from a submission in the database
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.submissionID     ID of the submission being deleted
 * 
 * @apiSuccess (200) Success Submission was restored
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the submission
 * @apiError (401) Unauthorized
 * @apiError (400) NoSubmission Couldn't find a submission with the provided submissionID
 */
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

/**
 * @api {post} /api/admin/make-admin
 * @apiGroup AdminTools
 * @apiName AdminMakeAdmin
 * 
 * @apiDescription Makes the user with the matching userID an admin
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.userID    ID of the user to make an admin
 * 
 * @apiSuccess (200) Success User was made an admin
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the user
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No user was found with the provided userID
 */
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
                        if (adminList.adminIDs.length < config.maxNumAdmins) {
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
                            console.warn("[MakeAdmin] - reached maxmimum amount of admins(", config.maxNumAdmins, ")!")
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

/**
 * @api {post} /api/admin/remove-admin
 * @apiGroup AdminTools
 * @apiName AdminRemoveAdmin
 * 
 * @apiDescription Removes the admin status of the user with the matching userID
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.userID    ID of the user from which to remove the admin status
 * 
 * @apiSuccess (200) Success User was removed as an admin
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the user
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No user was found with the provided userID
 */
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

/**
 * @api {post} /api/admin/delete-comment
 * @apiGroup AdminTools
 * @apiName AdminDeleteComment
 * 
 * @apiDescription Sets the deleted flag on the comment with the matching commentID. NOTE: This _does not_ remove
 * the comment from the database. Only makes it so it isn't visible
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.commentID ID of the comment to set the deleted flag
 * 
 * @apiSuccess (200) Success Comment was deleted
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the comment
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No comment was found with the provided commentID
 */
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
                comment.flagged = false
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

/**
 * @api {post} /api/admin/remove-comment
 * @apiGroup AdminTools
 * @apiName AdminRemoveComment
 * 
 * @apiDescription Removes the comment from the database. NOTE: this is irreversible. Once the comment is removed, it can't
 * be restored
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.commentID ID of the comment to remove
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the comment
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No comment was found with the provided commentID
 */
app.post("/remove-comment", passport.authenticate("adminjwt", {
    session: false
}), (req, res) => {
    if (req.body.commentID) {
        Comment.findById(req.body.commentID, (err, comment) => {
            if(err) {
                console.error("Error finding comment: " ,err)
                res.sendStatus(500)
            } else  if(comment){
                if(comment.isReply){
                    Comment.findById(comment.parentID, (err, parentComment) => {
                        if(err){
                            console.error("Error finding parent comment: ", err)
                        } else if(parentComment){
                            parentComment.replies = parentComment.replies.filter((replyID) => String(replyID) !== String(comment._id))
                            parentComment.save((err) => {
                                console.error("Error saving parent comment: ", err)
                            })
                        } else {
                            console.warn("Parent comment not found with id: ", comment.parentID)
                        }
                    })
                } else {
                    Submission.findById(comment.submission, (err, submission) => {
                        if(err){
                            console.error("error finding submission: " ,err)
                        } else if(submission) {
                            submission.comments = submission.comments.filter((commentID) => {
                                return String(commentID) !== String(req.body.commentID)
                            })
                            
                            submission.save((err) => {
                                if(err){
                                    console.error("error saving submission: ", err)
                                }
                            })
                        } else {
                            console.warn("Couldn't find submission with id ", comment.submission)
                        }
                    })
                    Comment.remove({
                        "_id": {
                            "$in": comment.replies
                        }
                    }, (err) => {
                        if (err) {
                            console.log("ERROR REMOVING REPLIES FROM COMMENT")
                        }
                    })
                }
                comment.remove((err) => {
                    if(err){
                        res.sendStatus(500)
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

/**
 * @api {post} /api/admin/restore-comment
 * @apiGroup AdminTools
 * @apiName AdminRestoreComment
 * 
 * @apiDescription Removes the 'deleted' flag from the comment making it visible again
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.commentID ID of the comment to remove the deleted flag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the comment
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No comment was found with the provided commentID
 */
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

/**
 * @api {post} /api/admin/delete-comment
 * @apiGroup AdminTools
 * @apiName AdminDeleteComment
 * 
 * @apiDescription Sets the deleted flag on the comment with the matching commentID. NOTE: This _does not_ remove
 * the comment from the database. Only makes it so it isn't visible
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.commentID ID of the comment to set the deleted flag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the comment
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser No comment was found with the provided commentID
 */
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
                reply.flagged = false
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

/**
 * @api {post} /api/admin/remove-reply
 * @apiGroup AdminTools
 * @apiName AdminRemoveReply
 * 
 * @apiDescription Removes the reply from the database. NOTE: this is irreversible. Once the reply is removed, it can't
 * be restored
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.commentID    ID of the parent comment to the reply
 * @apiParam {String} body.replyID      ID of the reply to remove
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError  An error occurred removing the reply from the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoReply              No reply was found with the provided replyID
 */
app.post("/remove-reply", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if (req.body.commentID && req.body.replyID) {

        Comment.findById(req.body.commentID, (err, comment) => {
            comment.replies = comment.replies.filter((replyID) => {
                console.log("Comparing ", String(replyID), String(req.body.replyID), String(replyID) !== String(req.body.replyID))
                return String(replyID) !== String(req.body.replyID)
            })
            comment.save()
        })

        Comment.remove({"_id": req.body.replyID}, (err) => {
            if(err){
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }
})

/**
 * @api {post} /api/admin/restore-reply
 * @apiGroup AdminTools
 * @apiName AdminRestoreReply
 * 
 * @apiDescription Removes the deleted flag from a reply in the database
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.replyID      ID of the reply to restore
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError  An error occurred finding/editing/saving the reply in the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoReply              No reply was found with the provided replyID
 */
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

/**
 * @api {post} /api/admin/delete-user
 * @apiGroup AdminTools
 * @apiName AdminDeleteUser
 * 
 * @apiDescription Flags the user as 'deleted'
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.userID      ID of the user to flag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError  An error occurred removing the reply from the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoReply              No reply was found with the provided replyID
 */
app.post("/delete-user", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    if (req.body.userID) {
        User.findById(req.body.userID, (err, user) => {
            user.deleted = true
            user.save((err) => {
                if(err){
                    console.error("Error saving user: ", err)
                }
            })
        })

        AdminList.findOne({}, (err, adminList) => {
            adminList.adminIDs = adminList.adminIDs.filter((id) => id !== req.body.userID)
            adminList.save((err) => {
                if(err){
                   console.error("Error saving admin list: ", err)                    
                } else {
                    res.sendStatus(200)
                }
            })
        })
    } else {
        res.sendStatus(400)
    }
})

/**
 * @api {post} /api/admin/remove-user
 * @apiGroup AdminTools
 * @apiName AdminRemoveUser
 * 
 * @apiDescription Removes the user along with all his/her submission and comments from the database.
 * NOTE: this is irreversible. Once the user is removed, his/her profile, submissions and comments 
 * cannot be restored
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiParam {Object} body
 * @apiParam {String} body.userID      ID of the user to flag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError  An error occurred removing the reply from the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser               No user was found with the provided userID
 */
app.post("/remove-user", passport.authenticate('adminjwt', {
    session: "false"
}), (req, res) => {
    if (req.body.userID) {
        User.findById(req.body.userID, (err, user) => {
            if(err){
                console.error("Error finding user: ", err)
            } else if (user){
                console.log("User found: ", user)
                Submission.remove({"_id": {"$in": user.submissions}}, (err) => {
                    if(err){
                        console.error("Error removing submissions: ", err)
                    }
                })

                Comment.find({"author": user._id}, (err, comments) => {
                    if(err){
                        console.error("Error finding comments: " ,err)
                    } else if(comments){
                        console.log("Comments: " ,comments)
                        comments.forEach((comment) => {
                            if(comment.isReply){
                                Comment.findById(comment.parentID, (err, parentComment) => {
                                    if(err){
                                        console.error("Error finding parent comment: " ,err)
                                    } else if(parentComment){

                                        parentComment.replies = parentComment.replies.filter((replyID) => {
                                            console.log("comparing: ", String(replyID), String(comment._id), String(replyID) !== String(comment._id))
                                            return String(replyID) !== String(comment._id)
                                        })
                                        parentComment.save()
                                    } else {
                                        console.warn("No parent comment found")
                                    }
                                })
                            } else {
                                Submission.findById(comment.submission, (err, submission) => {
                                    if(err){
                                        console.error("Error finding submission for comment: " ,err)
                                    } else if(submission){
                                        submission.comments = submission.comments.filter((commentID) => String(commentID) !== String(comment._id))
                                        submission.save((err) => {
                                            if(err){
                                                console.error("Error saving submission: ", err)
                                            }
                                        })
                                    } else{
                                        console.warn("No submission was found with id ", comment.submission)
                                    }
                                })
                            }
                            Comment.remove({"_id": {"$in": comment.replies}}, (err) => {
                                if(err){
                                    console.error("Error removing replies: ", err)
                                }
                            })
                            comment.remove()
                        })
                    } else{
                        console.log("No comments")
                    }
                })

                user.remove((err) => {
                    if(err){
                        console.error("Error removing user: ", err)
                        res.sendStatus(500)
                    } else{
                        res.sendStatus(200)
                    }
                })
            } else {
                console.log("Couldn't find user with id ", req.body.userID)
                res.sendStatus(400)
            }
           
        })
    } else {
        res.sendStatus(400)
    }
})

/**
 * @api {post} /api/admin/search-users
 * @apiGroup AdminTools
 * @apiName AdminSearchUsers
 * 
 * @apiVersion 1.0.0
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiDescription Searches the database for users matching the search parameters. The keywords
 * provided will be compared against a user's email, github username, facebook display name, google
 * username, and twitter handle.
 * 
 * @apiParam {Object} body
 * @apiParam {String} keywords String of words to search the database
 * 
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {Array}    data.users Array of user objects that matched the search terms
 * 
 * @apiError (500) InternalServerError An error occurred searching the datbase for the users
 * @apiError (401) Unauthorized
 */
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

/**
 * @api {post} /api/admin/unflag-user
 * @apiGroup AdminTools
 * @apiName AdminUnflagUser
 * 
 * @apiVersion 1.0.0
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiDescription Unflags the user in the database
 * 
 * @apiParam {Object} body
 * @apiparam {String} body.userID ID of the user to unflag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the user document in the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoUser   No user was found with the provided userID
 */
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

/**
 * @api {post} /api/admin/unflag-submission
 * @apiGroup AdminTools
 * @apiName AdminUnflagSubmission
 * 
 * @apiVersion 1.0.0
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiDescription Unflags the submission in the database
 * 
 * @apiParam {Object} body
 * @apiparam {String} body.submissionID ID of the submission to unflag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the submission document in the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoSubmission   No submission was found with the provided submissionID
 */
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

/**
 * @api {post} /api/admin/unflag-comment
 * @apiGroup AdminTools
 * @apiName AdminUnflagComment
 * 
 * @apiVersion 1.0.0
 * 
 * @apiUse AuthorizationHeader
 * 
 * @apiDescription Unflags the comment in the database
 * 
 * @apiParam {Object} body
 * @apiparam {String} body.commentID ID of the comment to unflag
 * 
 * @apiSuccess (200) Success
 * 
 * @apiError (500) InternalServerError An error occurred finding/editing/saving the comment document in the database
 * @apiError (401) Unauthorized
 * @apiError (400) NoComment   No comment was found with the provided commentID
 */
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

app.post('/new-announcement', passport.authenticate('adminjwt', {
    session: false
}),(req, res) => {
    var announcement = new Announcement()

    announcement.date = Date.now()
    announcement.postedBy = req.user._id
    announcement.content = req.body.content

    announcement.save(((err, savedAnnouncement) => {
        if(err){
            console.error('[Admin-NewAnnouncement] - error occurred posting new announcement', err)
            res.sendStatus(500)

        } else {
            console.log("[Admin-NewAnnouncement] - successfully posted new announcement")
            res.send(savedAnnouncement)
        }
    }))
})


module.exports = app