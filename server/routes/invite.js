var express = require('express');
var passport = require('../js/auth/jwt');
var validator = require("email-validator");

var app = express.Router();
const notificationTypes = require("../js/notifications").notificationTypes
const sendInvite = require('../js/notifications').sendInvite


app.post('/', passport.authenticate('jwt', {
  session: 'false'
}), (req, res) => {
  console.log(req.body.inviteEmail);
  console.log(req.user.name);

  const inviteEmail = req.body.inviteEmail;
  // Validate email syntax
  if (validator.validate(inviteEmail)) {
    // Email is valid
    sendInvite(req.body.inviteEmail, req.user.name)
    return res.json({validEmail: inviteEmail, emailTruthValue: true});
  }
  else {
    // Email is not valid
    return res.status(404).json({emailError: 'Email is invalid!', emailTruthValue: false});
  }

})

module.exports = app;
