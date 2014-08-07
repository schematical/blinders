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
        
    
        
            restaurant:{ type: Schema.Types.ObjectId, ref: 'Restaurant' },
        
    
        
            carbs:{"type":"Number"},
        
    
        
            calories:{"type":"Number"},
        
    
        
            points:{"type":"Number"},
        
    
        cre_date:Date
    };

    var productSchema = new Schema(fields);

    productSchema.virtual('uri').get(function(){
        
            
                return '/restaurants/:restaurant/products/' + (this.namespace || this._id);
            
        
    });

    
        

    
        

    
        
            productSchema.virtual('desc').get(function(){
                return this.desc_rendered;
            }).set(function(value){
                if(!value || value.length == 0){
                    return false;
                }
                var markdown = require('markdown').markdown;
                this.desc_raw = value;
                this.desc_rendered = markdown.toHTML(value);
            });

        

    
        

    
        

    
        

    
        

    


    productSchema.pre('save', function(next){
        if(!this._id){
            this._id = new app.mongoose.Types.ObjectId();
        }
        return next();
    });

    if (!productSchema.options.toObject) productSchema.options.toObject = {};
    productSchema.options.toObject.transform = function (doc, ret, options) {
        ret.uri = doc.uri;
        
            

            
        
            

            
        
            
                ret.desc = doc.desc_rendered;
                ret.desc_raw = doc.desc_raw;
            
        
            

            
        
            

            
        
            

            
        
            

            
        
    }

    return productSchema;
}