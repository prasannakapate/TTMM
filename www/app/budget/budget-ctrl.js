(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'eventsDataApi'];

    function BudgetCtrl($scope, $rootScope, eventsDataApi) {
        $scope.title = 'Budget';

        activate();

        function activate() {
            eventsDataApi.getEventList().then(function(data) {
                $rootScope.events = data.results;
            });
        }
    }
})();
