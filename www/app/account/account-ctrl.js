(function() {
    'use strict';

    angular
        .module('ttmmApp.account')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = [ '$state', 'firebaseAuthService', 'Auth'];

    function AccountCtrl($state, firebaseAuthService, Auth ) {
        /*jshint validthis: true */
        var vm = this;
        vm.currentUser = '';
        vm.user = '';
        vm.currentUserLogout = currentUserLogout;

        activate();

        function activate() {
            vm.currentUser = firebaseAuthService.isLoggedIn();
            console.log('Current User', vm.currentUser);
            vm.user = Auth.user;
            console.log('User Details', vm.user);
        }

        function currentUserLogout(){
            //console.log('user logout');
            firebaseAuthService.signOut();
             $state.go('welcome');
        }
    }
})();
