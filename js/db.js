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
        return collection.updateOne(user, user, {upsert: true}).then(function (result) {
            return result.upsertedCount;
        });
    },

    updateUser: function (oldUser, newUser) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get users collection
        //         //todo: update oldUser with newUser
        //
        //         //todo: close db
        //     }
        // })
    },

    submitNotebook: function (notebook, user) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err)
        //     } else {
        //         //todo: get notebooks collection
        //         //todo: create notebook document
        //         //todo: insert notebook document
        //
        //         //todo: get submissions collection
        //         //todo: create submission document
        //         //todo: insert submission document
        //
        //         //todo: close db
        //     }
        // });
    },

    editNotebook: function (notebook, user) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get notebooks collection
        //         //todo: find document
        //         //todo: add notebook to list
        //
        //         //todo: close db
        //     }
        // });
    },

    deleteSubmission: function (submission) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(Err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find submission
        //         //todo: copy to deleted collection
        //         //todo: remove from submissions collection
        //
        //         //todo: close db
        //     }
        // })
    },

    submitComment: function (submissionTitle, user, comment) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find submission document
        //         //todo: create comment object
        //         //todo: add 'comment' to list
        //
        //         //todo: close db
        //     }
        // })
    },

    submitReply: function (submissionTitle, user, comment, inReplyTo) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err)
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find inReplyTo comment
        //         //todo: add comment to inReplyTo's comments
        //
        //         //todo: close db
        //     }
        // })
    },

    deleteComment: function (submissionTitle, user, comment) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: get submission document
        //         //todo: find and remove comment
        //
        //         //todo: close db
        //     }
        // })
    },

    // Voting
    upvote: function (notebook, user) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection,
        //         //todo: find submission document
        //         //todo: increment 'votes'
        //         //todo: add 'user' to upvotedUsers
        //         //todo: remove 'user' from downvotedUsers (if needed)
        //
        //         //todo: close db
        //
        //     }
        // })
    },

    revokeUpvote: function (notebook, user) {
        // MongoClient(url, function (err, db) {
        //     if(err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find submission document
        //         //todo: find 'user' in upvotedUsers
        //         //todo: remove 'user' from upvotedUsers
        //         //todo: decrement 'votes'
        //
        //         //todo: close db
        //     }
        // })
    },

    downvote: function (notebook, user) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find submission document
        //         //todo: decrement 'votes'
        //         //todo: add 'user' to downvotedUsers
        //         //todo: remove 'user' from upvotedUsers (if needed)
        //
        //         //todo: close db
        //
        //     }
        // })
    },

    revokeDownvote: function (notebook, user) {
        // MongoClient.connect(url, function (err, db) {
        //     if(err){
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find 'user' in downvotedUsers
        //         //todo: remove 'user'
        //         //todo: increment 'votes'
        //
        //         //todo: close db
        //     }
        // })
    },

// GET methods
    getNotebook: function (notebookTitle) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get notebooks collection
        //         //todo: find notebook document
        //
        //         //todo: close db
        //
        //         //todo: return notebook
        //     }
        // });
    },

    getSubmission: function (submissionTitle) {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: find submission document
        //         //todo: create submission object
        //
        //         //todo: close db
        //
        //         //todo: return submission object
        //     }
        // })
    },

    getAllSubmissions: function () {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get submissions collection
        //         //todo: iterate over all submission documents
        //         //todo: create submission object and add to array
        //
        //         //todo: close db
        //
        //         //todo: return submissions array
        //     }
        // });
    },

    getUser: function (uname) {
        var collection = database.collection('users');
        return collection.find({username: uname}).toArray();
    },

    getAllUsers: function () {
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {
        //         return console.dir(err);
        //     } else {
        //         //todo: get users collection
        //         //todo: iterate over all user documents
        //         //todo: create user objects and add to array
        //
        //         //todo: close db
        //
        //         //todo: return array of user objects
        //     }
        // });
    }
};