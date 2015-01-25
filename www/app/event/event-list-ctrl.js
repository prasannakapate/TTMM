(function(){
    'use strict';
    angular
        .module("ttmmApp")
        .controller("EventListCtrl",EventListCtrl);
    EventListCtrl.$inject = ['EventListApi'];

    function EventListCtrl(EventListApi){
        var vm = this;

        EventListApi.getEventList().then(function(data){
            console.log("Event List =",data);
        })

    }
})();