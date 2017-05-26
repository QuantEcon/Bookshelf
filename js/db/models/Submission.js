/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var submissionSchema = new Schema({
    title: String,
    topicList: [String],
    language: String,
    summary: String,
    notebook: String, // html of notebook

    author: ObjectId,
    coAuthors: [ObjectId],
    comments: [ObjectId],

    votes: Number,
    views: Number,

    published: Date,
    lastUpdated: Date,

    flagged: Boolean,
    deleted: Boolean
});

module.exports = mongoose.model("Submission", submissionSchema);
