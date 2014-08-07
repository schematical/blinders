'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){

    var optionSchema = require('./_gen/option_gen')(app);
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Option', optionSchema);
}