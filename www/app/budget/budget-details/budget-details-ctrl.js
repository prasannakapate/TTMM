(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetDetailsCtrl', BudgetDetailsCtrl);

    BudgetDetailsCtrl.$inject = ['$scope', '$stateParams'];

    function BudgetDetailsCtrl($scope, $stateParams) {
        $scope.expenseId = $stateParams.id;
        console.log("stateParams = ", $scope.expenseId);
        $scope.pendingTitle = 'Pending Contributors';

    }
})();
