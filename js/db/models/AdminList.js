var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var adminList = new Schema({
    adminEmails: [String],
    adminIDs: [ObjectId]
})