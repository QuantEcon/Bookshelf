var express=require('express');
var passport = require('../js/auth/jwt');
var app = express.Router();
const notificationTypes = require("../js/notifications").notificationTypes
const sendNotification = require('../js/notifications').sendNotification



app.get('/invite', passport.authenticate('jwt', {
    session: 'false'
}),(req,res)=>{
  console.log(req.query.inviteEmail);
  console.log(req.user.name);

  sendNotification({
      type: notificationTypes.INVITE_SENT,
      recipient: req.query.inviteEmail,
      sender: req.user.name
  })

})

module.exports = app;
