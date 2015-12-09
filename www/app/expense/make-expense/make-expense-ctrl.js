(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', '$state', 'expenseDataApi'];

    function MakeExpenseCtrl($scope, $state, expenseDataApi) {

        $scope.makeExpense = makeExpense;


        $scope.datepickerObject = {
            todayLabel: 'Today', //Optional
            closeLabel: 'Close', //Optional
            setLabel: 'Set', //Optional
            setButtonType: 'button-royal', //Optional
            todayButtonType: 'button-royal', //Optional
            closeButtonType: 'button-royal', //Optional
            inputDate: new Date(), //Optional
            mondayFirst: true, //Optional
            // disabledDates: disabledDates, //Optional
            // weekDaysList: weekDaysList, //Optional
            // monthList: monthList, //Optional
            templateType: 'popup', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-royal', //Optional
            modalFooterColor: 'bar-royal', //Optional
            from: new Date(2012, 8, 2), //Optional
            to: new Date(2018, 8, 25), //Optional
            callback: function(val) { //Mandatory
                datePickerCallback(val);
            }
        };

        var datePickerCallback = function(val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.expenseMonth = val;
                console.log('Selected date is : ', val)
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
