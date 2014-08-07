'use strict';


// Declare app level module which depends on filters, and services
angular.module(
        'iraas',
    [
        'ngRoute',
        'ngCookies',
        
            'iraas.option.service',
            'iraas.option.controller',
        
            'iraas.product.service',
            'iraas.product.controller',
        
            'iraas.restaurant.service',
            'iraas.restaurant.controller',
        
        'iraas.filters',
        'iraas.directives'
    ]
).config(
        [
            '$routeProvider',
            function($routeProvider) {

                $routeProvider.when('/', { templateUrl: 'partials/welcome.html', controller: 'WelcomeCtl'});
                $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtl'});
                $routeProvider.when('/draw', { templateUrl: 'partials/draw.html', controller: 'DrawCtl'});
                $routeProvider.when('/suggest', { templateUrl: 'partials/suggest.html', controller: 'SuggestCtl'});
                $routeProvider.when('/display', { templateUrl: 'partials/display.html', controller: 'DisplayCtl'});
                $routeProvider.otherwise({redirectTo: '/'});
        }
    ]
);