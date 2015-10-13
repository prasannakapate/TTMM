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
        console.log("stateParams = ", $scope.expenseMonth);

        expenseDataApi.getExpenseList().then(function(data) {
            $scope.expenseDetails = _(data.results).chain()
                .where({
                    'expenseMonth': $scope.expenseMonth
                })
                .value();

            $scope.totalMonthlySum = _.sum($scope.expenseDetails, 'expenseAmount');
                console("totalMonthlySum",$scope.totalMonthlySum );
        });
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"
