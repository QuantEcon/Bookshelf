var express = require('express');
var passport = require('../js/auth/jwt');
var app = express.Router();
const notificationTypes = require("../js/notifications").notificationTypes
const sendInvite = require('../js/notifications').sendInvite


app.post('/', passport.authenticate('jwt', {
  session: 'false'
}), (req, res) => {
  console.log(req.body.inviteEmail);
  console.log(req.user.name);

  sendInvite(req.body.inviteEmail, req.user.name)

})

module.exports = app;