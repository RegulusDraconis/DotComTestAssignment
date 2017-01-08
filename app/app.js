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

    var db;

    app.factory('FactoryHomepage', [function($http){
        var db = new Dexie("user_database");

        db.version(1).stores({
            users: 'firstName,lastName, address, birthday, registerTime'
        });

        return {
            indexedDB: function() {
                return db;
            },
            printWelcomeMessage: function(lastName, firstName) {
                var selector = document.getElementById('Greeting');
                selector.textContent = "Hello, " + lastName + " " + firstName + "!";
            }
        };

        return FactoryHomepage;
    }]);

})();

