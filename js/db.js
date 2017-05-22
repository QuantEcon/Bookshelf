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
 *   author : string (_id field of an user object)
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

var MongoClient = require('mongodb').MongoClient;
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
            //check for matching name
            {"username": user.name},
            //only use this if it was created
            {$setOnInsert: user},
            //if not exist, create
            {upsert: true}
        ).then(function (result) {
            return result.upsertedCount;
        });
    },

    updateUser: function (oldUserID, newUser) {
        var usersCollection = database.collection("users");
        return usersCollection.updateOne({_id: oldUserID}, newUser).then(function (result) {
            if (result.modifiedCount) {
                return true;
            } else {
                return {
                    error: "Error occurred updating the user",
                    //do I want this?
                    object: console.dir(result)
                }
            }
        })
    },

    /*
     * @param submission: submission object according to specification above
     * @param userID: _id field of a user object. Should be set when a user authenticates on the server
     *
     * Method adds a submission to the submissions collection then appends
     * the title of the submission to the user's 'submissions' array.
     *
     * @return: if the submission already exists, then an object with an
     * 'error' attribute will be returned.
     * Else, true is returned
     * */
    addSubmission: function (submission, userID) {
        var submissionsCollection = database.collection("submissions");
        //add submission. If submission already exists, don't add, return error
        //**ASSUMPTION** A given author can only have one submission with a _specific_ name
        return submissionsCollection.updateOne({
                "title": submission.title,
                'author': userID
            },
            submission, {upsert: true})

            .then(function (result) {
                if (!result.upsertedCount) {
                    return {error: "submission already exists"};
                }
                var usersCollection = database.collection("users");
                //Update user's 'submissions' array
                return usersCollection.updateOne(
                    {"_id": userID},
                    {$addToSet: {"submissions": result.upsertedId._id}}
                ).then(function (result) {
                    if (!result.modifiedCount) {
                        if (!result.matchedCount) {
                            return {error: "Couldn't find a matching user!"};
                        }
                        return {error: "Couldn't add submission to user's list"};
                    } else {
                        return true;
                    }
                });
            });
    },

    editSubmission: function (submissionID, newSubmission, user) {

    },

    deleteSubmission: function (submissionID) {

    },

    submitComment: function (submissionID, comment) {
        var submissionCollection = database.collection("submissions");
        return submissionCollection.updateOne(
            {"_id": submissionID},
            {$addToSet: {"comments": comment}}
        ).then(function (result) {
            if (!result.modifiedCount) {
                return {error: "Could not submit comment"}
            } else {
                return true;
            }
        });
    },

    submitReply: function (submissionID, comment, inReplyToID) {

    },

    deleteComment: function (submissionID, comment) {

    },

    // Voting
    upvote: function (submission, userID) {

    },

    revokeUpvote: function (submission, userID) {

    },

    downvote: function (submission, userID) {

    },

    revokeDownvote: function (submission, userID) {

    },

    // GET methods

    getSubmission: function (query) {
        var collection = database.collection('submissions');
        return collection.find(query).toArray();
    },

    getAllSubmissions: function () {
        return database.collection('submissions').find({}).toArray();
    },

    getUser: function (query) {
        var collection = database.collection('users');
        return collection.find(query).toArray();
    },

    getAllUsers: function () {
        return database.collection('users').find({}).toArray();
    },

    /*
    * TEMPORARY. ONLY FOR TESTING
    * */
    resetDB: function () {
        database.collection('users').drop().then(function (result) {
            database.collection('submissions').drop().then(function (result) {
                return true;
            });
        });
    }
};