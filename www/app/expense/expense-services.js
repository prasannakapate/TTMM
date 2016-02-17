(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('expenseDataApi', expenseDataApi);

    expenseDataApi.$inject = [
        '$http',
        '$q',
        '$ionicLoading',
        '$timeout',
        '$firebaseAuth',
        'CacheFactory',
        'commonService'
    ];

    function expenseDataApi($http, $q, $ionicLoading, $timeout, $firebaseAuth, CacheFactory, commonService) {
        /*jshint validthis: true */
        var vm = this;
        var self = vm;
        vm.currentUser = '';
        var key = commonService.getKey();
        var baseUrl = commonService.baseUrl;
        var fAuth = commonService.firebaseRef;


        self.getExpenseListCache = CacheFactory.get('getExpenseListCache');

        self.getExpenseListCache.setOptions({
            onExpire: function(key, value) {
                getExpenseList()
                    .then(function() {
                        console.log('getExpenseListCache was automatically refreshed', new Date());
                    }, function() {
                        console.log('Error getting data. Putting expired item back to cache', new Date());
                        self.getExpenseListCache.put(key, value);
                    });
            },
            cacheFlushInterval: 55000,
            maxAge: 3600000,
            verifyIntegrity: true
        });

        var service = {
            getExpenseList: getExpenseList,
            makeExpense: makeExpense,
            removeExpense: removeExpense,
            editExpense: editExpense
        };
        return service;

        ////////////////



        function getExpenseList(forceRefresh) {

            if (typeof forceRefresh === 'undefined') {
                forceRefresh = false;
            }
            var deffered = $q.defer(),
                cacheKey = 'expenses',
                expenseListData = null;

            if (!forceRefresh) {
                expenseListData = self.getExpenseListCache.get(cacheKey);
            }

            if (expenseListData) {
                //console.log("Found data inside the cache", expenseListData);
                deffered.resolve(expenseListData);
            } else {

                $ionicLoading.show({
                    template: '<div class="ion-loading-c"></div> Loading...'
                });

                $http.get(baseUrl + 'expenses.json', {
                    /*,
                    params: {
                        where: {
                            userId: {
                                __type: 'Pointer',
                                className: '_User',
                                objectId: vm.currentUser
                            }
                        }
                    }*/
                }).success(function(response) {
                    $timeout(function() {
                        self.getExpenseListCache.put(cacheKey, response);
                        $ionicLoading.hide();
                        deffered.resolve(response);
                        console.log('Received getExpenseList Data via HTTP', response);
                    }, 2000);

                }).error(function(error, status) {
                    $timeout(function() {
                        console.log('Error While making HTTP Call');
                        $ionicLoading.hide();
                        deffered.reject(error, status);
                    }, 2000);
                });
            }
            return deffered.promise;
        }

        function makeExpense(expenseData) {
            var deffered = $q.defer();
            $http.post(baseUrl + 'expenses.json', expenseData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log('make new expense success');

            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log('make new expense Error', error, ' Status =', status);
            });
            return deffered.promise;
        }

        function removeExpense(id) {
            var deffered = $q.defer();
            $http.delete('https://api.parse.com/1/classes/Expenses/' + id, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                }
            }).success(function(response) {
                console.log('Data delete successfully');
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log('Data delete error');
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function editExpense(id) {
            var deffered = $q.defer();
            $http.put('https://api.parse.com/1/classes/Expenses/' + id, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                },
                data: {
                    userId: {
                        __type: 'Pointer',
                        className: '_User',
                        objectId: id
                    }
                }
            }).success(function(response) {
                console.log('Data edit successfully');
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log('Data edit error');
                deffered.reject(error, status);
            });
            return deffered.promise;
        }
    }
})();
