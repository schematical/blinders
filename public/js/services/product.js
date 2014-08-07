var iraas_services = angular.module('iraas.product.service', ['ngResource']);
iraas_services.factory(
    'Product',
    [
        '$resource',
        function($resource){
            return $resource( '//' + njax_bootstrap.api_url + '/restaurants/:restaurant/products/:product_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        phoneId:'phones'
                    },
                    isArray:true
                }
            });
        }
    ]
);