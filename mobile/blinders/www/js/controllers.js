angular.module('blinders.controllers', [
])

.controller('LocationCtrl',  function($scope, RestaurantService) {
        navigator.geolocation.getCurrentPosition(
            function onSuccess(position) {
                $scope.coords = position.coords;

                $scope.$apply(function($scope){
                    //console.log($scope);
                    RestaurantService.nearby(
                        $scope.coords,
                        function(results){
                            window.njax_bootstrap.restaurants = results;
                            $scope.restaurants = results;
                            //alert("hmmm");
                            document.location = '/#/tab/restaurants';
                        }
                    )
                });

            },
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
            }
        );
})


.controller('SettingsCtl',  function($scope, SettingsService) {

    //$scope.option = SettingsService.get();
})


// A simple controller that fetches a list of data from a service
.controller('OptionListCtrl',  function($scope, OptionService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.option = OptionService.get();
})


// A simple controller that shows a tapped item's data
.controller('OptionDetailCtrl', function($scope, $stateParams, OptionService) {
  // "Option" is a service returning mock data (services.js)
  $scope.pet = OptionService.get($stateParams.option_id);
})



// A simple controller that fetches a list of data from a service
.controller('ProductListCtrl',  function($scope, $stateParams, ProductService) {
    $scope.products = ProductService.get({
        restaurant: $stateParams.restaurant_id
    });
})



.controller('ProductDetailCtrl', function($scope, $stateParams, RestaurantService, ProductService, OptionService) {

    $scope.restaurant = $scope.restaurant || window.njax_bootstrap.restaurant;
    if(!$scope.restaurant){
        $scope.restaurant = RestaurantService.get({
            restaurant:$stateParams.restaurant_id
        });
    }
    $scope.products = $scope.products || window.njax_bootstrap.products;
    if($scope.products){
        for(var product_id in $scope.products){
            console.log(product_id + ' == ' + $stateParams.product_id);
            if(
                $scope.products[product_id].id &&
                    $scope.products[product_id].id == $stateParams.product_id
                ){
                $scope.product = $scope.products[product_id];
                njax_bootstrap.product = $scope.product;
            }
        }
    }


    if(!$scope.product){
        $scope.product = ProductService.get({
            restaurant:$stateParams.restaurant_id,
            product_id:$stateParams.product_id
        });
    }
    $scope.options = njax_bootstrap.options = OptionService.query({
        restaurant: $stateParams.restaurant_id,
        product_id:$stateParams.product_id
    });


})




.controller('RestaurantListCtrl',  function($scope, RestaurantService) {
    $scope.restaurants = $scope.restaurants || window.njax_bootstrap.restaurants;
    if(!$scope.restaurants){
        $scope.restaurant = RestaurantService.get();
    }
})



    .controller('RestaurantDetailCtrl', function($scope, $stateParams, RestaurantService, ProductService) {

        $scope.restaurants = $scope.restaurants || window.njax_bootstrap.restaurants;
        for(restaurant_id in $scope.restaurants){
            //console.log($scope.restaurants[restaurant_id].vanityUrl.substr(1) + '==' + $stateParams.restaurant_id);
            if(
                $scope.restaurants[restaurant_id].vanityUrl &&
                $scope.restaurants[restaurant_id].vanityUrl.substr(1) == $stateParams.restaurant_id
            ){
                $scope.restaurant = $scope.restaurants[restaurant_id];
                njax_bootstrap.restaurant = $scope.restaurant;
            }
        }

        if(!$scope.restaurant){

            $scope.restaurant = RestaurantService.get({ restaurant_id:$stateParams.restaurant_id });
        }
        $scope.products = njax_bootstrap.products = ProductService.query({
            restaurant: $stateParams.restaurant_id
        });
    })
