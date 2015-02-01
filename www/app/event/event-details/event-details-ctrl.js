(function () {
    'use strict';
     angular
        .module('ttmmApp')
        .controller('EventDetailsCtrl', EventDetailsCtrl);

    EventDetailsCtrl.$inject = ['$state', '$stateParams', 'eventListApi'];

    /* @ngInject */
    function EventDetailsCtrl($state, $stateParams, eventListApi) {
        /* jshint validthis: true */
        var vm = this;
        vm.eventDetails = '';
        vm.eventId = '';
        vm.showDetails = showDetails;
        ////////////////

        vm.eventId = $stateParams.id;
        console.log("Event Id:",vm.eventId);

        function showDetails() {
            console.log("Show Details");
        }

        eventListApi.getEventList().then(function (data) {
            vm.eventDetails = _(data.results).chain()
                .find({'objectId': vm.eventId})
                .pick('eventName', 'eventDescription','createdAt','photo')
                .value();
        });
    }
})();