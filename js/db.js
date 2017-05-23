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
 *   replies : array of comment object _id's
 *   flagged: boolean
 *   deleted: boolean
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
     * Adds a user to the database
     *
     * @param {user} user - json object of a user. Specified above
     * @return - On success: returns id of the new user document
     *           On failure: returns object with 'error' field
     */
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
            if (result.upsertedCount) {
                return result.upsertedId._id;
            } else {
                return {
                    error: "User already exists",
                    object: result
                }
            }
        });
    },

    /*
     * Updates the user associated with 'oldUserID' with newUser.
     * If there are existing fields in the old user not specified in 'newUser',
     * the old user fields will be kept
     *
     * @param {ObjectID} oldUserID - id of the user to be updated
     * @param {JSONObject} newUser - object with attributes to be added/modified the user
     * @return On success: true
     *         On failure: returns object with 'error' field and the result from the mongo transaction
     * */
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
     * Method adds a submission to the submissions collection then appends
     * the title of the submission to the user's 'submissions' array.
     *
     * @param {submission} submission - submission object according to specification above
     * @param {ObjectID} userID - _id field of a user object. Should be set when a user authenticates on the server
     *
     * @return - On success: id of the new submission document
     *           On failure: object with 'error' field
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
                    return {
                        error: "submission already exists",
                        addSubInfo: result
                    };
                }
                var addSubResult = result;
                var subID = result.upsertedId;
                var usersCollection = database.collection("users");
                //Update user's 'submissions' array
                return usersCollection.updateOne(
                    {"_id": userID},
                    {$addToSet: {"submissions": result.upsertedId._id}}
                ).then(function (result) {
                    // check to make sure sub._id was added to users submissions list
                    if (!result.modifiedCount) {
                        //todo: delete submission?
                        if (!result.matchedCount) {
                            // couldn't find user with 'userID'
                            return {
                                error: "Couldn't find a matching user!",
                                subInfo: addSubResult,
                                authorInfo: result
                            };
                        }
                        // found user, but couldn't add to list
                        return {
                            error: "Couldn't add submission to user's list",
                            subInfo: addSubResult,
                            authorInfo: result

                        };
                    } else {
                        return subID._id;
                    }
                });
            });
    },

    /*
     * Replaces the submission with the corresponding 'submissionID' with 'newSubmission'
     *
     * @param {ObjectID} submissionID - _id of the submission that is being edited
     * @param {submission} newSubmission - new submission to replace the old one
     *
     * @return - returns true if the submission was successfully edited, false if not
     *
     * Questions:
     *   User provides 'publishedDate' and 'lastUpdated' fields or db generates them?
     * */
    editSubmission: function (submissionID, newSubmission) {
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne({_id: submissionID}, newSubmission).then(function (result) {
            if (result.modifiedCount) {
                return true;
            } else {
                return {
                    error: "Couldn't update submission",
                    info: result
                };
            }
        });
    },

    deleteSubmission: function (submissionID) {

    },

    /*
     * Add a comment to the submission with _id 'submissionID'
     *
     * @param {ObjectID] submissionID - id field of the submission to comment on
     * @param {comment} comment - comment object to add to submission
     *
     * @return - On success: id of the new comment document
     * */
    submitComment: function (submissionID, comment) {
        // add to comments collection
        var commentsCollection = database.collection("comments");

        return commentsCollection.insertOne(comment).then(function (result) {
            if (result.insertedCount) {
                // add to submission replies
                var submissionsCollection = database.collection("submissions");

                return submissionsCollection.updateOne(
                    {_id: submissionID},
                    {$addToSet: {"comments": result.insertedId}}
                ).then(function (addToSubResult) {
                    if (addToSubResult.modifiedCount) {
                        return result.insertedId
                    } else {
                        return {
                            error: "Couldn't add to comments array in submission",
                            info: addToSubResult
                        }
                    }
                })
            } else {
                return {
                    error: "Couldn't add to comments collection",
                    info: result
                }
            }
        });
    },

    submitReply: function (inReplyToID, comment) {
        //add to comments collection
        var commentsCollection = database.collection("comments");

        return commentsCollection.insertOne(comment).then(function (result) {
            if (result.insertedCount) {
                //add to replies array
                return commentsCollection.updateOne(
                    {_id: inReplyToID},
                    {$addToSet: {"replies": result.insertedId}}
                ).then(function (addToRepliesResult) {
                    if (addToRepliesResult.modifiedCount) {
                        return result.insertedId;
                    } else {
                        return {
                            error: "Couldn't add to replies array",
                            info: addToRepliesResult
                        }
                    }
                })
            } else {
                return {
                    error: "Couldn't add reply to comments collection",
                    info: result
                }
            }
        });
    },

    deleteComment: function (commentID) {
        // add 'deleted' field
        var commentsCollection = database.collection("comments");

        commentsCollection.updateOne(
            {_id: commentID},
            {$set: {'deleted': true}}
        ).then(function (result) {
            if (result.modifiedCount) {
                return true;
            } else {
                if (!result.matchedCount) {
                    return {
                        error: "Couldn't find matching comment",
                        info: result
                    }
                } else {
                    return {
                        error: "Couldn't delete comment",
                        info: result
                    }
                }
            }
        });
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

    getComment: function (query) {
        return database.collection("comments").find(query).toArray();
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