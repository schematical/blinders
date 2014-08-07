var iraas_services = angular.module('iraas.restaurant.service', ['ngResource']);
iraas_services.factory(
    'Restaurant',
    [
        '$resource',
        function($resource){
            return $resource( '//' + njax_bootstrap.api_url + '/restaurants/:restaurant_id', {}, {
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