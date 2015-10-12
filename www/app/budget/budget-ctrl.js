(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'expenseDataApi'];

    function BudgetCtrl($scope, $rootScope, expenseDataApi) {
        $scope.title = 'Budget';
        $rootScope.expenses = '';
        activate();

        function activate() {
            expenseDataApi.getExpenseList().then(function(data) {
                $rootScope.expenses = data.results;
            });
        }
    }
})();
