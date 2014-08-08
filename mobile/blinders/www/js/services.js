var blindersServices = angular.module('blinders.services', ['ngResource']);

//var optionServices = angular.module('option.services', ['ngResource']);
//optionServices.factory(
blindersServices.factory(
    'OptionService',
    [
        '$resource',
        function($resource){
            return $resource(
                '//' + njax_bootstrap.api_url + '/products/:product_id/options/:option_id',
                {
                    'product_id':'@product_id',
                    'option_id':'@option_id'
                },
                {
                    query: {
                        method:'GET',
                        params:{
                            //'option_id':'option_id'
                        },
                        isArray:true
                    }
                }
            );
        }
    ]
);



//var productServices = angular.module('product.services', ['ngResource']);
//productServices.factory(
blindersServices.factory(
    'ProductService',
    [
        '$resource',
        function($resource){
            return $resource( '//' + njax_bootstrap.api_url + '/restaurants/:restaurant/menu/:product_id',
                {
                    'restaurant_id':'@restaurant_id',
                    'product_id':'@product_id'
                },
                {
                    query: {
                        method:'GET',
                        params:{

                        },
                        isArray:true
                    }
                }
            );
        }
    ]
);



//var restaurantServices = angular.module('restaurant.services', ['ngResource']);
//restaurantServices.factory(
blindersServices.factory(
    'RestaurantService',
    [
        '$resource',
        function($resource){
            return $resource('//' + njax_bootstrap.api_url + '/restaurants/:restaurant_id',
                {
                    /*'image': "@image",
                    'cluster_id': "@cluster_id"*/
                },
                 {
                    query: {
                        method:'GET',
                        params:{
                            'restaurant_id':'restaurant_id'
                        },
                        isArray:true
                    },
                    "nearby": {
                        'url': '//' + njax_bootstrap.api_url + '/restaurants/nearby',
                        'method': 'GET',
                        'params': {
                            latitude:'latitude',
                            longitude:'longitude'
                        },
                        isArray: true
                    }
                }
            );
        }
    ]
);



