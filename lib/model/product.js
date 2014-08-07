'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){

    var productSchema = require('./_gen/product_gen')(app);
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Product', productSchema);
}