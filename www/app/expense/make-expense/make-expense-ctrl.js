(function() {
    'use strict';

    angular
        .module('ttmmApp.expense')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', '$state', 'expenseDataApi', 'userLoginDataApi'];

    function MakeExpenseCtrl($scope, $state, expenseDataApi, userLoginDataApi) {
        $scope.loadList = '';
        $scope.currentUser = '';
        $scope.makeExpense = makeExpense;
        $scope.expense = {};
        $scope.datepickerObject = {};
        $scope.expenseMonth = '';
        $scope.userId = '';
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

        ////////////////

        userLoginDataApi.getCurrentUser().then(function(data){
            $scope.expense.userId = data;
        });

        function datePickerCallback(val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.datepickerObjectPopup.inputDate = val;
                $scope.expense.expenseMonth = val;
                console.log('Selected date is : ', val);
            }
        }


        function makeExpense(expense) {
            console.log('makeExpense Called', expense);
            $scope.loadList = function(forceRefresh) {
                expenseDataApi.makeExpense(expense).then(function(data) {
                    expenseDataApi.getExpenseList(forceRefresh).then(function(data) {
                        $state.go('tab.expenses');
                    });
                });
            };
            $scope.loadList(false);
        }
    }
})();
