(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('EditEventCtrl', EditEventCtrl);

    EditEventCtrl.$inject = ['$scope', '$state', '$stateParams', 'removeEventApi'];

    function EditEventCtrl($scope, $state, $stateParams, removeEventApi) {

        $scope.eventDetails = '';
        $scope.eventId = '';

        ////////////////

        $scope.eventId = $stateParams.id;

        $scope.removeEvent = function() {
            removeEventApi.removeEvent($scope.eventId);
             	$state.go('tab.events');
	            console.log('Remove Event Is Called');
	            console.log("Item is removed");
        }
        console.log("From Edit EventCtrl=", $scope.eventId);


    }
})();
