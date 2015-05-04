(function () {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("EventListCtrl", EventListCtrl);
    EventListCtrl.$inject = ['$rootScope', 'eventsDataApi'];

    function EventListCtrl($rootScope, eventsDataApi) {

        eventsDataApi.getEventList().then(function (data) {
            $rootScope.events = data.results;
            //console.log("Event List =", $scope.events);
        });

//        $scope.onItemDelete = function (item) {
//            deleteTodo(item.objectId);
//            $scope.items.splice($scope.items.indexOf(item), 1);
//        };
    }
})();