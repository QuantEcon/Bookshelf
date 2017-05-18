/**
 * Created by tlyon on 5/17/17.
 */

var express = require('express');

var app = express();

app.get('/', function (request, response) {
    response.send('Hello, World!');
});

app.listen(3000);

console.log("Server is running...");