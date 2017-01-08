angular.module('GlobalFactory', ['myApp']);

(function ()
{

    var app = angular.module('GlobalFactory');

    app.factory('Factory', [function ()
    {
        var db = new Dexie("user_database");

        db.version(1).stores({
            users: 'firstName,lastName, address, birthday, registerTime'
        });

        return {
            indexedDB: function ()
            {
                return db;
            },
            printWelcomeMessage: function (lastName, firstName)
            {
                var selector = document.getElementById('Greeting');

                db.users.get(firstName, function (users) {
                    selector.textContent = "Hello, " + users.lastName + " " + users.firstName + "!";
                });
            },
            clearDB: function(firstName)
            {
                db.delete();
                var selector = document.getElementById('Greeting');
                selector.textContent = "";
            }
        };
    }]);

})();