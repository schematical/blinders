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
        var data = null;
        var json = null;
        async.series([
            function(cb){
                 json = fs.readFileSync('/var/www/blinders/nearby.json');
                return cb();





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
            },
            //This will get removed in the future

            function(cb){
                data = JSON.parse(json);
                //Iterate through and see if we have any products that match the restraunts
                //async each?

                return cb();
            }
        ],
        function(){
            //end async
            res.json(data);
        });



    })
    app.param('restaurant_id', function(req, res, next, id){
        req.restaurant_id = id;
        return next();
    })
    app.get('/restaurants/:restaurant_id/menu', function(req, res, next){
        var data = null;
        var json = null;
        async.series([
            function(cb){
                //DEBUG
                json = fs.readFileSync('/var/www/blinders/products.json');
                return cb();


                var request_url = app.njax.config.eatstreet_api + '/restaurants/' +  req.restaurant_id + '/menu';


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
                    fs.writeFileSync('/var/www/blinders/products.json', json)
                    return cb();
                })
            },
            //This will get removed in the future

            function(cb){
                data = JSON.parse(json);
                data = data.products;
                //Iterate through and see if we have any products that match the restraunts
                //async each?

                return cb();
            }
        ],
            function(){
                //end async
                res.json(data);
            });



    });

    //Menu Options for a specific item:
    //https://dev.eatstreet.com/api/v2/products/6116768/options
    app.param('product_id', function(req, res, next, id){
        req.product_id = id;
        return next();
    })
    app.get('/products/:product_id/options', function(req, res, next){
        var data = null;
        var json = null;
        async.series([
            function(cb){
                //DEBUG
                json = fs.readFileSync('/var/www/blinders/options.json');
                return cb();


                var request_url = app.njax.config.eatstreet_api + '/products/' +  req.product_id + '/options';


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
                    fs.writeFileSync('/var/www/blinders/options.json', json)
                    return cb();
                })
            },
            //This will get removed in the future

            function(cb){
                data = JSON.parse(json);
                //data = data.products;
                //Iterate through and see if we have any products that match the restraunts
                //async each?

                return cb();
            }
        ],
            function(){
                //end async
                res.json(data);
            });



    })


}