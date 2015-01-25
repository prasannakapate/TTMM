(function () {
    'use strict';
    angular
        .module('ttmmApp', ['ionic'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default
                // (remove this to show the accessory bar above the keyboard for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom').style('standard');

            $stateProvider

                .state('app', {
                    url: "/app/login",
                    templateUrl: "app/login/login.html"
                })
                .state('tab', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "app/layout/tabs.html"
                })
                .state('tab.events', {
                    url: '/events',
                    views: {
                        'tab-events': {
                            templateUrl: 'app/event/event-list.html'
                        }
                    }
                })
                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'app/account/account.html'
                        }
                    }
                })
                .state('tab.notification', {
                    url: '/notification',
                    views: {
                        'tab-notification': {
                            templateUrl: 'app/notification/notification.html'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/app/login');
        });
})();