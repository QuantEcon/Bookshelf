'use strict'

// modules ==================================
var mongoose = require('mongoose');
var config = require('./../_config');

// config ===================================
const options = {
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 2000
}

module.exports.up = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        // perform db operations here
    })
    .then(() => {
      mongoose.close()
      return next()
    })
    .catch(err => next(err))
}

module.exports.down = function (next) {
    return mongoose.connect(config.url, options).then(db => {
        // perform db operations here
    })
    .then(() => {
      mongoose.close()
      return next()
    })
    .catch(err => next(err))
}