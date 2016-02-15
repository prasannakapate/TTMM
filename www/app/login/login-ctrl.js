(function() {
    'use strict';
    angular
        .module('ttmmApp')
        .controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$state', 
                        '$cookieStore', 
                        'sessionService', 
                        '$ionicLoading', 
                        '$ionicHistory', 
                        '$log',
                        'firebaseAuthService'];

    function LoginCtrl($state, 
                    $cookieStore, 
                    sessionService, 
                    $ionicLoading, 
                    $ionicHistory, 
                    $log,
                    firebaseAuthService) {
        var vm = this;
        vm.userData = {};
        vm.currentUserId = '';
        vm.userLogin = userLogin;

        //Login for users
        function userLogin(credentials) {     
        console.log('credentials', credentials);
            if (credentials && credentials.email && credentials.password) {
                $ionicLoading.show({
                    template: 'Signing In...'
                });
                firebaseAuthService.signIn(credentials)
                    .then(function(user) {
                        $log.debug('Logged in as:' + user);
                        $ionicLoading.hide();
                        console.log('Logged In');
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableBack: true
                        });
                        $state.go('tab.makeExpense');
                    }).catch(function(error) {
                        $log.debug(error);
                        $ionicLoading.hide();
                        console.log(error);
                    });
            } else {
                console.log('Please enter credentials');

            }
        }

        /*// FB Login
        function fbLogin() {
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
        }*/
    }
})();
