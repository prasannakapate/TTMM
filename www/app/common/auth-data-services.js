(function() {
    'use strict';
    angular.module('ttmmApp.common').factory('Auth', Auth);

    Auth.$inject = ['$log', 'firebaseAuthService'];

    function Auth($log, firebaseAuthService) {
        $log.info('Assigning Auth');
        var auth = firebaseAuthService;
        return auth;
    }

})();
