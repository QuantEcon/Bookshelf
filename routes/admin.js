var express = require('express')
var passport = require('../js/auth/adminjwt')

var User = require('../js/db/models/User');
var Submission = require('../js/db/models/Submission');
var Comment = require('../js/db/models/Comment');

var app = express.Router();

app.post("/admin/delete-submission", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete submission
})

app.post("/admin/make-admin", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: make user admin
})

app.post("/admin/delete-comment", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete comment
})

app.post("/admin/delete-reply", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete reply
})

app.post("/admin/delete-user", passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    // TODO: Delete user
})