(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('NewEventCtrl', NewEventCtrl);

    NewEventCtrl.$inject = ['$scope', '$state', '$rootScope', 'eventsDataApi'];

    function NewEventCtrl($scope, $state, $rootScope, eventsDataApi) {

        $scope.createNewEvent = createNewEvent;

        ////////////////
        function createNewEvent(event) {
            console.log("Create New Event Called", event)
            eventsDataApi.createNewEvent(event).then(function(data) {
                eventsDataApi.getEventList().then(function(data) {
                    $rootScope.events = data.results;
                    $state.go('tab.events');

                    console.log("Event List =", $rootScope.events);
                });

            });
        }
    }
})();
