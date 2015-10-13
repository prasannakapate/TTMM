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
                $rootScope.expenses = _(data.results).chain()
                    .groupBy('expenseMonth')
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();

                console.log("groupBy", $rootScope.expenses);
                //$rootScope.expenses = data.results;
            });
        }

        function totalAmountByMonth() {}
        //console.log("Expense Amount",expenseAmount);
    }
})();
