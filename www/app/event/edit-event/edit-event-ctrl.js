(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('EditEventCtrl', EditEventCtrl);

    EditEventCtrl.$inject = ['$scope', '$state', '$stateParams'];

    function EditEventCtrl($scope, $state, $stateParams) {
        var vm = this;
        vm.title = 'EditEventCtrl';
        vm.eventDetails = '';
        vm.eventId = '';

        ////////////////

        vm.eventId = $stateParams.id;

        console.log("From Edit EventCtrl=", vm.eventId);


    }
})();
