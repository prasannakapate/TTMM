(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('commonService', commonService);

    commonService.$inject = [];

    function commonService() {
        var service = {
            getKey: getKey
        };
        return service;

        ////////////////

        function getKey() {
            var key = {
                appid: "mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4",
                restid: "l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT"
            };
             return key;
        }
    }
})();
