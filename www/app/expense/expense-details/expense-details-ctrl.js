(function() {
    'use strict';

    angular
        .module('ttmmApp.expense')
        .controller('ExpenseDetailsCtrl', ExpenseDetailsCtrl);

    ExpenseDetailsCtrl.$inject = ['$scope', '$stateParams', '$filter', 'expenseDataApi'];

    function ExpenseDetailsCtrl($scope, $stateParams, $filter, expenseDataApi) {
        $scope.expenseMonth = $stateParams.id;
        $scope.expenseDetails = '';
        $scope.totalMonthlySum = '';
        $scope.loadList = '';

        //console.log('stateParams = ", $scope.expenseMonth);

        $scope.loadList = function(forceRefresh) {
            expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
                $scope.expenseDetails = _(data).chain()
                    .groupBy(function(item) {
                        item.expenseMonth = $filter('date')(item.expenseMonth, 'MMM-yyyy');
                        return item.expenseMonth.substring(0, 8);
                    })
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(['month', 'expenses'], currentItem));
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
