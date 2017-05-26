/**
 * Created by tlyon on 5/26/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    author: ObjectId,
    timestamp: Date,

    content: String,

    replies: [ObjectId],

    flagged: Boolean,
    deleted: Boolean

});

module.exports = mongoose.model('Comment', commentSchema);
