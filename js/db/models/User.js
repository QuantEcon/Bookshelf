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
    currentSubmission: Object,
    upvotes: [ObjectId],
    downvotes: [ObjectId],
    avatar: String,
    // social media/websites
    website: String,
    email: String,
    summary: String,
    activeAvatar: String,
    github: {
        id: String,
        access_token: String,
        url: String,
        username: String,
        hidden: Boolean,
        avatarURL: String,
    },
    fb: {
        id: String,
        access_token: String,
        displayName: String,
        url: String,
        hidden: Boolean,
        avatarURL: String,
    },
    linkedin: {
        id: String,
        access_token: String,
        url: String,
        displayName: String,
        hidden: Boolean,
        avatarURL: String,
    },
    google: {
        id: String,
        avatarURL: String,
    },
    twitter: {
        id: String,
        access_token: String,
        username: String,
        avatarURL: String,
    },
    oneSocial: Boolean,
    // meta
    flagged: Boolean,
    deleted: Boolean
});

module.exports = mongoose.model("User", userSchema);
