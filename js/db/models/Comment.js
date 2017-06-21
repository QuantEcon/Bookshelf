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

    score: Number,

    content: String,

    edited: Boolean,
    editedDate: Date,

    replies: [ObjectId],

    flagged: Boolean,
    deleted: Boolean

});

commentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Comment', commentSchema);
