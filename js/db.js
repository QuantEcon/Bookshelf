/*
 * Database objects
 *
 * user = {
 *   'username': string
 *   'photo': .png/.jpeg/etc...
 * }
 *
 * comment = {
 *   'user' : user object
 *   'timestamp' : string
 * }
 *
 * submission = {
 *   'title' : string
 *   'notebook': notebook object
 *   'comments': array of comment objects
 *   'upvotes' : integer
 *   'downvotes': integer
 *   'upvotedUsers': array of user objects
 *   'downvotedUsers': array of user objects
 *   'history' : array of notebook objects
 * }
 *
 * notebook = {
 *   'title': string
 *   'file' : .ipynb file
 *   'timestamp' : string
 * }
 *
 */


var MongoClient = require('mongodb').MongoClient;
//this points to where the database is being run
var url = "mongodb://localhost:27017/QuantEconLib";

//Database facade object
var DBFacade = function () {
};

// POST methods
DBFacade.prototype.addUser = function (user) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err)
        } else {
            //todo: get users collection
            //todo: create new user document
            //todo: insert new user document
            //todo: close db
        }
    })
};

DBFacade.prototype.submitNotebook = function (notebook, user) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err)
        } else {
            //todo: get submissions collection
            //todo: create submission document
            //todo: insert submission document

            //todo: get notebooks collection
            //todo: create notebook document
            //todo: insert notebook document

            //todo: close db
        }
    });
};

DBFacade.prototype.resubmitNotebook = function (notebook, user) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get notebooks collection
            //todo: find document
            //todo: add notebook to list

            //todo: close db
        }
    });
};

DBFacade.prototype.submitComment = function (submissionTitle, user, comment) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get submissions collection
            //todo: find submission document
            //todo: create comment object
            //todo: add 'comment' to list

            //todo: close db
        }
    })
};

// Voting
DBFacade.prototype.upvote = function (notebook, user) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get submissions collection,
            //todo: find submission document
            //todo: increment 'votes'
            //todo: add 'user' to upvotedUsers
            //todo: remove 'user' from downvotedUsers (if needed)

            //todo: close db

        }
    })
};

DBFacade.prototype.downvote = function (notebook, user) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get submissions collection
            //todo: find submission document
            //todo: decrement 'votes'
            //todo: add 'user' to downvotedUsers
            //todo: remove 'user' from upvotedUsers (if needed)

            //todo: close db

        }
    })
};

// GET methods
DBFacade.prototype.getNotebook = function (notebookTitle) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get notebooks collection
            //todo: find notebook document

            //todo: close db

            //todo: return notebook
        }
    });
};

DBFacade.prototype.getSubmission = function (submissionTitle) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get submissions collection
            //todo: find submission document
            //todo: create submission object

            //todo: close db

            //todo: return submission object
        }
    })
};

DBFacade.prototype.getAllSubmissions = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get submissions collection
            //todo: iterate over all submission documents
            //todo: create submission object and add to array

            //todo: close db

            //todo: return submissions array
        }
    });
};

DBFacade.prototype.getAllUsers = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        } else {
            //todo: get users collection
            //todo: iterate over all user documents
            //todo: create user objects and add to array

            //todo: close db

            //todo: return array of user objects
        }
    });
};

module.exports = DBFacade;