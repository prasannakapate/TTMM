(function() {
    'use strict';
    angular
        .module('ttmmApp')
        .controller('EventDetailsCtrl', EventDetailsCtrl);

    EventDetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'eventListApi'];

    /* @ngInject */
    function EventDetailsCtrl($scope, $state, $stateParams, eventListApi) {
        /* jshint validthis: true */
        
        $scope.eventDetails = '';
        $scope.eventId = '';
        
        ////////////////

        $scope.eventId = $stateParams.id;
        console.log("Event Id EventDetailsCtrl:", $scope.eventId);

        function showDetails() {
            console.log("Show Details");
        }

        eventListApi.getEventList().then(function(data) {
            $scope.eventDetails = _(data.results).chain()
                .find({
                    'objectId': $scope.eventId
                })
                .pick('eventName', 'eventDescription', 'createdAt', 'photo')
                .value();
        });
    }
})();
