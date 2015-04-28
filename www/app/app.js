(function() {
    'use strict';
    angular
        .module('ttmmApp', ['ionic', 'ngSanitize', 'ngCookies'])

    .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
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
        .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.views.transition('ios');
            $ionicConfigProvider.views.forwardCache(false);
            $ionicConfigProvider.navBar.alignTitle('center');

            // note that you can also chain configs
            $ionicConfigProvider.tabs.position('bottom').style('standard');

            $stateProvider
                .state('app', {
                    url: "/app/login",
                    templateUrl: "app/login/login.html"
            })

            .state('new-event', {
                    url: '/new-event',
                    templateUrl: 'app/event/new-event/new-event.html'
                })
                .state('event-details', {
                    url: '/events/event-details/:id',
                    templateUrl: 'app/event/event-details/event-details.html'
                })
                .state('event-edit', {
                    url: '/events/event-details/:id/edit',
                    templateUrl: 'app/event/edit-event/edit-event.html'
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
                            templateUrl: 'app/event/event-list/event-list.html'
                        }
                    }
                })
                .state('tab.budget', {
                    url: '/budget',
                    views: {
                        'tab-budget': {
                            templateUrl: 'app/budget/budget.html'
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
