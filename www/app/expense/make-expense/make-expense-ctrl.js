(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', '$state', 'expenseDataApi'];

    function MakeExpenseCtrl($scope, $state, expenseDataApi) {

        $scope.makeExpense = makeExpense;
        $scope.expense = {};
        $scope.datepickerObject = {};
        $scope.expenseMonth ='';
        $scope.datepickerObject.inputDate = new Date();

        $scope.datepickerObjectPopup = {
            titleLabel: 'Select Expense Date', //Optional
            todayLabel: 'Today', //Optional
            closeLabel: 'Close', //Optional
            setLabel: 'Set', //Optional
            setButtonType: 'button-royal', //Optional
            todayButtonType: 'button-stable', //Optional
            closeButtonType: 'button-stable', //Optional
            inputDate: $scope.datepickerObject.inputDate, //Optional
            mondayFirst: true, //Optional
            templateType: 'popup', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            from: new Date(2012, 8, 2), //Optional
            to: new Date(2018, 8, 25), //Optional
            callback: function(val) { //Mandatory
                datePickerCallback(val);
            },
            dateFormat: 'MMM - yyyy - dd', //Optional
            closeOnSelect: false, //Optional
        };

        var datePickerCallback = function(val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.datepickerObjectPopup.inputDate = val;
                $scope.expense.expenseMonth = $scope.datepickerObjectPopup.inputDate;
                console.log('Selected date is : ', val);
            }
        };
        ////////////////

        function makeExpense(expense) {
            console.log("makeExpense Called", expense);
            expenseDataApi.makeExpense(expense).then(function(data) {
                expenseDataApi.getExpenseList().then(function(data) {
                    $state.go('tab.budget');
                });
            });
        }
    }
})();
