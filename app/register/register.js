(function () {

    'use strict';

    angular.module('myApp.register', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/register', {
                templateUrl: 'register/register.html',
                controller: 'registerController'
            });
        }])

        .controller('registerController', ['$scope', function($scope) {
            $scope.list = [];
            var firstName, lastName, address, birthday, birthdayDate, registerTime= null;
            var ageDif, ageTime, ageYears = null;

            var db = new Dexie("user_database");
            db.version(1).stores({
                users: 'firstName,lastName, address, birthday, registerTime'
            });

            db.open().catch(function (e) {
                alert ("Open failed: " + e);
            });

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
                    birthdayDate = new Date(birthday);
                    if(birthdayDate.getDay() == 5)
                    {
                        $scope.bornOnFriday = true;
                    }
                    else
                    {
                        // alert(birthdayDate.getDay());
                    }
                }

                registerTime = new Date();

                ageDif = registerTime - birthday.getTime();
                ageTime = new Date(ageDif); // miliseconds from epoch
                ageYears = Math.abs(ageTime.getUTCFullYear() - 1970);


                if(ageYears > 21) {
                    $scope.birthdayError = false;
                    $scope.hideMessage = true;

                    // $scope.list.push(firstName);
                    // $scope.list.push(lastName);
                    // $scope.list.push(address);
                    // $scope.list.push(birthday);
                    // $scope.list.push(registerTime);

                    db.users.put({firstName: firstName, lastName: lastName,
                        address: address, birthday: birthday, registerTime: registerTime}).then (function(){
                        //
                        // Then when data is stored, read from it
                        //
                        return db.users.get(firstName);
                    }).then(function (user) {
                        //
                        // Display the result
                        //
                        alert ("" + user.firstName + " " + user.lastName + " " +
                        user.address + " " + user.birthday + " " + user.registerTime);
                    }).catch(function(error) {
                        //
                        // Finally don't forget to catch any error
                        // that could have happened anywhere in the
                        // code blocks above.
                        //
                        alert ("Ooops: " + error);
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
