'use strict'

// modules ==================================
let mongoose = require('mongoose');
let config = require('./../_config');
let Users = require('../models/User');

// config ===================================
const options = {
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 2000
}

module.exports.up = function (next) {
  return mongoose.connect(config.url, options).then(db => {
    return Users.find({ $and: [{ currentProvider: "Google" }, { avatar: { $regex: /^((?!sz=50).)*$/ } }] }, function(err, docs) { 
      for (let e in docs) {
        let doc = docs[e];
        doc.avatar= doc.avatar + '?sz=50'; 
        doc.save((err) => {
          if (err) {
            console.log(err);
          } else {
          }
        })
      }
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
      return Users.find({ $and: [{ currentProvider: "Google" }, { avatar: { $regex: /^((?sz=50).)*$/ } }] }, function(err, docs) { 
        for (let e in docs) {
          let doc = docs[e];
          doc.avatar= doc.avatar.replace('?sz=50',''); 
          doc.save((err) => {
            if (err) {
              console.log(err);
            } else {
            }
          })
        }
      })
    })
    .then(() => {
      mongoose.close()
      return next()
    })
    .catch(err => next(err))
}