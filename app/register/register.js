(function ()
{

    'use strict';

    angular.module('myApp.register', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider)
        {
            $routeProvider.when('/register', {
                templateUrl: 'register/register.html',
                controller: 'registerController'
            });
        }])

        .controller('registerController', ['$scope', '$rootScope', 'Factory', function ($scope, $rootScope, Factory)
        {
            $scope.list = [];
            var firstName, lastName, address, birthday, birthdayDate, registerTime = null;
            var ageDif, ageTime, ageYears = null;

            var db = Factory.indexedDB();

            $scope.hideMessage = true;

            $scope.submit = function ()
            {
                firstName = $scope.firstName;
                lastName = $scope.lastName;
                address = $scope.address;
                birthday = $scope.birthday;

                registerTime = new Date();

                ageDif = registerTime - birthday.getTime();
                ageTime = new Date(ageDif); // miliseconds from epoch
                ageYears = Math.abs(ageTime.getUTCFullYear() - 1970);


                if (ageYears > 21)
                {                     //we only allow users who are at least 21 years old
                    $scope.birthdayError = false;
                    $scope.hideMessage = true;

                    birthdayDate = new Date(birthday);
                    if (birthdayDate.getDay() == 5)
                    {
                        $rootScope.bornOnFriday = true;     //this will make the page background-color green.
                    }
                    else
                    {
                        $rootScope.bornOnFriday = false;     //we actually don't need this but it does not hurt.
                    }

                    db.open().catch(function (e)
                    {
                        alert("Open failed: " + e);
                    });

                    db.users.put({
                        firstName: firstName, lastName: lastName,
                        address: address, birthday: birthday, registerTime: registerTime
                    }).then(function ()
                    {
                        return db.users.get(firstName); // Then when data is stored, read from it
                    }).catch(function (error)
                    {
                        console.log("Error occured: " + error);
                    });

                    Factory.printWelcomeMessage(lastName, firstName);

                    $scope.firstName = '';
                    $scope.lastName = '';
                    $scope.address = '';
                    $scope.birthday = '';

                } else
                {
                    $scope.birthdayError = true;
                    $scope.errorText = "You must be at least 21 years old!";
                    $scope.hideMessage = false;
                }
            };


        }]);
})();
