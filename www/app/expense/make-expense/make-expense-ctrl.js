(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope'];

    /* @ngInject */
    function MakeExpenseCtrl($scope) {
        var vm = this;
        vm.title = 'MakeExpenseCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();