/*(function(module) {

    var formEncode = function() {
        return function(data) {
            var pairs = [];
            for (var name in data) {
                pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return pairs.join('&').replace(/%20/g, '+');
        };
    };

    module.factory('formEncode', formEncode);

}(angular.module('ttmmApp.common')));
*/

/*
(function() {
    'use strict';

    angular
        .module('ttmmApp.common')
        .factory('formEncode', formEncode);

    formEncode.$inject = [];

    function formEncode() {
        var service = {
            encode: encode
        };
        return service;

        ////////////////

        function encode(data) {
            var pairs = [];
            for (var name in data) {
                pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return pairs.join('&').replace(/%20/g, '+');

        }
    }
})();
*/