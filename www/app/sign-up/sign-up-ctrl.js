(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$scope', '$state', 'signUpDataApi'];

    function SignUpCtrl($scope, $state, signUpDataApi) {
        $scope.userSignUp = userSignUp;
        $scope.userData = {};

        ////////////////

        function userSignUp(userData) {
            signUpDataApi.newUserSignUp(userData).then(function() {
                console.log("New user sign up data",userData);
                $state.go('login');
            });
        }
    }
})();
