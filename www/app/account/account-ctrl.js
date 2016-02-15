(function() {
    'use strict';

    angular
        .module('ttmmApp.account')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = [ '$state', 'firebaseAuthService'];

    function AccountCtrl($state, firebaseAuthService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'AccountCtrl';
        vm.currentUser = '';

        activate();

        function activate() {
        }

        function currentUserLogout(){
            firebaseAuthService.signOut();
             $state.go('welcome');
        }
    }
})();
