(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('signUpDataApi', signUpDataApi);

    signUpDataApi.$inject = ['$http', '$q'];

    function signUpDataApi($http, $q) {
        var service = {
            newUserSignUp: newUserSignUp
        };
        return service;

        ////////////////

        function newUserSignUp(newUserSignUpData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/users', newUserSignUpData, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log("signUpUserData completed successfully");
            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log("signUpUserData completed Error");
            });
            return deffered.promise;
        }
    }
})();
