var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var announcementSchema = new Schema({
    date: Date,
    content: String,
    postedBy: ObjectId
})

module.exports = mongoose.model('Announcement', announcementSchema)