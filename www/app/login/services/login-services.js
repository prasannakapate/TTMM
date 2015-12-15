(function() {
    "use strict";
    angular
        .module('ttmmApp')
        .factory('userLoginDataApi', userLoginDataApi);

    userLoginDataApi.$inject = ['$http', '$q'];

    function userLoginDataApi($http, $q) {

        var LoginServices = {
            loginUser: loginUser
        }
        return LoginServices;

        function loginUser(username, password) {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/login', {
                header: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                },
                params: {
                    "username": "prasanna",
                    "password": "prasanna"
                }
            }).success(function(response) {
                console.log("user login Successfully", response.username, response.secrete);
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("user login Error", error, " Status ", status);
                deffered.reject(error, status);
            })
            return deffered.promise;
        }
    }
})();
