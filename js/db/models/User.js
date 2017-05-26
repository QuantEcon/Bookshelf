/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    // info
    name: String,
    views: Number,
    numComments: Number,
    joinDate: Date,
    voteScore: Number,
    position: String,
    submissions: [ObjectId],
    upvotes: [ObjectId],
    downvotes: [ObjectId],
    avatar: String,
    // social media/websites
    website: String,
    email: String,
    github: {
        id: String,
        access_token: String,
        url: String
    },
    fb: {
        id: String,
        access_token: String,
        first_name: String,
        last_name: String,
        url: String
    },
    linkedin: {
        id: String,
        access_token: String,
        url: String
    },
    google: {
        id: String
    },
    twitter: {
        id: String,
        access_token: String
    },
    // meta
    flagged: Boolean,
    deleted: Boolean
});

module.exports = mongoose.model("User", userSchema);
