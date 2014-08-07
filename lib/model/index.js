'use strict';
module.exports = function(app){
    
        app.model.Option =  require('./option')(app);
    
        app.model.Product =  require('./product')(app);
    
        app.model.Restaurant =  require('./restaurant')(app);
    
}