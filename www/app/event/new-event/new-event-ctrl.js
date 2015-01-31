(function () {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('NewEventCtrl', NewEventCtrl);

    NewEventCtrl.$inject = ['$state', 'newEventApi'];

    function NewEventCtrl($state, newEventApi) {

        var vm = this;

        vm.title = '';
        vm.createNewEvent = createNewEvent;

        ////////////////
        function createNewEvent(event) {
            console.log("Create New Event Called", event)
            newEventApi.createNewEvent(event).then(function (data) {
                $state.go('tab.events');
            });
        }
    }
})();