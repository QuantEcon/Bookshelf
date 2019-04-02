var express = require('express');
var series = require('async/series');
var mdb = require('mongodb');
var app = express.Router();
var fs = require('fs');

var User = require('../../js/db/models/User');
var Submission = require('../../js/db/models/Submission');
var Comment = require('../../js/db/models/Comment');

var isAuthenticated = require('../auth/isAuthenticated').isAuthenticated;
var config = require('../../_config');
// var changeOrderRandomly = require('../../lib/sorting').changeOrderRandomly;

let globallyStoredSearchParams = {}
let globallyStoredCollections = {}

async function getStoredData() {
    return await globallyStoredCollections;
}

// /**
//  *  Function to change the order of notebook randomly with a given probability
//  * 
//  * @param {probability with which you want to swap a notebook} prob 
//  * @param {the present index to operate on} currentIndex
//  * @param {total number of notebooks} totalNo 
//  * @param {which indexes have been visited and operated upon} visitedArray 
//  * @param {the notebook data} data 
//  */
// function changeOrderRandomly(prob, currentIndex, totalNo, visitedArray, data) {
//   let randomNumber = Math.round(Math.random()*(totalNo - 1))
//   if (visitedArray.length < totalNo) {
//       while (visitedArray.includes(randomNumber)) {
//           randomNumber = Math.round(Math.random()*(totalNo - 1))
//       }
//   } else {
//       return;
//   }
//   let changeIndex = (Math.random() <= prob)
//   if (changeIndex) {
//       let temp = data[randomNumber]
//       data[randomNumber] = data[currentIndex]
//       data[currentIndex] = temp;
//       visitedArray.push(randomNumber);
//       visitedArray.push(currentIndex);
//   } else {
//       if (!visitedArray.includes(currentIndex)) {
//           visitedArray.push(currentIndex)
//       }
//   }
// }

/**
 * @api {get} /api/search/all-submissions Get Submissions
 * @apiGroup Search
 * @apiname GetSubmissions
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Queries the database for all submissions matching the parameters
 *
 * NOTE: The `sortBy Viewers` option sorts by the number of unqiue, authenticated viewers that have viewed the post.
 * This was to reduce the potential for false inflation of the `views` field.
 *
 * @apiParam {string}   lang        language of the notebook (Python, Julia, Other).
 * @apiParam {string}   topic       topic of the notebook. Given by the list of topics in the submission page.
 * @apiParam {id}       author      database id of the author.
 * @apiParam {string}   time        time of the submit date (Today, This month, This year, All time).
 * @apiParam {string}   keywords    string of keywords to check against the submission summary.
 * @apiParam {num}      page        used for pagination. Searches for the current page number.
 * @apiParam {string}   sortBy      attribute to sort by (Votes, Comments, Viewers, Discover, Date).
 *
 *
 * @apiSuccess (200) {Object[]}    submissions         array of submission database objects.
 * @apiSuccess (200) {Number}       totalSubmissions    the number of submissions found.
 * @apiSuccess (200) {Object[]}     authors             the author database objects for each submission.
 */
