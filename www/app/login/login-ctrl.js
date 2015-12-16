(function() {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("LoginCtrl", LoginCtrl);
    LoginCtrl.$inject = ['$state', '$scope', 'userLoginDataApi', '$cookieStore'];

    function LoginCtrl($state, $scope, userLoginDataApi, $cookieStore) {

        $scope.userData = {};
        $scope.currentUser = {};

        $scope.userLogin = function() {
            userLoginDataApi.loginUser($scope.userData.username, $scope.userData.password).then(function(user) {
                $state.go('tab.makeExpense');
                $scope.currentUser = user;
                //console.log("User details", user);
            });
        };


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
