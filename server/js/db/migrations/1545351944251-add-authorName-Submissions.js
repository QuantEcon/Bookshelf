'use strict'
// modules ==================================
var mongoose = require('mongoose');
var config = require('../_config');
var Submission = require('../models/Submission');

// config ===================================
const options = {
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 2000
}

/**
 * this function performs the migration operation to add authorName field in submissions collection,
 * by getting its value from users collection
 */

module.exports.up = function (next) {
  return mongoose.connect(config.url, options).then(db => {
    return Submission.aggregate([
      {
        $lookup:
          {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorInfo"
          }
      },
      {
         $addFields:
          {
              authorName: { $reduce: { input: "$authorInfo.name", initialValue: "", in: { $concat : ["$$value", "$$this"] }} }
           }
       },
       {
           $project: 
           {
               "authorInfo": 0
           }
       },
       {
           $out: "submissions"
       }
   ])
  })
  .then(() => {
    mongoose.close()
    return next()
  })
  .catch(err => next(err))
}

/**
 *  This function removes the authorName field from the submission collection,
 *  which was added by the up migration function above
 */

module.exports.down = function (next) {
  return mongoose.connect(config.url, options).then(db => {
    return Submission.update({
        authorName: { $exists: true }
      },
      {
        $unset: { authorName: "" },
      },
      { multi: true }
    )
  })
  .then(() => {
    mongoose.close()
    return next()
  })
  .catch(err => next(err))
}
