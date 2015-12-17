(function() {
    "use strict";
    angular
        .module('ttmmApp')
        .factory('userLoginDataApi', userLoginDataApi);

    userLoginDataApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout', '$ionicPopup'];

    function userLoginDataApi($http, $q, $ionicLoading, $timeout, $ionicPopup) {
        var userToken = '';

        var LoginServices = {
            loginUser: loginUser,
            logoutUser: logoutUser,
            getCurrentUser: getCurrentUser
        };
        return LoginServices;

        function logoutUser() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/logout', {

                })
                .success(function() {

                })
                .error(function() {

                });

            return deffered.promise;
        }

        function getCurrentUser() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/users/me', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid,
                        'X-Parse-Session-Token': userToken
                    }
                })
                .success(function(response) {
                    //console.log("Current users details", response);
                    deffered.resolve(response);
                })
                .error(function(error, status) {
                    console.log("error getting current users details", error, status);
                    deffered.reject(error, status);
                });
            return deffered.promise;
        }

        function loginUser(username, password) {
            var deffered = $q.defer();

            $ionicLoading.show({
                template: '<div class="ion-loading-c"></div> Loading...'
            });

            $http.get('https://api.parse.com/1/login', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid
                    },
                    params: {
                        username: username,
                        password: password
                    }
                })
                .success(function(response) {
                    $timeout(function() {
                        $ionicLoading.hide();
                        //console.log("user login Successfully", response);
                        deffered.resolve(response);
                        userToken = response.sessionToken;
                    }, 2000);

                }).error(function(error, status) {
                    $timeout(function() {
                        console.log("Error While making HTTP Call");
                        $ionicLoading.hide();
                        deffered.reject(error, status);
                        // An alert dialog
                        $ionicPopup.alert({
                            title: 'Try again !',
                            template: 'Incorrect username or password',
                            okType: 'button-assertive'
                        });
                    }, 2000);
                });
            return deffered.promise;
        }
    }
})();
