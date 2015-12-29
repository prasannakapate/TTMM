(function() {
    'use strict';

    angular
        .module('ttmmApp.account')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['userLoginDataApi', '$state'];

    function AccountCtrl(userLoginDataApi, $state) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'AccountCtrl';
        vm.currentUser = '';
        vm.currentUserLogout = currentUserLogout;

        activate();

        function activate() {
            userLoginDataApi.getCurrentUser().then(function(data) {
                vm.currentUser = data;
            });
        }

        function currentUserLogout() {
            console.log('currentUser Logout called');
            userLoginDataApi.logoutUser(vm.currentUser.objectId).then(function(data) {
                console.log('currentUser Logout called', data);
                $state.go('welcome');
            });

        }
    }
})();