app.get('/all-submissions', function (req, res) {
    var searchParams = {
        deleted: false
    };
    if (req.query.lang !== 'All') {
        searchParams.lang = req.query.lang;
    }
    if (req.query.topic !== 'All') {
        console.log('[Search] - topic: ', req.query.topic)
        searchParams.topics = req.query.topic;
    }
    if (req.query.author) {
        if (req.query.author === 'my-profile') {
            searchParams.author = req.user._id;
        } else {
            searchParams.author = req.query.author;
        }
    }
    var page = req.query.page;
    var select = "_id title author views comments score summary published lang totalComments viewers flagged";

    var options = {
        limit: 10,
        sort: {
            published: -1
        },
        page: page,
        select: select
    };

    if (req.query.keywords !== "") {
        console.log('[Search] - has keywords: ', req.query.keywords)
        searchParams.$text = {
            $search: req.query.keywords
        };
    }

    if (req.query.time) {
        switch (req.query.time) {
            case 'Today':
                var today = new Date();
                //todo: subtract 24 hours, don't just set to 00:00
                today.setHours(today.getHours() - 24);
                searchParams.published = {
                    $gt: today
                };
                break;
            case 'This month':
                var month = new Date();
                //todo: subtract 30 days, don't just set to 1st
                month.setDate(month.getDate() - 30);
                month.setHours(0, 0, 0, 0);
                searchParams.published = {
                    $gt: month
                };
                break;
            case 'This year':
                var year = new Date();
                //todo: subtract 365 days, don't just set to Jan 1st
                year.setDate(year.getDate() - 365);
                year.setHours(0, 0, 0, 0);
                searchParams.published = {
                    $gt: year
                };
                break;
            case 'All time':
                break;
        }
    }
    if (req.query.sortBy) {
        switch (req.query.sortBy) {
            case 'Date':
                break;
            case 'Comments':
                options.sort = {
                    'totalComments': -1,
                    'published': -1
                };
                break;
            case 'Views':
                options.sort = {
                    'views': -1,
                    'published': -1
                };
                break;
            case 'Votes':
                options.sort = {
                    'score': -1,
                    'published': -1
                };
                break;
        } 
    }
    // if (req.query.sortBy == 'Discover') {
    //   let queryPromise = null;
    //   let storedRandomCollection = getStoredData();
    //   storedRandomCollection.then((data) => {
    //       if (!data || (JSON.stringify(searchParams) != JSON.stringify(globallyStoredSearchParams)) || req.query.page == 1) {
    //           queryPromise = Submission.find(searchParams).sort({
    //               'score': -1,
    //               'published': -1
    //           }).then((data) => {
    //               let visitedArray = [];
    //               for (let i = 0; i < data.length; i++) {
    //                 changeOrderRandomly(0.25, i, data.length, visitedArray, data)
    //               }
    //               globallyStoredCollections = data;
    //               globallyStoredSearchParams = searchParams;
    //               return data
    //           })
    //       } else {
    //           queryPromise = new Promise((resolve) =>{
    //               resolve(storedRandomCollection)
    //           })
    //       }
    //       return queryPromise
    //   }).then((shuffledData) => {
    //       let submissions = shuffledData.slice(10*(req.query.page - 1),req.query.page*10)
    //       var err = null;
    //       if (err) {
    //           console.log("Error occurred finding submissions");
    //           res.status(500);
    //           res.send("Error occurred finding submissions")
    //       } else {
    //           // get users that match search parameters
    //             var authorIds = submissions.map((submission) => {
    //               return submission.author;
    //           });
    //           const availableLanguages = [];
    //           submissions = submissions.map((data) => {
    //               return {
    //                   "_id": data._id,
    //                   "title": data.title,
    //                   "lang": data.lang,
    //                   "summary": data.summary,
    //                   "author": data.author,
    //                   "totalComments": data.totalComments,
    //                   "views": data.views,
    //                   "published": data.published,
    //                   "flagged": data.flagged
    //               }
    //           })
    //           Submission.find({'deleted': false}, (err, submissions) => {
    //             // save currently available languages from unarchived notebooks
    //             submissions.map((submission) => {
    //               availableLanguages.push(submission.lang);
    //             })
    //             if(err) {
    //               console.log('Error occurred finding deleted submissions', err);
    //             }
    //             User.find({
    //               _id: {
    //                 $in: authorIds
    //               }
    //             }, 'name avatar _id', (err, authors) => {
    //               if(err) {
    //                 console.log("Error occurred finding authors");
    //               } else if( authors && submissions.length != 0) {
    //                   res.send({
    //                     submissions: submissions,
    //                     totalSubmissions: shuffledData.length,
    //                     authors: authors,
    //                     languages: availableLanguages.sort(),
    //                 });
    //               } else {
    //                 res.send({
    //                   submissions: submissions,
    //                   totalSubmissions: shuffledData.length,
    //                   authors: authors,
    //                 });
    //               }
    //             })
    //           })
    //       }
    //   });
    // } else {
      //todo: add select statement to only get required info
      Submission.paginate(searchParams, options).then((result) => {
        var submissions = result.docs;
        var err = null;
        if (err) {
            console.log("Error occurred finding submissions");
            res.status(500);
            res.send("Error occurred finding submissions")
        } else {
            // get users that match search parameters
            var authorIds = submissions.map((submission) => {
                return submission.author;
            });
            const availableLanguages = [];
            Submission.find({ 'deleted': false
            }, (err, submissions) => {
                  // save currently available languages from unarchived notebooks
                  submissions.map((submission) => {
                      availableLanguages.push(submission.lang);
                  })
                  if(err) {
                      console.log('Error occurred finding deleted submissions', err);
                  } 
                  User.find({
                      _id: {
                        $in: authorIds
                    }
                  }, 'name avatar _id', function (err, authors) {
                    if(err) {
                      console.log("Error occurred finding authors");
                    } else if (authors && submissions.length != 0) { // display available languages with non-archived notebooks.
                        res.send({
                          submissions: submissions,
                          totalSubmissions: result.total,
                          authors: authors,
                          languages: availableLanguages.sort(),
                      });
                    } else { // notebooks have all been archived and return languages as to default 'All'
                      res.send({
                        submissions: submissions,
                        totalSubmissions: result.total,
                        authors: authors,
                    });
                  }
                });
              });
            }
        })  
    // }
});
    

