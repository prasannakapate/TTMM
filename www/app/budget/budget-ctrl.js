(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'expenseDataApi'];

    function BudgetCtrl($scope, $rootScope, expenseDataApi) {
        $scope.title = 'Budget';
        $scope.expenseGroupByMonth = '';
        $rootScope.expenses = '';
        activate();

        function activate() {
            expenseDataApi.getExpenseList().then(function(data) {
                $scope.expenseGroupByMonth = _(data.results).chain()
                    .groupBy('expenseMonth')
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();
                    console.log($scope.expenseGroupByMonth);
            });
        }
    }
})();
