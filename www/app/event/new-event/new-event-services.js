(function(){
    'use strict';
    angular
        .module('ttmmApp')
        .factory('newEventApi', newEventApi);

    newEventApi.$inject = ['$http', '$q'];

    /* @ngInject */
    function newEventApi($http, $q) {
        var service = {
            createNewEvent: createNewEvent
        };

        return service;

        ////////////////

        function createNewEvent(eventData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/Events', eventData, {
                headers: {
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT'
                }
            }).success(function (response) {
                deffered.resolve(response);
                console.log("create new event success");
            }).error(function (error, status) {
                deffered.reject(error, status);
                console.log("create new event error");
            })
            return deffered.promise;
        }
    }

})();