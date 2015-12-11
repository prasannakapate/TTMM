(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', 'expenseDataApi'];

    function BudgetCtrl($scope, expenseDataApi) {
        $scope.title = 'Budget';
        $scope.expenseGroupByMonth = '';
        $scope.loadList = '';


        $scope.loadList = function(forceRefresh) {
            expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
                $scope.expenseGroupByMonth = _(data.results).chain()
                    .groupBy(function(item) {
                        return item.expenseMonth.substring(0, 7);
                    })
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();
                //console.log($scope.expenseGroupByMonth);
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.loadList(false);
    }
})();
