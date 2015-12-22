(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$state', 'signUpDataApi'];

    function SignUpCtrl($state, signUpDataApi) {
        var vm = this;
        vm.userSignUp = userSignUp;
        vm.userData = {};

        ////////////////

        function userSignUp(userData) {
            signUpDataApi.newUserSignUp(userData).then(function() {
                console.log("New user sign up data", userData);
                $state.go('login');
            });
        }
    }
})();
