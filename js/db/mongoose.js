/**
 * Created by tlyon on 5/26/17.
 */
// modules ======================================================
var mongoose = require('mongoose');
var config = require('./_config');

// config =======================================================
mongoose.connect(config.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log("Connected to Database!");
});

// Methods ==================================================================
function newSubmission(submission) {
    // New data ====================================
    submission.save(function (err, savedSubmission) {
        if (err) {
            console.log(err);
            return {
                error: 'Error saving new submission',
                info: err
            }
        } else {
            //todo save object id to author.submissions

            return savedSubmission
        }
    });
}

function newUser(user) {
    user.save(function (err, savedUser) {
        if (err) {
            console.log(err);
            return {
                error: 'Error saving new user',
                info: err
            }
        } else {
            return savedUser
        }
    })
}

function newComment(comment, submissionID) {
    comment.save(function (err, savedComment) {
        if (err) {
            console.log(err);
            return {
                error: 'Error saving new comment',
                info: err
            }
        } else {
            // todo: add comment id to submission.comments

            return savedComment
        }
    })
}

function newReply(reply, inReplyToID) {
    reply.save(function (err, savedReply) {
        if (err) {
            console.log(err);
            return {
                error: 'Error saving new reply',
                info: err
            }
        } else {
            // todo: add reply id to inReplyTo.replies

            return savedReply
        }
    })
}

// Edit existing data =====================

//todo
function editSubmission() {

}

//todo
function editComment() {

}

//todo
function editUser() {

}

// Delete existing data ================

//todo
function deleteSubmission(submissionID) {

}

//todo
function deleteUser(userID) {

}

//todo
function deleteComment(commentID) {

}


// Exports ==================================================================
module.exports = {
    // Methods ================
    newSubmission: newSubmission,
    newUser: newUser,
    newComment: newComment,
    newReply: newReply,
    editSubmission: editSubmission,
    editComment: editComment,
    editUser: editUser,
    deleteSubmission: deleteSubmission,
    deleteUser: deleteUser,
    deleteComment: deleteComment
};

