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
 *   deleted: boolean
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
            submission, {upsert: true}
        ).then(function (result) {
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
            }
            if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission",
                    info: result
                }
            }
            return {
                error: "Couldn't update submission",
                info: result
            };
        });
    },

    /*
     * Adds 'deleted' tag to submission
     *
     * @param {ObjectID} submissionID - the id of the submission to be deleted
     *
     * @return - On success: true
     *           On failure: object with 'error' and 'info' field. The 'error' is a short description
     *           of what happened. 'info' is the object returned from the mongo transaction
     * */
    deleteSubmission: function (submissionID) {
        // add deleted tag to submission
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne(
            {_id: submissionID},
            {$set: {"deleted": true}}
        ).then(function (result) {
            if (result.modifiedCount) {
                return true;
            } else if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission for id",
                    info: result
                }
            } else {
                return {
                    error: "Couldn't add deleted tag to submission",
                    info: result
                }
            }
        })
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

    /*
     * Adds a comment to the database and adds its id to the 'replies' array of the comment
     * it is replying to
     *
     *  @param {ObjectID} inReplyToID - id of the comment that is being replied to
     *  @param {JSONObject} comment - object of the comment according to specs above
     * */
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

    /*
     * Adds 'deleted' tag to the comment with the corresponding 'commentID'
     *
     * @param {ObjectID} commentID - id of the comment to delete
     *
     * @return - On success: true
     *           On failure: object with 'error' and 'info' fields.
     *           'error' is a short description of what went wrong.
     *           'info' is the object returned from the mongo transaction
     * */
    deleteComment: function (commentID) {
        // add 'deleted' field
        var commentsCollection = database.collection("comments");

        return commentsCollection.updateOne(
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
    /*
     * Increments the 'votes' field for the submission and adds 'userID' to the 'upvotedUsers' array
     *
     * @param {ObjectID} submissionID - id of the submission being upvoted
     * @param {ObjectID} userID - id of the user doing the up-voting
     *
     * @return - On success: true
     *           On failure: JSONObject with 'error' and 'info' fields.
     *                       'error' is a short description of what went wrong
     *                       'info' is JSONObject returned by the mongo transaction
     * */
    upvote: function (submissionID, userID) {
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne(
            {_id: submissionID}, {$inc: {"votes": 1}}
        ).then(function (result) {
            if (result.modifiedCount) {
                return submissionsCollection.updateOne(
                    {_id: submissionID},
                    {$addToSet: {"upvotedUsers": userID}}
                ).then(function (addResult) {
                    if (addResult.modifiedCount) {
                        return true;
                    } else {
                        return {
                            // todo: decrement upvote?
                            error: "Couldn't add user to upvotedUsers",
                            info: addResult
                        }
                    }
                });
            } else if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission",
                    info: result
                }
            } else {
                return {
                    error: "Couldn't increment votes",
                    info: result
                }
            }
        })
    },

    /*
     * Decrements 'votes' and removes 'userID' from 'upvotedUsers'
     *
     * @param {ObjectID} submissionID - id of the submission to revoke upvote
     * @param {ObjectID} userID - id of the user revoking his/her upvote
     *
     * @return - On success: true
     *           On failure: JSONObject with 'error' and 'info' fields.
     *                       'error' is a short description of what went wrong
     *                       'info' is JSONObject returned by the mongo transaction
     * */
    revokeUpvote: function (submissionID, userID) {
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne(
            {_id: submissionID},
            {$inc: {"votes": -1}}
        ).then(function (result) {
            if (result.modifiedCount) {
                // remove userID from 'upvotedUsers'
                return submissionsCollection.updateOne(
                    {_id: submissionID},
                    {$pull: {"upvotedUsers": userID}}
                ).then(function (removeResult) {
                    if (removeResult.modifiedCount) {
                        return true;
                    } else {
                        return {
                            error: "Couldn't remove user from 'upvotedUsers'",
                            info: removeResult
                        }
                    }
                })
            } else if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission for id",
                    info: result
                }
            } else {
                return {
                    error: "Couldn't revoke upvote",
                    info: result
                }
            }
        });
    },

    /*
     * Decrements the 'votes' field for the submission and adds 'userID' to the 'downvotedUsers' array
     *
     * @param {ObjectID} submissionID - id of the submission being downvoted
     * @param {ObjectID} userID - id of the user doing the down-voting
     *
     * @return - On success: true
     *           On failure: JSONObject with 'error' and 'info' fields.
     *                       'error' is a short description of what went wrong
     *                       'info' is JSONObject returned by the mongo transaction
     * */
    downvote: function (submissionID, userID) {
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne(
            {_id: submissionID}, {$inc: {"votes": -1}}
        ).then(function (result) {
            if (result.modifiedCount) {
                return submissionsCollection.updateOne(
                    {_id: submissionID},
                    {$addToSet: {"downvotedUsers": userID}}
                ).then(function (addResult) {
                    if (addResult.modifiedCount) {
                        return true;
                    } else {
                        return {
                            // todo: increment votes?
                            error: "Couldn't add user to downvotedUsers",
                            info: addResult
                        }
                    }
                });
            } else if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission",
                    info: result
                }
            } else {
                return {
                    error: "Couldn't decrement votes",
                    info: result
                }
            }
        })
    },

    /*
     * Increments 'votes' and removes 'userID' from 'downvotedUsers'
     *
     * @param {ObjectID} submissionID - id of the submission to revoke downvote
     * @param {ObjectID} userID - id of the user revoking his/her downvote
     *
     * @return - On success: true
     *           On failure: JSONObject with 'error' and 'info' fields.
     *                       'error' is a short description of what went wrong
     *                       'info' is JSONObject returned by the mongo transaction
     * */
    revokeDownvote: function (submissionID, userID) {
        var submissionsCollection = database.collection("submissions");

        return submissionsCollection.updateOne(
            {_id: submissionID},
            {$inc: {"votes": 1}}
        ).then(function (result) {
            if (result.modifiedCount) {
                // remove userID from 'upvotedUsers'
                return submissionsCollection.updateOne(
                    {_id: submissionID},
                    {$pull: {"downvotedUsers": userID}}
                ).then(function (removeResult) {
                    if (removeResult.modifiedCount) {
                        return true;
                    } else {
                        return {
                            // todo: decrement votes?
                            error: "Couldn't remove user from 'downvotedUsers'",
                            info: removeResult
                        }
                    }
                })
            } else if (!result.matchedCount) {
                return {
                    error: "Couldn't find matching submission for id",
                    info: result
                }
            } else {
                return {
                    error: "Couldn't revoke downvote",
                    info: result
                }
            }
        });
    },

    // GET methods

    /*
     * Returns an array of submissions that match the query
     *
     * @param {JSONObject} query - object with fields used to query the database
     *
     * @return - array of documents that matched the query
     * */
    getSubmission: function (query) {
        var collection = database.collection('submissions');
        return collection.find(query).toArray();
    },

    /*
     * Queries the database and returns corresponding user documents
     *
     * @param {JSONObject} query - object with fields used to query the database
     *
     * @return - array of documents that matched the query
     * */
    getUser: function (query) {
        var collection = database.collection('users');
        return collection.find(query).toArray();
    },

    /*
     * Queries the database and returns corresponding comment documents
     *
     * @param {JSONObject} query - object with fields used to query the database
     *
     * @return - array of documents that matched the query
     * */
    getComment: function (query) {
        return database.collection("comments").find(query).toArray();
    },

    /*
     * TEMPORARY. ONLY FOR TESTING
     * */
    resetDB: function () {
        database.collection('users').drop();
        database.collection('submissions').drop();
        database.collection('comments').drop();
    }
};