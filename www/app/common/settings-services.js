(function() {
    'use strict';

    angular
        .module('ttmmApp.common')
        .factory('commonService', commonService);

    commonService.$inject = [];

    function commonService() {
        var firebaseRef = new Firebase('https://ttmm.firebaseio.com');
        var baseUrl = 'https://ttmm.firebaseio.com/';

        var service = {
            baseUrl : baseUrl,
            firebaseRef: firebaseRef,
            getKey: getKey
        };
        return service;

        ////////////////

        function getKey() {
            var key = {
                appid: 'mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4',
                restid: 'l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT',
                jsid: '2Y3L2LtIUbPZCPpq31I3w963eo0at8HI8NnVILRU'
            };
            return key;
        }
    }
})();
