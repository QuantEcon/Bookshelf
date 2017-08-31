var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var emailList = new Schema({
    emails: Array,
    name: String
})

module.exports = mongoose.model('EmailList', emailList)