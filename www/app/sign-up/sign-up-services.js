(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('signUpDataApi', signUpDataApi);

    signUpDataApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout', 'commonService'];

    function signUpDataApi($http, $q, $ionicLoading, $timeout, commonService) {
        var key = commonService.getKey();

        var service = {
            newUserSignUp: newUserSignUp
        };
        return service;

        ////////////////

        function newUserSignUp(newUserSignUpData) {
            var deffered = $q.defer();
            $ionicLoading.show({
                template: '<div class="ion-loading-c"></div> Loading...'
            });
            $http.post('https://api.parse.com/1/users', newUserSignUpData, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                }
            }).success(function(response) {
                $timeout(function() {
                    $ionicLoading.hide();
                    deffered.resolve(response);
                    console.log("signUpUserData completed successfully", response);
                }, 2000);

            }).error(function(error, status) {
                $timeout(function() {
                    $ionicLoading.hide();
                    deffered.reject(error, status);
                    console.log(JSON.stringify(error, status));
                }, 2000);

            });
            return deffered.promise;
        }
    }
})();
