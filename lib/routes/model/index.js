module.exports = function(app){
    /**
     * Model Routes
     */
    
        require('./option')(app);
    
        require('./product')(app);
    
        require('./restaurant')(app);
    

}