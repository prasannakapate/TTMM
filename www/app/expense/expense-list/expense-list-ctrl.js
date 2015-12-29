(function() {
    'use strict';

    angular
        .module('ttmmApp.expense')
        .controller('ExpenseListCtrl', ExpenseListCtrl);

    ExpenseListCtrl.$inject = ['$scope', '$filter', 'expenseDataApi'];

    function ExpenseListCtrl($scope, $filter, expenseDataApi) {
        var vm = this;
        vm.title = 'My Expenses';
        vm.expenseGroupByMonth = '';
        vm.loadList = loadList;

        function loadList(forceRefresh) {
            expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
                vm.expenseGroupByMonth = _(data.results).chain()
                    .groupBy(function(item) {
                        item.expenseMonth = $filter('date')(item.expenseMonth, 'MMM-yyyy');
                        return item.expenseMonth;
                    })
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(['month', 'expenseDetails'], currentItem));
                    })
                    .value();
                //console.log(vm.expenseGroupByMonth);
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        vm.loadList(false);
    }
})();
