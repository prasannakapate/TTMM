(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('expenseDataApi', expenseDataApi);

    expenseDataApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout', 'CacheFactory'];

    function expenseDataApi($http, $q, $ionicLoading, $timeout, CacheFactory) {

        self.getExpenseListCache = CacheFactory.get('getExpenseListCache');

        var service = {
            getExpenseList: getExpenseList,
            makeExpense: makeExpense,
            removeExpense: removeExpense,
            editExpense: editExpense
        };
        return service;

        ////////////////

        function getExpenseList() {

            var deffered = $q.defer();
            var cacheKey = 'expenses';
            var expenseListData = self.getExpenseListCache.get(cacheKey);

            if (expenseListData) {
                console.log("Found data inside the cache", expenseListData);
                deffered.resolve(expenseListData);
            } else {

                $ionicLoading.show({
                    template: '<div class="ion-loading-c"></div> Loading...'
                });

                $http.get('https://api.parse.com/1/classes/Expenses', {
                    headers: {
                        'X-Parse-Application-Id': key.appid,
                        'X-Parse-REST-API-Key': key.restid
                    }
                }).success(function(response) {
                    $timeout(function() {
                        console.log("Received getExpenseList Data via HTTP");
                        self.getExpenseListCache.put(cacheKey, response);
                        $ionicLoading.hide();
                        deffered.resolve(response);
                    }, 2000);

                }).error(function(error, status) {
                    $timeout(function() {
                        console.log("Error While making HTTP Call");
                        $ionicLoading.hide();
                        deffered.reject(error, status);
                    }, 2000);
                });
            }
            return deffered.promise;
        }

        function makeExpense(expenseData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/Expenses', expenseData, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log("make new expense success");
            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log("make new expense success");
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
                console.log("Data delete successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data delete error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function editExpense(id, data) {
            var deffered = $q.defer();
            $http.put('https://api.parse.com/1/classes/Expenses/' + id, data, {
                headers: {
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid
                }
            }).success(function(response) {
                console.log("Data edit successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data edit error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

    }
})();
