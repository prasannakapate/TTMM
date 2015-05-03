(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('eventsDataApi', eventsDataApi);

    eventsDataApi.$inject = ['$http', '$q'];

    function eventsDataApi($http, $q) {
        var service = {
            getEventList: getEventList,
            createNewEvent: createNewEvent,
            removeEvent: removeEvent,
            editEvent: editEvent
        };
        return service;

        ////////////////

        function getEventList() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/classes/Events', {
                headers: {
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT'
                }
            }).success(function(response) {
                console.log("getEventList Data Successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("getEventList Data Error");
                deffered.reject(error, status);
            })
            return deffered.promise;
        }

        function createNewEvent(eventData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/Events', eventData, {
                headers: {
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT'
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log("create new event success");
            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log("create new event error");
            })
            return deffered.promise;
        }

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

        function editEvent(id, data) {
            var deffered = $q.defer();
            $http.put('https://api.parse.com/1/classes/Events/' + id, data, {
                headers: {
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT'
                }
            }).success(function(response) {
                console.log("Data edit successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data edit error");
                deffered.reject(error, status);
            })
            return deffered.promise;
        }

    }
})();
