(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$scope', '$state', 'signUpDataApi'];

    function SignUpCtrl($scope, $state, signUpDataApi) {
        $scope.userSignUp = userSignUp;
        $scope.userData = {};
        $scope.password = '';

        ////////////////

        function userSignUp(userData) {
            $scope.userData.password = 'dummypassword';
            console.log("New user sign up data", userData);

            signUpDataApi.newUserSignUp(userData).then(function() {
                $state.go('tab.expenses');
            });
        }
    }
})();
