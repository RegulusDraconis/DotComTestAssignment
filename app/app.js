'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.register',
    'GlobalFactory',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider)
{
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when('/register', {
        controller: 'registerController',
        templateUrl: 'register/register.html'
    })
    .otherwise({redirectTo: '/register'});
}]);


(function ()
{
    var app = angular.module('myApp');

})();
