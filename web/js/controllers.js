angular.module('blinders.controllers', [
])



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

