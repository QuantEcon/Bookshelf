/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var db = require('./js/db');
var port = 8080;

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.static(__dirname + "/public"));

//middleware
app.use(function (req, res, next) {
    console.log("Looking for URL : " + req.url);
    next();
});

app.use(function (req, res) {
    res.contentType('text/html');
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, function () {
    console.log("Server listening on port %d", port);
    db.initConnection(function () {
    });

});