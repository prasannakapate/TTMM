(function() {
    'use strict';

    angular
        .module('ttmmApp.common')
        .factory('oauthService', oauthService);

    oauthService.$inject = [];

    function oauthService() {
        var service = {
            login: login
        };
        return service;

        ////////////////

        function login() {}
    }
})();
