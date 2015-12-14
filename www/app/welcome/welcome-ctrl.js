(function() {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("WelcomeCtrl", WelcomeCtrl);
    WelcomeCtrl.$inject = ['$state', '$scope'];

    function WelcomeCtrl($state, $scope) {

        $scope.signIn = function(user) {
            console.log("User Data=", user);
            $state.go('tab.makeExpense');
        };

        $scope.goToLogin = function(){
             $state.go('app');
        };

        $scope.goToSignUp = function(user) {
            $state.go('newSignUp');
        };
    }
})();
