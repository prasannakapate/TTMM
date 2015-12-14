(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$scope', '$state'];

    /* @ngInject */
    function SignUpCtrl($scope, $state) {
        var vm = this;
        vm.title = 'SignUpCtrl';

        activate();

        ////////////////

        function activate() {}

        $scope.goToSignUp = function() {
            $state.go('newSignUp');
        }
    }
})();
