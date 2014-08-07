'use strict';
var fs = require('fs');
var async = require('async');


module.exports = function(app){

    var Schema = app.mongoose.Schema;

    var fields = {
        _id: { type: Schema.Types.ObjectId },
    
        
            namespace:{ type:String },
        
    
        
            name:{ type:String },
        
    
        
            desc_raw:String,
            desc_rendered:String,
        
    
        cre_date:Date
    };

    var restaurantSchema = new Schema(fields);

    restaurantSchema.virtual('uri').get(function(){
        
            
                return '/restaurants/' + (this.namespace || this._id);
            
        
    });

    
        

    
        

    
        
            restaurantSchema.virtual('desc').get(function(){
                return this.desc_rendered;
            }).set(function(value){
                if(!value || value.length == 0){
                    return false;
                }
                var markdown = require('markdown').markdown;
                this.desc_raw = value;
                this.desc_rendered = markdown.toHTML(value);
            });

        

    


    restaurantSchema.pre('save', function(next){
        if(!this._id){
            this._id = new app.mongoose.Types.ObjectId();
        }
        return next();
    });

    if (!restaurantSchema.options.toObject) restaurantSchema.options.toObject = {};
    restaurantSchema.options.toObject.transform = function (doc, ret, options) {
        ret.uri = doc.uri;
        
            

            
        
            

            
        
            
                ret.desc = doc.desc_rendered;
                ret.desc_raw = doc.desc_raw;
            
        
    }

    return restaurantSchema;
}