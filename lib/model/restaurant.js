'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){

    var restaurantSchema = require('./_gen/restaurant_gen')(app);
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Restaurant', restaurantSchema);
}