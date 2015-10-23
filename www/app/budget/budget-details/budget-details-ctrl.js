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
            $scope.expenseDetails = _(data.results).chain()
                .where({
                    'expenseMonth': $scope.expenseMonth
                })
                .value();

            $scope.totalMonthlySum = _(data.results).chain()
                .where({
                    'expenseMonth': $scope.expenseMonth
                })
                .sum('expenseAmount');
        });
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"
