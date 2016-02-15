(function() {
    'use strict';

    angular
        .module('ttmmApp.core', [
            /*
             *Ionic modules*
             */
            'ionic-datepicker',
            /*
             *Angular modules
             */
            'ngSanitize', 'ngCookies', 'ngCordova', 'ngMessages',
            /*
             *3rd party modules
             */
            'angular-cache', 'firebase'
        ]);
})();
