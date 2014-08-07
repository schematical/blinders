angular.module('blinders.controllers', [
])

.controller('LocationCtrl',  function($scope, RestaurantService) {
        navigator.geolocation.getCurrentPosition(
            function onSuccess(position) {
                $scope.coords = position.coords;
                document.location = '/#/tab/restaurants';
                $scope.$apply(function($scope){
                    //console.log($scope);
                    RestaurantService.get()
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
.controller('ProductListCtrl',  function($scope, ProductService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.product = ProductService.get();
})


// A simple controller that shows a tapped item's data
.controller('ProductDetailCtrl', function($scope, $stateParams, ProductService) {
  // "Product" is a service returning mock data (services.js)
  $scope.pet = ProductService.get($stateParams.product_id);
})



// A simple controller that fetches a list of data from a service
.controller('RestaurantListCtrl',  function($scope, RestaurantService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.restaurant = RestaurantService.get();
})


// A simple controller that shows a tapped item's data
.controller('RestaurantDetailCtrl', function($scope, $stateParams, RestaurantService) {
  // "Restaurant" is a service returning mock data (services.js)
  $scope.pet = RestaurantService.get($stateParams.restaurant_id);
})

