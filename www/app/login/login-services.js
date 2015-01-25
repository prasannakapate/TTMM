(function () {
    "use strict";
    angular
        .module('ttmmApp')
        .factory('LoginApi', LoginApi);

    LoginApi.$inject = ['$http', '$q'];

    function LoginApi($http, $q) {

        var LoginServices = {
            registerNewUser: registerNewUser
        }
        return LoginServices;

        function registerNewUser(data) {
            var  deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/User',data,{
                header:{
                    'X-Parse-Application-Id': 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                    'X-Parse-REST-API-Key': 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT',
                    'Content-Type': 'application/json'
                }
            }).success(function (response) {
                console.log("user created Successfully");
                deffered.resolve(response);
            }).error(function (error, status) {
                console.log("user create Data Error");
                deffered.reject(error, status);
            })
            return deffered.promise;

        }
    }

})();