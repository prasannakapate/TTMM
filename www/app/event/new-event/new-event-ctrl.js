(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('NewEventCtrl', NewEventCtrl);

    NewEventCtrl.$inject = ['$scope', '$state', 'newEventApi'];

    function NewEventCtrl($scope, $state, newEventApi) {

        $scope.title = '';
        $scope.createNewEvent = createNewEvent;

        ////////////////
        function createNewEvent(event) {
            console.log("Create New Event Called", event)
            newEventApi.createNewEvent(event).then(function(data) {
                $state.go('tab.events');
            });
        }
    }
})();
