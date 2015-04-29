(function () {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("EventListCtrl", EventListCtrl);
    EventListCtrl.$inject = ['$scope', 'eventsDataApi'];

    function EventListCtrl($scope, eventsDataApi) {

        $scope.events = '';

        eventsDataApi.getEventList().then(function (data) {
            $scope.events = data.results;
            //console.log("Event List =", $scope.events);
        });

//        $scope.onItemDelete = function (item) {
//            deleteTodo(item.objectId);
//            $scope.items.splice($scope.items.indexOf(item), 1);
//        };
    }
})();