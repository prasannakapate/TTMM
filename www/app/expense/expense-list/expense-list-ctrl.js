(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('ExpenseListCtrl', ExpenseListCtrl);

    ExpenseListCtrl.$inject = ['$scope', '$filter', 'expenseDataApi'];

    function ExpenseListCtrl($scope, $filter, expenseDataApi) {
        $scope.title = 'My Expenses';
        $scope.expenseGroupByMonth = '';
        $scope.loadList = '';

        $scope.loadList = function(forceRefresh) {
            //item.dateAsString = $filter('date')(item.date, "yyyy-MM-dd");  // for type="date" binding
            expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
                $scope.expenseGroupByMonth = _(data.results).chain()
                    .groupBy(function(item) {
                        item.expenseMonth = $filter('date')(item.expenseMonth, "MMM-yyyy");
                        return item.expenseMonth.substring(0, 8);
                    })
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();
                //console.log($scope.expenseGroupByMonth);
                //item.dateAsString = $filter('date')(item.date, "yyyy-MM-dd");
                //$scope.expenseGroupByMonth.month = $filter('date')(new Date(), 'month'); // for type="date" binding
                console.log($scope.expenseGroupByMonth);
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.loadList(false);
    }
})();
