(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetDetailsCtrl', BudgetDetailsCtrl);

    BudgetDetailsCtrl.$inject = ['$scope'];
    function BudgetDetailsCtrl($scope) {
        $scope.pendingTitle = 'Pending Contributors';

    }
})();