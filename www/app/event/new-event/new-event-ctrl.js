(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('NewEventCtrl', NewEventCtrl);

    NewEventCtrl.$inject = ['$scope', '$state', 'eventsDataApi'];

    function NewEventCtrl($scope, $state, eventsDataApi) {

        $scope.title = '';
        $scope.createNewEvent = createNewEvent;

        ////////////////
        function createNewEvent(event) {
            console.log("Create New Event Called", event)
            eventsDataApi.createNewEvent(event).then(function(data) {
                $state.go('tab.events');
            });
        }
    }
})();
