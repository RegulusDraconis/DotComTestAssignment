(function () {

    'use strict';

    angular.module('myApp.register', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/register', {
                templateUrl: 'register/register.html',
                controller: 'registerController'
            });
        }])

        .factory('FactoryRegister', function($http, FactoryHomepage){
            return {
                Work: function() {
                    // alert("work1");
                    return FactoryHomepage.indexedDB();
                }
            };
        })

        .controller('registerController', ['$scope', 'FactoryRegister', function($scope, FactoryRegister) {
            $scope.list = [];
            var firstName, lastName, address, birthday, birthdayDate, registerTime= null;
            var ageDif, ageTime, ageYears = null;

            var db = FactoryRegister.Work();

            $scope.hideMessage = true;
            $scope.bornOnFriday = false;

            $scope.submit = function() {

                if ($scope.firstName) {
                    firstName = $scope.firstName;
                }
                if ($scope.lastName) {
                    lastName = $scope.lastName;
                }
                if ($scope.address) {
                    address = $scope.address;
                }
                if ($scope.birthday) {
                    birthday = $scope.birthday;
                }

                registerTime = new Date();

                ageDif = registerTime - birthday.getTime();
                ageTime = new Date(ageDif); // miliseconds from epoch
                ageYears = Math.abs(ageTime.getUTCFullYear() - 1970);


                if(ageYears > 21) {                     //we only allow users who are at least 21 years old
                    $scope.birthdayError = false;
                    $scope.hideMessage = true;

                    // $scope.list.push(firstName);
                    // $scope.list.push(lastName);
                    // $scope.list.push(address);
                    // $scope.list.push(birthday);
                    // $scope.list.push(registerTime);

                    birthdayDate = new Date(birthday);
                    if(birthdayDate.getDay() == 5)
                    {
                        $scope.bornOnFriday = true;     //this will make the page ba background-color green.
                    }
                    else
                    {
                        $scope.bornOnFriday = true;     //we actually don't need this but it does not hurt.
                    }

                    db.open().catch(function (e) {
                        alert ("Open failed: " + e);
                    });

                    db.users.put({firstName: firstName, lastName: lastName,
                        address: address, birthday: birthday, registerTime: registerTime}).then (function(){
                        return db.users.get(firstName); // Then when data is stored, read from it
                    }).then(function (user) {
                                                        // Display the result
                        alert ("" + user.firstName + " " + user.lastName + " " +
                        user.address + " " + user.birthday + " " + user.registerTime);
                    }).catch(function(error) {
                        alert ("Error occured: " + error);
                    });

                    $scope.firstName = '';
                    $scope.lastName = '';
                    $scope.address = '';
                    $scope.birthday = '';

                } else {
                    $scope.birthdayError = true;
                    $scope.errorText = "You must be at least 21 years old!";
                    $scope.hideMessage = false;
                }
            };
        }]);
})();
