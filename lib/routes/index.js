var fs = require('fs');
var request = require('request');
var async = require('async');
var _ = require('underscore');

module.exports = function(app){
    app.all('/', function(req, res, next){
        res.render('index');
    });


    /**
     * Model Routes
     */
    require('./model/index')(app);

    app.get('/restaurants/nearby', function(req, res, next){
        var json = null;
        async.series([
            function(cb){

                var request_url = app.njax.config.eatstreet_api + '/restaurants/nearby?';
                request_url += 'latitude=' +  req.query.latitude + '&';
                request_url += 'longitude=' +  req.query.longitude + '&';

                //IF req.query.admin == true then do real request

                //else pull from the db


                console.log("Pre-request");
                request(request_url, function (error, response, body) {
                    console.log("request done");
                    if (error){
                        return next(error);
                    }
                    if(response.statusCode != 200) {
                        return next(new Error("EatStreet API returned a status code of - " + response.statusCode))
                    }
                    json = body
                    return cb();
                })
            }
        ],
        function(){
            //end async
            res.json(json);
        });


        /*var json = fs.readFileSync('/var/www/blinders/nearby.json');
        var data = JSON.parse(json);
        res.json(data);*/
    })
    app.get('/test', function(req, res, next){
        var json = fs.readFileSync('/var/www/blinders/nearby.json');
        var data = JSON.parse(json);
        res.json(data);
    })

}