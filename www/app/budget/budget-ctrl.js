(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'expenseDataApi'];

    function BudgetCtrl($scope, $rootScope, expenseDataApi) {
        $scope.title = 'Budget';
        $rootScope.expenses = '';
        $scope.totalAmountByMonth = totalAmountByMonth;
        activate();

        function activate() {
            expenseDataApi.getExpenseList().then(function(data) {
                $rootScope.expenses = data.results;
            });
        }

        function totalAmountByMonth(){
            var expenseAmount = expenses.expenseAmount + expenseAmount;
            console.log(expenseAmount);
        }
        //console.log("Expense Amount",expenseAmount);
    }
})();
