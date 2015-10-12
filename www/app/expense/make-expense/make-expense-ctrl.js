(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', '$state', 'expenseDataApi'];

    function MakeExpenseCtrl($scope, $state, expenseDataApi) {

        $scope.makeExpense = makeExpense;

        ////////////////

        function makeExpense(expense) {
            console.log("makeExpense Called", expense);
            expenseDataApi.makeExpense(expense).then(function(data) {
                expenseDataApi.getExpenseList().then(function(data) {
                    console.log("expense made successfully");
                    $state.go('tab.budget');
                });

            });
        }
    }
})();