// endpoint to get a list of all the existing users
app.get('/userList', (req, res) => {
    var err = null;
    var select = "_id avatar name fb.url github.url twitter.url email";
    if (err) {
        res.status(500);
        res.send({
            error: err
        });
    } else {
        User.find({},select, function(err, users) {

        var userMap = {};
        console.log(req.query._id);

        users.forEach(function(user) {
            if (user._id != req.query._id ) {
                userMap[user._id] = user;
            }
        });

        res.send(userMap);
      });
    }
});

/**
 * @api {get} /api/search/notebook/:nbid Get Submission
 * @apiGroup Search
 * @apiName GetSubmission
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {string} nbID the id of the submission being searched for.
 *
 * @apiDescription If the nbid matches one of the objects in the database, and object will be sent
 * back
 *
 * Note: the authors' objects will only contain the necessary data to display a summary -
 * avatar, name and author id
 *
 * If there is a current user supplied in the req.currentUser, then a data.user object will be appended to
 * the reponse
 *
 * @apiSuccess (200) {Object}   data                The data for the submission
 * @apiSuccess (200) {Object}   data.notebook       the notebook object from the database.
 * @apiSuccess (200) {String}   data.html           the pre-rendered notebook html (if pre-rendering was enabled).
 * @apiSuccess (200) {Object}   data.notebookJSON   the raw JSON of the ipynb file.
 * @apiSuccess (200) {String}   data.fileName        the original filename of the notebook.
 * @apiSuccess (200) {ID}       data.author         the author's user database object.
 * @apiSuccess (200) {Object[]} data.coAuthors      an array of email adresses and/or user objects.
 * @apiSuccess (200) {Object[]} data.comments       an array of comment database objects for the sumbission.
 * @apiSuccess (200) {Object[]} data.replies        an array of comment database ojects for the submission.
 * @apiSuccess (200) {Object[]} data.commentAuthors an array of user database objects for each author of a comment/reply.
 * @apiSuccess (200) {Object}   data.user           An object of the current user's data (if any)
 * @apiSuccess (200) {ID}       data.user._id       ID of the current user
 * @apiSuccess (200) {ID[]}     data.user.upvotes   Array of object id's representing the user's upvotes
 * @apiSuccess (200) {ID[]}     data.user.downvotes Array of object id's representing the user's downvotes
 *
 * @apiError (404) NotebookNotFound No notebook was found with matching id
 * @apiError (500) InternalServerError An error occurred searching the database for relevant data
 */

Array.prototype.unique = function() {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }


