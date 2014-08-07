// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'blinders.services', 'blinders.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      .state('/', {
          url: '/',
          views: {
              'about-tab': {
                  templateUrl: 'templates/index.html'
              }
          }
      })
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })





    .state('option-list', {
      url: '/restaurants/:restaurant/products/:product/options',
      views: {
        'pets-tab': {
          templateUrl: 'templates/option-list.html',
          controller: 'OptionListCtrl'
        }
      }
    })

    .state('option-detail', {
      url: '/restaurants/:restaurant/products/:product/options/:option_id',
      views: {
        'pets-tab': {
          templateUrl: 'templates/option-detail.html',
          controller: 'OptionDetailCtrl'
        }
      }
    })



    .state('product-list', {
      url: '/restaurants/:restaurant/products',
      views: {
        'pets-tab': {
          templateUrl: 'templates/product-list.html',
          controller: 'ProductListCtrl'
        }
      }
    })

    .state('product-detail', {
      url: '/restaurants/:restaurant/products/:product_id',
      views: {
        'pets-tab': {
          templateUrl: 'templates/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })



    .state('restaurant-list', {
      url: '/restaurants',
      views: {
        'pets-tab': {
          templateUrl: 'templates/restaurant-list.html',
          controller: 'RestaurantListCtrl'
        }
      }
    })

    .state('restaurant-detail', {
      url: '/restaurants/:restaurant_id',
      views: {
        'pets-tab': {
          templateUrl: 'templates/restaurant-detail.html',
          controller: 'RestaurantDetailCtrl'
        }
      }
    })

    .state('about', {
        url: '/about',
        views: {
            'about-tab': {
                templateUrl: 'templates/about.html'
            }
        }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');



});

