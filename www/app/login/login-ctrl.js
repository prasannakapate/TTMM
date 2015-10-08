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
(function() {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("LoginCtrl", LoginCtrl);
    LoginCtrl.$inject = ['$state', '$scope', 'LoginApi', '$cookieStore'];

    function LoginCtrl($state, $scope, LoginApi, $cookieStore) {

        $scope.signIn = function(user) {
            console.log("User Data=", user);
            $state.go('tab.events');
        }



        // FB Login
        $scope.fbLogin = function() {
            FB.login(function(response) {
                if (response.authResponse) {
                    getUserInfo();
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {
                scope: 'email,user_photos,user_videos'
            });

            function getUserInfo() {
                // get basic info
                FB.api('/me', function(response) {
                    console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                    // get profile picture
                    FB.api('/me/picture?type=normal', function(picResponse) {
                        console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                        response.imageUrl = picResponse.data.url;
                        // store data to DB - Call to API
                        // Todo
                        // After posting user data to server successfully store user data locally
                        var user = {};
                        user.name = response.name;
                        user.email = response.email;
                        if (response.gender) {
                            response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                        } else {
                            user.gender = '';
                        }
                        user.profilePic = picResponse.data.url;
                        $cookieStore.put('userInfo', user);
                        $state.go('tab.makeExpense');

                    });
                });
            }
        };
    }
})();
