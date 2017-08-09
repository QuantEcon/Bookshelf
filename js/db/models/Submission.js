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
    lang: String,
    summary: String,
    fileName: String,
    notebookJSON: Object,
    ipynbFile: String,

    author: ObjectId,
    coAuthors: [ObjectId],
    comments: [ObjectId],
    totalComments: Number,

    score: Number,
    views: Number,

    published: Date,
    lastUpdated: Date,

    flagged: Boolean,
    deleted: Boolean
});

submissionSchema.plugin(mongoosePaginate);
submissionSchema.index({title: 'text', summary: 'text'});


module.exports = mongoose.model("Submission", submissionSchema);
