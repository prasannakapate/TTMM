(function() {
    'use strict';
    angular
        .module('ttmmApp')
        .controller('EventDetailsCtrl', EventDetailsCtrl);

    EventDetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'eventListApi'];

    /* @ngInject */
    function EventDetailsCtrl($scope, $state, $stateParams, eventListApi) {
        /* jshint validthis: true */
        var vm = this;
        $scope.eventDetails = '';
        vm.eventId = '';
        vm.showDetails = showDetails;
        ////////////////

        vm.eventId = $stateParams.id;
        console.log("Event Id:", vm.eventId);

        function showDetails() {
            console.log("Show Details");
        }

        eventListApi.getEventList().then(function(data) {
            $scope.eventDetails = _(data.results).chain()
                .find({
                    'objectId': vm.eventId
                })
                .pick('eventName', 'eventDescription', 'createdAt', 'photo')
                .value();
        });
    }
})();
