'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.register',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    // $routeProvider
    //     .when('/register', {
    //         controller: 'RegisterController',
    //         templateUrl: 'register/register.html',
    //         controllerAs: 'vm'
    //     })
    // .otherwise({redirectTo: '/register'});
}]);


(function(){
    var app = angular.module('myApp');

    app.directive('toggleClass', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    element.toggleClass(attrs.toggleClass);
                    element.toggleClass("glyphicon glyphicon-chevron-up");
                });
            }
        };
    });

})();

