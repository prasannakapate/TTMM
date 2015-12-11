(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetDetailsCtrl', BudgetDetailsCtrl);

    BudgetDetailsCtrl.$inject = ['$scope', '$stateParams', 'expenseDataApi'];

    function BudgetDetailsCtrl($scope, $stateParams, expenseDataApi) {
        $scope.expenseMonth = $stateParams.id;
        $scope.expenseDetails = '';
        $scope.totalMonthlySum = '';
        $scope.loadList = '';

        console.log("stateParams = ", $scope.expenseMonth);

        $scope.loadList = function(forceRefresh) {

            expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
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


                $scope.totalMonthlySum = _($scope.expenseDetails.expenses).chain()
                    .sum('expenseAmount')
                    .value();
            }); //end of event call
        };

        $scope.loadList(false);
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"
