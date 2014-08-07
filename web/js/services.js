var blindersServices = angular.module('blinders.services', ['ngResource']);

//var optionServices = angular.module('option.services', ['ngResource']);
//optionServices.factory(
blindersServices.factory(
    'OptionService',
    [
        '$resource',
        function($resource){
            return $resource('/restaurants/:restaurant/products/:product/options/:option_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'option_id':'option_id'
                    },
                    isArray:true
                }
            });
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
            return $resource('/restaurants/:restaurant/products/:product_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'product_id':'product_id'
                    },
                    isArray:true
                }
            });
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
            return $resource('/restaurants/:restaurant_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'restaurant_id':'restaurant_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);



