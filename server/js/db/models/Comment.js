/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    author: ObjectId,
    timestamp: Date,
    submission: ObjectId,

    score: Number,

    content: String,

    edited: Boolean,
    editedDate: Date,
    deletedDate: Date,

    replies: [ObjectId],

    flagged: Boolean,
    flaggedReason: String,
    deleted: Boolean,

    isReply: Boolean,
    parentID: ObjectId

});

commentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Comment', commentSchema);
