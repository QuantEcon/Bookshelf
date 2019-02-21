'use strict'

// modules ==================================
var mongoose = require('mongoose');
var config = require('./../_config');
var Comments = require('../models/Comment');

// config ===================================
const options = {
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 2000
}

module.exports.up = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        Comments.findAndModify({
            query: { "content": "" },
            update: { $set: {"deleted": true }},
            upsert: true
        })
    })
    .then(() => {
      mongoose.close()
      return next()
    })
    .catch(err => next(err))
}

module.exports.down = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        Comments.findAndModify({
            query: { "content": "" },
            update: { $set: {"deleted": false }},
            upsert: true
        })
    })
    .then(() => {
      mongoose.close()
      return next()
    })
    .catch(err => next(err))
}