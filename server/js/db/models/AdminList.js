var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AdminList = new Schema({
    adminEmails: [String],
    adminIDs: [ObjectId]
})

module.exports = mongoose.model('AdminList', AdminList)