(function() {
    'use strict';
    angular
        .module('ttmmApp')
        .factory('userLoginDataApi', userLoginDataApi);

    userLoginDataApi.$inject = [
        '$http',
        '$q',
        '$ionicLoading',
        '$timeout',
        '$ionicPopup',
        'commonService',
        'CacheFactory'
    ];

    function userLoginDataApi($http, $q, $ionicLoading, $timeout, $ionicPopup, commonService, CacheFactory) {
        var key = commonService.getKey();
        Parse.initialize(key.appid, key.jsid);
        /*jshint validthis: true */
        var vm = this;
        var self = vm;
        vm.sessionData = '';
        vm.userData = '';

        self.sessionCache = CacheFactory.get('sessionCache');
        self.sessionCache.setOptions({
            onExpire: function(key, value) {
                getCurrentUser()
                    .then(function() {
                        console.log('sessionCache was automatically refreshed', new Date());
                    }, function() {
                        console.log('Error getting sessionCache. Putting expired item back to cache', new Date());
                    });
            },
            cacheFlushInterval: 55000,
            maxAge: 3600000,
            verifyIntegrity: true
        });


        var LoginServices = {
            loginUser: loginUser,
            logoutUser: logoutUser,
            getCurrentUser: getCurrentUser,
            login: login,
            logout: logout,
            currentUser : currentUser
        };
        return LoginServices;

        function logout() {
            Parse.User.logOut();
        }

        function login() {

        }

        function currentUser(){
            
        }


        function getCurrentUser() {
            var deffered = $q.defer(),
                cacheKey = 'session';

            if (!vm.userData) {
                vm.sessionData = self.sessionCache.get(cacheKey);
            }
            if (vm.sessionData) {
                console.log('Found data inside the cache', vm.sessionData);
                deffered.resolve(vm.sessionData);

            } else {
                $http.get('https://api.parse.com/1/users/me', {
                        headers: {
                            'X-Parse-Application-Id': key.appid,
                            'X-Parse-REST-API-Key': key.restid,
                            'X-Parse-Session-Token': vm.userData.sessionToken || vm.sessionData.sessionToken
                        }
                    })
                    .success(function(response) {
                        console.log('Current users details using http', response);
                        self.sessionCache.put(cacheKey, response);
                        deffered.resolve(response);
                    })
                    .error(function(error, status) {
                        console.log('error getting current users details', error, status);
                        deffered.reject(error, status);
                    });
            }
            return deffered.promise;
        }

        function logoutUser(currentUserId) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/logout', '', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid,
                        'X-Parse-Session-Token': vm.userData.sessionToken || vm.sessionData.sessionToken
                    }
                })
                .success(function(response) {
                    console.log('Current users Successfully logout', response);
                    deffered.resolve(response);
                })
                .error(function(error, status) {
                    console.log('error while logging out for currentUser', error, status);
                    deffered.reject(error, status);
                });
            return deffered.promise;
        }

        function loginUser(username, password) {
            var deffered = $q.defer(),
                cacheKey = 'session';
            var data = {
                username: username,
                password: password
            };

            $ionicLoading.show({
                template: '<div class="ion-loading-c"></div> Loading...'
            });

            $http.get('https://api.parse.com/1/login', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: data
                })
                .success(function(response) {
                    $timeout(function() {
                        $ionicLoading.hide();
                        //console.log('user login Successfully', response);
                        deffered.resolve(response);
                        vm.userData = response;
                        console.log('user session token ->>>>>>>>>>>>', vm.userData.sessionToken);
                    }, 2000);

                }).error(function(error, status) {
                    $timeout(function() {
                        console.log('Error While making HTTP Call');
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
