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
                db = new Dexie("user_database");

                db.version(1).stores({
                    users: 'firstName,lastName, address, birthday, registerTime'
                });

                document.getElementById('Greeting').textContent = "";
                document.getElementById('numberOfEntries').innerHTML = "0";
                document.getElementById('printAllEntries').innerHTML = "No user in indexedDB";
            },
            collectionGetData: function()
            {
                var collection = db.users;
                document.getElementById('numberOfEntries').innerHTML = "";
                document.getElementById('printAllEntries').innerHTML = "";


                collection.count(function(users) {
                    document.getElementById('numberOfEntries').innerHTML = users;
                });

                collection.count(function(users) {
                    if (users <= 0)
                    {
                        document.getElementById('printAllEntries').innerHTML = "No user in indexedDB";
                    } else
                    {
                        collection.each(function (users)
                        {
                            document.getElementById('printAllEntries').innerHTML +=
                                '<b>Lastname: </b>' + users.lastName + '<br />' +
                                '<b>Firstname: </b>' + users.firstName + '<br />' +
                                '<b>Address: </b>' + users.address + '<br />' +
                                '<b>Birthday: </b>' + users.birthday + '<br />' +
                                '<b>Register time: </b>' + users.registerTime + '<br />' +
                                '------------------------------------------------------';
                        });
                    }
                });
            }
        };
    }]);

})();