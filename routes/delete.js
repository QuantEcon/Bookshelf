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
            submission.deletedDate = Date.now()
            // go through and delete comments???
            submission.save();
            User.findOne({
                _id: req.user._id
            }, (err, user) => {
                if(err){
                    console.warn("[DeleteSubmssion] - error occured finding author:",err)
                    res.status(500)
                    res.send({
                        error: err
                    })
                } else if (user){
                    user.submissions = user.submissions.filter((id) => {
                        console.log("Checking ", id, " against ", req.body.submissionID)
                        return id != req.body.submissionID
                    })
                    user.deletedSubmissions.push(req.body.submissionID)
                    user.save()
                    res.sendStatus(200)
                }
                else {
                    console.warn("[DeleteSubmission] - couldn't find author")
                    res.status(500)
                    res.send({
                        error: "Couldn't find author"
                    })
                }
            })
        }
    })
})

module.exports = app;