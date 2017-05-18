/*
 * Author: @tlyon3
 *
 * Database objects:
 *
 * user = {
 *   username: string
 *   avatar: .png/.jpeg/etc...
 *   joinDate: string
 *   views: integer
 *   numComments: integer
 *   voteScore: integer
 *   position: string
 *   website: string
 *   github: string
 *   linkedIn: string
 *   email: string
 *   submissions: array of string
 *   flagged: boolean
 * }
 *
 * comment = {
 *   author : string
 *   timestamp : string
 *   replies : array of comment objects
 *   flagged: boolean
 * }
 *
 * submission = {
 *   title : string
 *   topicList: array of strings
 *   language: string
 *   author: string
 *   coAuthors: array of user objects
 *   summary: string
 *   notebook: notebook object
 *   comments: array of comment objects
 *   votes: integer
 *   upvotedUsers: array of user objects
 *   downvotedUsers: array of user objects
 *   views: integer
 *   published: string
 *   lastUpdated: string
 *   flagged: boolean
 * }
 *
 * notebook = {
 *   title: string
 *   file : html file
 * }
 *
 */

var Promise = require('rsvp').Promise;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//this points to where the database is being run
var url = "mongodb://localhost:27017/QuantEconLib";

var database = null;

//Database facade
module.exports = {
    initConnection: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Error connecting to database: ", err);
            } else {
                console.log("Connected to database");
                database = db;
                callback();
            }
        });
    },

    closeConnection: function () {
        console.log("Closing db connection");
        database.close();
    },

    // POST methods
    /*
     * @param user: json object of a user. Specified above
     * @return: returns 0 if the user already exists
     *                  1 if the user was inserted
     * */
    addUser: function (user) {
        var collection = database.collection('users');
        //check to see if user already exists
        return collection.updateOne(
            //check for matching username
            {"username": user.username},
            //only use this if it was created
            {$setOnInsert: user},
            //if not exist, create
            {upsert: true}
        ).then(function (result) {
            return result.upsertedCount;
        });
    },

    updateUser: function (oldUser, newUser) {

    },

    /*
     * @param submission: submission object according to specification above
     * @param user: user object according to specification above
     *
     * Method adds a submission to the submissions collection then appends
     * the title of the submission to the user's 'submissions' array.
     *
     * @return: if the submission already exists, then an object with an
     * 'error' attribute will be returned.
     * Else, true is returned
     * */
    addSubmission: function (submission, user) {
        var submissionsCollection = database.collection("submissions");
        //add submission. If submission already exists, don't add, return error
        return submissionsCollection.updateOne({
                "title": submission.title,
                'author': user.username
            },
            submission, {upsert: true})

            .then(function (result) {
                if (!result.upsertedCount) {
                    return {error: "submission already exists"};
                }
                var usersCollection = database.collection("users");
                //Update user's 'submissions' array
                return usersCollection.updateOne({"username": user.username}, {
                    $addToSet: {
                        "submissions": submission.title
                    }
                }).then(function () {
                    return true;
                });
            });
    },

    editSubmission: function (submission, user) {

    },

    deleteSubmission: function (submission) {

    },

    submitComment: function (submissionTitle, user, comment) {

    },

    submitReply: function (submissionTitle, user, comment, inReplyTo) {

    },

    deleteComment: function (submissionTitle, user, comment) {

    },

    // Voting
    upvote: function (submission, user) {

    },

    revokeUpvote: function (submission, user) {

    },

    downvote: function (submission, user) {

    },

    revokeDownvote: function (submission, user) {

    },

    // GET methods

    getSubmission: function (submissionTitle) {

    },

    getAllSubmissions: function () {

    },

    getUser: function (uname) {
        var collection = database.collection('users');
        return collection.find({username: uname}).toArray();
    },

    getAllUsers: function () {

    }
};