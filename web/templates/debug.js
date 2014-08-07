//var async = require('async');
//var _ = require('underscore');
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'blinders', 'www')));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