app.get('/notebook/:nbid', isAuthenticated, function (req, res) {

    // get nb info
    var notebook;
    var commentAuthorIDs;
    var replyIDs;
    var mergedReplyIDs;
    var replyAuthorIDs;
    var updatedDate;

    var userDeleted;
    var notebookID = req.params.nbid;

    //get notebook information
    series({
            //get notebook
            nb: function (callback) {
                var select = "_id title author views comments score summary topics published lang fileName viewers views coAuthors notebookJSONString";

                // to find the submission by ID
                Submission.findById(notebookID, function(err, sub) {
                  if(err) {
                    console.log("[Search] error searching for submission by ID: ", err)
                    callback(err)
                  } else if (sub) {
                    // intialising updatedDate
                    updatedDate = sub.lastUpdated
                  }
                });

                try {
                    Submission.findOne({
                        _id: mdb.ObjectId(notebookID),
                        deleted: false
                    }, select, function (err, submission) {
                        if (err) {
                            console.log("[Search] error searching for submission: ", err)
                            callback(err)
                        } else if (submission) {

                            notebook = submission
                            notebook.nbLength = submission.notebookJSONString.length
                            notebook.lastUpdated = updatedDate

                            //TODO: This needs to be tested
                            //Increment total number of views
                            submission.views++;
                            submission.updateDate = updatedDate

                            notebook.coAuthors = submission.coAuthors
                            // TODO: Need to check for submission.viewers_count and test
                            // check initially if there exists an array, if current array is empty, then then create a new one
                            if(submission.viewers.length == 0){
                              //create an array to store all users who have viewed the submission
                              console.log("Creating an empty submission.viewers array...");
                              submission.viewers = [];
                            }
                            // check if current user is logged in
                            if(req.user) {
                              // if the current user has not viewed the submission before and current user is not the same as author
                              if(submission.viewers.indexOf(req.user._id) == -1 && JSON.stringify(submission.author) !== JSON.stringify(req.user._id)) {
                                // push the current user into the submission.viewers
                                submission.viewers.push(req.user._id);
                                submission.viewers = submission.viewers.unique();
                                submission.viewers_count = submission.viewers.length;
                              }
                            }
                            // just double checking when user is not logged in
                            else {
                              console.log("User is not logged in");
                            }

                            var totalComments = submission.comments.length
                            console.log("comments.length: ", totalComments)
                            Comment.find({"_id": {"$in": submission.comments}}, (err, comments) => {
                                if(err){
                                    console.error("Error getting comments: ", err)
                                } else if(comments){
                                    comments.forEach((comment) => {
                                        // console.log("replies: ", comment.replies)
                                        totalComments += comment.replies.length
                                        // console.log("total comments now at ", totalComments)
                                    })
                                    console.log("total comments: ", totalComments)
                                    submission.totalComments = totalComments
                                    submission.save()
                                }
                            })

                            // Check if has been preRendered and we want to send the pre-rendered notebook
                            if (submission.preRendered && config.preRender) {
                                // Get html from preRendered file
                                var fileName = config.rootDirectory + config.filesDirectory + '/' + submission._id + '.html'
                                console.log('File path: ', fileName);
                                try {
                                    notebook.html = fs.readFileSync(fileName).toString();
                                } catch (ex) {
                                    console.warn('Error: ', ex, "\nDoes that file exist?")
                                }

                            } else {
                                // TODO: Submission hasn't already been pre-rendered, but we want it to be
                                // Render and save html now
                                if (config.preRender) {

                                }
                            }
                            submission.save((err) => {
                                console.log('[Search] - typeof notebookJSON: ', typeof (notebook.notebookJSON));
                                callback(null, notebook);
                            })
                            // notebook.notebookJSONString = null;
                        } else {
                            console.log('submission not found');
                            callback('Not found', null);
                        }
                    });
                } catch (err) {
                    console.log("[Search] submission not found")
                    callback("Not found", null)
                }
            },
            //get submission author
            auth: function (callback) {
                var select = "_id avatar name";

                User.findOne({
                    _id: mdb.ObjectId(notebook.author)
                }, select, function (err, author) {
                    if (err) callback(err);
                    else {
                        console.log("[Search] - found author: ", author)
                        callback(null, author);
                    }
                })
            },
            //get comments
            coms: function (callback) {
                // todo: add select statement
                Comment.find({
                    _id: {
                        $in: notebook.comments
                    },
                    deleted: false
                }, function (err, comments) {
                    if (err) callback(err);
                    else {
                        commentAuthorIDs = comments.map(function (comment) {
                            return comment.author;
                        });
                        replyIDs = comments.map(function (comment) {
                            return comment.replies.map(function (reply) {
                                // console.log('\tReply: ', reply);
                                return reply;
                            });
                        });
                        // comments.map(function (comment) {
                        //   // find if comment author has been deleted
                        //   User.findOne({_id: comment.author}, function (err, user){
                        //     if(err) {
                        //       return done(err);
                        //     } else if (user) {
                        //       // if user has been deleted, replace user name as `anonymous`
                        //       if(user.deleted) {
                        //         user.name = 'Anonymous';
                        //         userDeleted = user.name;
                        //       }
                        //     }
                        //   });
                        // });

                        mergedReplyIDs = [].concat.apply([], replyIDs);
                        callback(null, comments);
                    }
                })
            },
            reps: function (callback) {
                //get replies
                //TODO: add select statement
                Comment.find({
                    _id: {
                        $in: mergedReplyIDs
                    },
                    deleted: false
                }, function (err, replies) {
                    if (err) callback(err);
                    else {
                        replyAuthorIDs = replies.map(function (reply) {
                            return reply.author;
                        });
                        callback(null, replies);
                    }
                });
            },

            //get comments/replies authors
            comAuth: function (callback) {
                //only get name, id, avatar, & deleted from comment/reply authors
                var select = "_id avatar name deleted";
                var mergedAuthorIDs = [].concat(commentAuthorIDs).concat(replyAuthorIDs);

                User.find({
                    _id: {
                        $in: mergedAuthorIDs
                    }
                }, select, function (err, commentAuthors) {
                    if (err) callback(err);
                    else {
                        callback(null, commentAuthors);
                    }
                });
            }
        },
        //callback
        function (err, results) {
            //console.log("[Search] results: ", results)
            if (err) {
                if (notebook) {
                    console.log("Server err: ", err);
                    res.sendStatus('500');
                } else {
                    console.log("Couldn't find notebook");
                    res.sendStatus('404');
                    return;
                }
            }

            var nb = JSON.parse(JSON.stringify(results.nb))
            nb.notebookJSONString = null
            var data = {
                notebook: nb,
                html: results.nb.html,
                fileName: results.nb.fileName,
                author: results.auth,
                coAuthors: results.nb.coAuthors,
                comments: results.coms,
                replies: results.reps,
                commentAuthors: results.comAuth,
                nbLength: results.nb.nbLength,
                userDeleted: userDeleted,
            };
            if (req.user) {
                data.currentUser = {
                    _id: req.user._id,
                    upvotes: req.user.upvotes,
                    downvotes: req.user.downvotes
                }
            }
            res.send(data);
        }
    );
});

