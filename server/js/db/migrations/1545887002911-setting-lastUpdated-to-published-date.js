'use strict'

// modules ==================================
var mongoose = require('mongoose');
var config = require('../_config');
var Submission = require('../models/Submission.js');

// config ===================================
const options = {
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 2000
}

async function update(data) {
    await Promise.all(data.map(async(d) => {
        await Submission.updateOne({ _id: d._id }, { $set: { lastUpdated: d.published }})
    }))
}

module.exports.up = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        return Submission.find({$where : "this.published > this.lastUpdated"});
    })
    .then((data) => {
      update(data).then(() => {
        mongoose.connection.close()
        return next()
      })
    })
    .catch(err => next(err))
}

module.exports.down = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        // perform db operations here
    })
    .then(() => {
      mongoose.connection.close()
      return next()
    })
    .catch(err => next(err))
}