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
    return Users.find({ $and: [{ currentProvider: "Twitter" }, { avatar: { $regex: /^((?!_normal).)*$/ } }] }, function(err, docs) {
     for (let e in docs) {
       let doc = docs[e];
       if (doc.avatar.indexOf('.jpeg') > -1) {
           doc.avatar = doc.avatar.replace('.jpeg', '_normal.jpeg');
         } else if (doc.avatar.indexOf('.png') > -1) {
           doc.avatar = doc.avatar.replace('.png', '_normal.png');
         } else if (doc.avatar.indexOf('.jpg') > -1) {
           doc.avatar = doc.avatar.replace('.jpg', '_normal.jpg');
         };
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
    return Users.find({ $and: [{ currentProvider: "Twitter" }, { avatar: { $regex: /^((?_normal).)*$/ } }] }, function(err, docs) {
      for (let e in docs) {
        let doc = docs[e];
        if (doc.avatar.indexOf('.jpeg') > -1) {
            doc.avatar = doc.avatar.replace('_normal.jpeg', '.jpeg');
          } else if (doc.avatar.indexOf('.png') > -1) {
            doc.avatar = doc.avatar.replace('_normal.png', '.png');
          } else if (doc.avatar.indexOf('.jpg') > -1) {
            doc.avatar = doc.avatar.replace('_normal.jpg', '.jpg');
          };
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