app.get('/notebook_json/:nbid', function(req, res) {
    var select = "notebookJSONString"

    Submission.findById(req.params.nbid, select, (err, submission) => {
        if(err) {
            console.warn("[Search-SubmissionJSON] - Error searching for notebook json: ", err)
            res.sendStatus(500)
        } else if(submission){
            const json = JSON.parse(submission.notebookJSONString)
            res.set('content-length', submission.notebookJSONString.length)
            res.send({
                json,
            })
        } else {
            res.sendStatus(404)
        }
    })

})


/**
 * @api {get} /api/search/users Get Users
 * @apiGroup Search
 * @apiName GetUsers
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription Queries the database for a user with the matching _id from req.query.
 *
 * If no user is found with a matching id or if no id was supplied in the request,
 * a 404 will be returned.
 *
 * If a user is found with a matching id, an object will be returned
 *
 * @apiParam {string} _id Database id of the user being search for.
 *
 * @apiSuccess (200) {Object[]} users            Array of matching user objects.
 * @apiSuccess (200) {String} users._id          database id of the user.
 * @apiSuccess (200) {String} users.name         name of the user.
 * @apiSuccess (200) {String} users.avatar       url to user's avatar.
 * @apiSuccess (200) {String} users.email        user's email address.
 * @apiSuccess (200) {String} users.joinDate     date the user joined Bookshelf.
 * @apiSuccess (200) {Boolean} users.oneSocial   boolean flag if the user as only authenticated one social account.
 * @apiSuccess (200) {ID[]} users.submissions    array of submission id's.
 *
 * @apiError (404) UserNotFound No user was found with matching id
 *
 * @apiError (500) InternalServerError an error occured querying the database
 */
app.get('/users', function (req, res) {
    console.log("Received user search request: ", req.query);
    var params = {};
    if (req.query._id) {
        if (req.query._id == 'my-profile') {
            params._id = req.user._id;
        } else {
            params._id = req.query._id;
        }
    }

    console.log("Searching users: ", params);

    var select = "_id avatar name summary joinDate fb.url github.url twitter.url email oneSocial submissions";

    User.find(params, select, function (err, users) {
        if (err) {
            res.status(500);
        } else {
            res.send(users);
        }
    });
});


module.exports = app;
