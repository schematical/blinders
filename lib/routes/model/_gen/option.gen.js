var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(app){

     var route = app.njax.routes.option = {
        
            owner_query:function(){
                return { }
            },
        
        init:function(uri){

            if(!uri) uri = '/restaurants/:restaurant/products/:product/options';
            app.locals.partials._option_edit_form = 'model/_option_edit_form';
            app.param('option', route.populate)


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
                uri + '/:option',
                [
                    
                    route.update,
                    route.render_detail
                ]
            );

            app.all(uri, route.render_list);
            app.all(uri + '/new', route.render_edit);

            app.all(uri + '/:option', route.render_detail);
            app.all(uri + '/:option/edit', route.render_edit);


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
            app.model.Option.findOne(query, function(err, option){
                if(err){
                    return next(err);
                }
                if(option){
                    res.bootstrap('option', option);
                }
                return next();
            })
            


        },
        render_list:function(req, res, next){
            var query = _.clone(route.owner_query(req));
            if(!query){
                return next();
            }
            var options = null;
            async.series([
                function(cb){
                    
                        app.model.Option.find(query, function(err, _options){
                            if(err) return next(err);
                            options = _options;
                            return cb();
                        });
                    
                },
                function(cb){
                    res.locals.options = [];
                    for(var i in options){
                        res.locals.options.push(
                            options[i].toObject()
                        );
                    }
                    return cb();
                },
                function(cb){
                    res.render('model/option_list', res.locals.symbols);
                }
            ]);
        },
        render_detail:function(req, res, next){
            if(!req.option){
                return next();
            }
            res.render('model/option_detail', req.option.toObject());
        },
        render_edit:function(req, res, next){
            async.series([
                function(cb){
                    if(!req.option){
                        //return next();
                        req.option = new app.model.Option();
                    }
                    return cb();
                },
                
                function(cb){
                    if(req.product){
                        return cb();
                    }
                    app.model.Product.find({ }, function(err, products){
                        if(err) return next(err);
                        var product_objs = [];
                        for(var i in products){
                            var product_obj = products[i].toObject();
                            product_obj._selected = (req.option.product == products[i]._id);
                            product_objs.push(product_obj);
                        }
                        res.bootstrap('products', product_objs);
                        return cb();
                    });
                },
                
                function(cb){

                    res.render('model/option_edit');
                }
            ]);
        },
        create:function(req, res, next){
            if(!req.user){
                return res.redirect('/');
            }
            if(!req.option){
                req.option = new app.model.Option({
                    
                            product:(req.product || null),
                    
                    cre_date:new Date()
                });
            }
            return route.update(req, res, next);

        },
        update:function(req, res, next){
            if(!req.user){
                return next();//res.redirect('/');
            }
            if(!req.option){
                return next();
                //return next(new Error('Option not found'));
            }

            
                
                    req.option.namespace = req.body.namespace;
                
            
                
                    req.option.name = req.body.name;
                
            
                
                    req.option.desc = req.body.desc;
                
            
                
                    if(req.product){
                        req.option.product = req.product._id;
                    }else if(req.body.product){
                        req.option.product = req.body.product;
                    }
                
            
                
                    req.option.carbs = req.body.carbs;
                
            
                
                    req.option.calories = req.body.calories;
                
            
                
                    req.option.points = req.body.points;
                
            

            req.option.save(function(err, option){
                //app._refresh_locals();
                return next();
                //res.render('model/option_detail', { option: req.option.toObject() });
            });

        }
    }
    return route;

}