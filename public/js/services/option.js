var iraas_services = angular.module('iraas.option.service', ['ngResource']);
iraas_services.factory(
    'Option',
    [
        '$resource',
        function($resource){
            return $resource( '//' + njax_bootstrap.api_url + '/restaurants/:restaurant/products/:product/options/:option_id', {}, {
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