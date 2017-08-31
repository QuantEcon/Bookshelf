var express = require('express');
var passport = require('../js/auth/jwt');
const bodyParser = require('body-parser');

var User = require('../js/db/models/User');
var Submission = require('../js/db/models/Submission');
var Comment = require('../js/db/models/Comment');

var app = express.Router();

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

app.post('/submission', passport.authenticate('jwt', {
    session: 'false'
}), (req, res) => {
    Submission.findById(req.body.submissionID, (err, submission) => {
        if (err) {
            res.status(500);
            res.send({
                error: err
            });
        } else {
            submission.deleted = true;
            // go through and delete comments???
            submission.save();
        }
    })
})

module.exports = app;