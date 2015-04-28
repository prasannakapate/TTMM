(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('removeEventApi', removeEventApi);

    removeEventApi.$inject = ['$http', '$q'];

    function removeEventApi($http, $q) {
        var service = {
            removeEvent: removeEvent
        };
        return service;

        ////////////////

        function removeEvent(id) {

            var deffered = $q.defer();
            $http.delete('https://api.parse.com/1/classes/Events/' + id, {
                headers: {
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT'
                }
            }).success(function(response) {
                console.log("Data delete successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data delete error");
                deffered.reject(error, status);
            })
            return deffered.promise;
        }
    }
})();
