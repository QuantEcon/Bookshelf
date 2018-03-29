/**
 * Created by tlyon on 5/26/17.
 */
// modules ======================================================
var mongoose = require('mongoose');
var config = require('./_config');

// config =======================================================
mongoose.connect(config.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log("Connected to Database!");
});
