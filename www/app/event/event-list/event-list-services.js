angular
    .module('ttmmApp')
    .factory('eventListApi', eventListApi);

eventListApi.$inject = ['$http','$q'];

/* @ngInject */
function eventListApi($http,$q) {
    var service = {
        getEventList: getEventList
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
        }).success(function (response) {
            console.log("getEventList Data Successfully");
            deffered.resolve(response);
        }).error(function (error, status) {
            console.log("getEventList Data Error");
            deffered.reject(error, status);
        })
        return deffered.promise;
    }


}
