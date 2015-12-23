(function() {
    "use strict";
    angular
        .module('ttmmApp')
        .factory('userLoginDataApi', userLoginDataApi);

    userLoginDataApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout', '$ionicPopup', 'commonService'];

    function userLoginDataApi($http, $q, $ionicLoading, $timeout, $ionicPopup, commonService) {
        /*jshint validthis: true */
        var key = commonService.getKey();
        var vm = this;
        vm.userData = '';

        var LoginServices = {
            loginUser: loginUser,
            logoutUser: logoutUser,
            getCurrentUser: getCurrentUser
        };
        return LoginServices;

        function getCurrentUser() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/users/me', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid,
                        'X-Parse-Session-Token': vm.userData.sessionToken
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

        function logoutUser() {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/sessions/' + vm.userData.objectId, {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid,
                        'X-Parse-Session-Token': vm.userData.sessionToken
                    }
                })
                .success(function(response) {
                    console.log("Current users Successfully logout", response);
                    deffered.resolve(response);
                })
                .error(function(error, status) {
                    console.log("error while logging out for currentUser", error, status);
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
                        vm.userData = response;
                        //console.log("user data ->>>>>>>>>>>>", vm.userData);
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
