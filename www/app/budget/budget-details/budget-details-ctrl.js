(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetDetailsCtrl', BudgetDetailsCtrl);

    BudgetDetailsCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'expenseDataApi'];

    function BudgetDetailsCtrl($scope, $rootScope, $stateParams, expenseDataApi) {
        $scope.expenseMonth = $stateParams.id;
        $scope.expenseDetails = '';
        $scope.totalMonthlySum = '';
        var pickMonthYear = '';
        console.log("stateParams = ", $scope.expenseMonth);

        expenseDataApi.getExpenseList().then(function(data) {
            var createdAtFilter = _(data.results).chain()
                .groupBy(function(item) {
                    return item.expenseMonth.substring(0, 7);
                })
                .pairs()
                .map(function(currentItem) {
                    return _.object(_.zip(["month"], currentItem));
                })
                .find({
                    'month': $scope.expenseMonth
                })
                .pick('month')
                .value();

            /*pickMonthYear = createdAtFilter.month;
            console.log('pickMonthYear', pickMonthYear);*/

            $scope.expenseDetails = _(data.results).chain()
                .groupBy(function(item) {
                    return item.expenseMonth.substring(0, 7);
                })
                .pairs()
                .map(function(currentItem) {
                    return _.object(_.zip(["month", "expenses"], currentItem));
                })
                .find({
                    'month': $scope.expenseMonth
                })
                .pick('expenses')
                .value();

            // console.log("Expense details", $scope.expenseDetails);


            $scope.totalMonthlySum = _($scope.expenseDetails.expenses).chain()
                            .sum('expenseAmount')
                            .value();
            // console.log("Total sum", $scope.totalMonthlySum);
        });
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"
