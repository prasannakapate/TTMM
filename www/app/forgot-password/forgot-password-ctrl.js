(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('forgotPasswordCtrl', forgotPasswordCtrl);

    forgotPasswordCtrl.$inject = ['$log','firebaseAuthService'];

    function forgotPasswordCtrl($log,firebaseAuthService) {
        /*jshint validthis: true */
        var vm = this;
        vm.userData = '';
        vm.forgot = forgot;

        function forgot(credentials){
        firebaseAuthService.forgot(credentials).then(function() {
          vm.userData = '';
          $log.debug('Password Reset Email sent');
          console.log('Reset Password Email Sent',2000,'center');
        }).catch(function(error){
          $log.debug('Error in reseting password',error);
          console.log(error);
        });
      }
    }
})();