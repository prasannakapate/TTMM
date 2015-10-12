(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', 'expenseDataApi'];

    function MakeExpenseCtrl($scope, expenseDataApi) {

        $scope.makeExpense = makeExpense;

        ////////////////

        function makeExpense(expense) {
            console.log("makeExpense Called", expense);
            expenseDataApi.makeExpense(expense).then(function(data) {
                console.log("expense made successfully");

            });
        }
    }
})();
