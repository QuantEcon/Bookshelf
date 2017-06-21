/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var submissionSchema = new Schema({
    title: String,
    topicList: [String],
    language: String,
    summary: String,
    notebook: String, // html of notebook
    file: String, // path to file

    author: ObjectId,
    coAuthors: [ObjectId],
    comments: [ObjectId],

    score: Number,
    views: Number,

    published: Date,
    lastUpdated: Date,

    flagged: Boolean,
    deleted: Boolean
});

submissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Submission", submissionSchema);
