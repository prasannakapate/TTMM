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
        console.log("stateParams = ", $scope.expenseMonth);

        expenseDataApi.getExpenseList().then(function(data) {
            var createdAtFilter = _(data.results).chain()
                .groupBy(function(item) {
                    return item.createdAt.substring(0, 7);
                })
                .pairs()
                .map(function(currentItem) {
                    return _.object(_.zip(["month", "expenseDetails"], currentItem));
                })
                .find({
                    'month': $scope.expenseMonth
                })
                .pick('month','expenseDetails')
                .value();

            console.log('createdAtFilter', createdAtFilter);

            $scope.expenseDetails = _(data.results).chain()                
                .where({
                    createdAtFilter: $scope.expenseMonth
                })
                .pick('month')
                .value();

                console.log("Expense details", $scope.expenseDetails);


            $scope.totalMonthlySum = _(data.results).chain()
                .find({
                    'month': $scope.expenseMonth
                })
                .sum('expenseAmount')
                .value();
            console.log("Total sum", $scope.totalMonthlySum);
        });
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"
