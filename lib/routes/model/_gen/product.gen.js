var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(app){

     var route = app.njax.routes.product = {
        
            owner_query:function(){
                return { }
            },
        
        init:function(uri){

            if(!uri) uri = '/restaurants/:restaurant/products';
            app.locals.partials._product_edit_form = 'model/_product_edit_form';
            app.param('product', route.populate)


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
                uri + '/:product',
                [
                    
                    route.update,
                    route.render_detail
                ]
            );

            app.all(uri, route.render_list);
            app.all(uri + '/new', route.render_edit);

            app.all(uri + '/:product', route.render_detail);
            app.all(uri + '/:product/edit', route.render_edit);


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
            app.model.Product.findOne(query, function(err, product){
                if(err){
                    return next(err);
                }
                if(product){
                    res.bootstrap('product', product);
                }
                return next();
            })
            


        },
        render_list:function(req, res, next){
            var query = _.clone(route.owner_query(req));
            if(!query){
                return next();
            }
            var products = null;
            async.series([
                function(cb){
                    
                        app.model.Product.find(query, function(err, _products){
                            if(err) return next(err);
                            products = _products;
                            return cb();
                        });
                    
                },
                function(cb){
                    res.locals.products = [];
                    for(var i in products){
                        res.locals.products.push(
                            products[i].toObject()
                        );
                    }
                    return cb();
                },
                function(cb){
                    res.render('model/product_list', res.locals.symbols);
                }
            ]);
        },
        render_detail:function(req, res, next){
            if(!req.product){
                return next();
            }
            res.render('model/product_detail', req.product.toObject());
        },
        render_edit:function(req, res, next){
            async.series([
                function(cb){
                    if(!req.product){
                        //return next();
                        req.product = new app.model.Product();
                    }
                    return cb();
                },
                
                function(cb){
                    if(req.restaurant){
                        return cb();
                    }
                    app.model.Restaurant.find({ }, function(err, restaurants){
                        if(err) return next(err);
                        var restaurant_objs = [];
                        for(var i in restaurants){
                            var restaurant_obj = restaurants[i].toObject();
                            restaurant_obj._selected = (req.product.restaurant == restaurants[i]._id);
                            restaurant_objs.push(restaurant_obj);
                        }
                        res.bootstrap('restaurants', restaurant_objs);
                        return cb();
                    });
                },
                
                function(cb){

                    res.render('model/product_edit');
                }
            ]);
        },
        create:function(req, res, next){
            if(!req.user){
                return res.redirect('/');
            }
            if(!req.product){
                req.product = new app.model.Product({
                    
                            restaurant:(req.restaurant || null),
                    
                    cre_date:new Date()
                });
            }
            return route.update(req, res, next);

        },
        update:function(req, res, next){
            if(!req.user){
                return next();//res.redirect('/');
            }
            if(!req.product){
                return next();
                //return next(new Error('Product not found'));
            }

            
                
                    req.product.namespace = req.body.namespace;
                
            
                
                    req.product.name = req.body.name;
                
            
                
                    req.product.desc = req.body.desc;
                
            
                
                    if(req.restaurant){
                        req.product.restaurant = req.restaurant._id;
                    }else if(req.body.restaurant){
                        req.product.restaurant = req.body.restaurant;
                    }
                
            
                
                    req.product.carbs = req.body.carbs;
                
            
                
                    req.product.calories = req.body.calories;
                
            
                
                    req.product.points = req.body.points;
                
            

            req.product.save(function(err, product){
                //app._refresh_locals();
                return next();
                //res.render('model/product_detail', { product: req.product.toObject() });
            });

        }
    }
    return route;

}