(function() {
    'use strict';

    angular
        .module('ttmmApp.account')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['userLoginDataApi'];

    function AccountCtrl(userLoginDataApi) {
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
            console.log("currentUserLogout called");
            userLoginDataApi.logoutUser().then(function(data) {
                console.log("Logout user datails", data);
            });
        }
        /*        userLoginDataApi.getCurrentUser().then(function(data) {
                    vm.currentUser = data;
                });
        */
    }
})();
