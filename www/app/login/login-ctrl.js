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
        //console.log('credentials', credentials);
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
    }
})();
