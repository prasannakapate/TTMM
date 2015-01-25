/* template for controller
 (function(){
 'use strict';
 angular
 .module("ModuleName")
 .controller("ControllerName",ControllerName);
 ControllerName.$inject = [];

 function ControllerName(){
 var vm = this;
 }
 })();
 */
(function () {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("LoginCtrl", LoginCtrl);
    LoginCtrl.$inject = ['$state', 'LoginApi'];

    function LoginCtrl($state, LoginApi) {
        var vm = this;
        vm.signIn = signIn;

        function signIn(user) {
            console.log("User Data=", user);
            $state.go('tab.events');
        }
    }
})();