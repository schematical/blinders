var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(app){

     var route = app.njax.routes.restaurant = {
        
            owner_query:function(){
                return { }
            },
        
        init:function(uri){

            if(!uri) uri = '/restaurants';
            app.locals.partials._restaurant_edit_form = 'model/_restaurant_edit_form';
            app.param('restaurant', route.populate)


            app.post(
                uri,
                [
                    
                    route.create,
                    route.render_detail
                ]
            );
            app.post(
                uri + '/new',
                [
                    
                    route.create,
                    route.render_detail
                ]
            );
            app.post(
                uri + '/:restaurant',
                [
                    
                    route.update,
                    route.render_detail
                ]
            );

            app.all(uri, route.render_list);
            app.all(uri + '/new', route.render_edit);

            app.all(uri + '/:restaurant', route.render_detail);
            app.all(uri + '/:restaurant/edit', route.render_edit);


        },
        populate:function(req, res, next, id){
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            
            var or_condition = []

            if(checkForHexRegExp.test(id)){
                or_condition.push({ _id:new ObjectId(id) });
            }
            
                or_condition.push({ namespace:id });
            
            if(or_condition.length == 0){
                return next();
            }
            var query = { $or: or_condition };
            app.model.Restaurant.findOne(query, function(err, restaurant){
                if(err){
                    return next(err);
                }
                if(restaurant){
                    res.bootstrap('restaurant', restaurant);
                }
                return next();
            })
            


        },
        render_list:function(req, res, next){
            var query = _.clone(route.owner_query(req));
            if(!query){
                return next();
            }
            var restaurants = null;
            async.series([
                function(cb){
                    
                        app.model.Restaurant.find(query, function(err, _restaurants){
                            if(err) return next(err);
                            restaurants = _restaurants;
                            return cb();
                        });
                    
                },
                function(cb){
                    res.locals.restaurants = [];
                    for(var i in restaurants){
                        res.locals.restaurants.push(
                            restaurants[i].toObject()
                        );
                    }
                    return cb();
                },
                function(cb){
                    res.render('model/restaurant_list', res.locals.symbols);
                }
            ]);
        },
        render_detail:function(req, res, next){
            if(!req.restaurant){
                return next();
            }
            res.render('model/restaurant_detail', req.restaurant.toObject());
        },
        render_edit:function(req, res, next){
            async.series([
                function(cb){
                    if(!req.restaurant){
                        //return next();
                        req.restaurant = new app.model.Restaurant();
                    }
                    return cb();
                },
                
                function(cb){

                    res.render('model/restaurant_edit');
                }
            ]);
        },
        create:function(req, res, next){
            if(!req.user){
                return res.redirect('/');
            }
            if(!req.restaurant){
                req.restaurant = new app.model.Restaurant({
                    
                    cre_date:new Date()
                });
            }
            return route.update(req, res, next);

        },
        update:function(req, res, next){
            if(!req.user){
                return next();//res.redirect('/');
            }
            if(!req.restaurant){
                return next();
                //return next(new Error('Restaurant not found'));
            }

            
                
                    req.restaurant.namespace = req.body.namespace;
                
            
                
                    req.restaurant.name = req.body.name;
                
            
                
                    req.restaurant.desc = req.body.desc;
                
            

            req.restaurant.save(function(err, restaurant){
                //app._refresh_locals();
                return next();
                //res.render('model/restaurant_detail', { restaurant: req.restaurant.toObject() });
            });

        }
    }
    return route;

}