/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var submissionSchema = new Schema({
    title: String,
    topics: [String],
    lang: String,
    summary: String,
    fileName: String,
    notebookJSONString: String,
    ipynbFile: String,

    author: ObjectId,
    authorName: String,
    coAuthors: Array,
    comments: [ObjectId],
    totalComments: Number,

    score: Number,
    views: Number,

    published: Date,
    lastUpdated: Date,
    lastUpdateDate: Date,

    flagged: Boolean,
    flaggedReason: String,
    deleted: Boolean,

    deletedDate: Date,

    preRendered: Boolean,
    views: Number,
    viewers: [ObjectId],
    viewers_count: Number
});

submissionSchema.plugin(mongoosePaginate);
submissionSchema.index({title: 'text', summary: 'text', authorName: 'text'}, {"weights": {title: 2, authorName: 2, summary: 1}});


module.exports = mongoose.model("Submission", submissionSchema);
