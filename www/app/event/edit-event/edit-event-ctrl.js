(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('EditEventCtrl', EditEventCtrl);

    EditEventCtrl.$inject = ['$scope', '$state', '$stateParams', 'eventsDataApi'];

    function EditEventCtrl($scope, $state, $stateParams, eventsDataApi) {

        $scope.eventDetails = '';
        $scope.eventId = '';

        ////////////////

        $scope.eventId = $stateParams.id;
        console.log("From Edit EventCtrl=", $scope.eventId);

        $scope.removeEvent = function() {
            eventsDataApi.removeEvent($scope.eventId);
             	$state.go('tab.events');
	            console.log("Item is removed");
        }



    }
})();
