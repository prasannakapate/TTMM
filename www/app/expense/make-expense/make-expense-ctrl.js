(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope','expenseDataApi'];

    /* @ngInject */
    function MakeExpenseCtrl($scope) {
        var vm = this;
        vm.title = 'MakeExpenseCtrl';

        activate();

        ////////////////

        function activate() {
        }

        function makeExpense(expense) {
            console.log("makeExpense Called", expense);
            expenseDataApi.makeExpense(expense).then(function(data) {
                console.log("expense made successfully");

            });
        }
    }
})();