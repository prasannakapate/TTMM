(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$state',
        'signUpDataApi',
        '$ionicLoading',
        '$ionicHistory',
        '$log',
        'firebaseAuthService'
    ];

    function SignUpCtrl($state,
        signUpDataApi,
        $ionicLoading,
        $ionicHistory,
        $log,
        firebaseAuthService) {
        var vm = this;
        vm.userSignUp = userSignUp;
        vm.userData = {};

        ////////////////

        // function userSignUp(userData) {
        //     signUpDataApi.newUserSignUp(userData).then(function() {
        //         console.log('New user sign up data', userData);
        //         $state.go('login');
        //     });
        // }

        function userSignUp(credentials) {
            $log.debug('Create credentials Function called');
            if (credentials) {
                $ionicLoading.show({
                    template: 'Signing Up...'
                });

                firebaseAuthService.createUser(credentials)
                    .then(function(user) {
                        $log.debug('Created User as:', user);
                        $ionicLoading.hide();
                        console.log('Logged In');
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableBack: true
                        });
                        $state.go('login');
                    }).catch(function(error) {
                        //alert("Error: " + error);
                        $log.debug(error);
                        console.log(error);
                        $ionicLoading.hide();
                    });
            } else {
                console.log('Please Enter Credentials');
            }
        }

    }
})();
