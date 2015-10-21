(function() {
    'use strict';
    angular
        .module('ttmmApp', ['ionic', 'ngSanitize', 'ngCookies', 'ngCordova'])

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
                .state('tab.makeExpense', {
                    url: '/makeExpense',
                    views: {
                        'tab-makeExpense': {
                            templateUrl: 'app/expense/make-expense/make-expense.html'
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
                .state('budget-details',{
                    url:'/budget/budget-details/:id',
                    templateUrl:'app/budget/budget-details/budget-details.html'
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

'use strict';
window.fbAsyncInit = function() {
    FB.init({
        appId: '1653907274837998',
        xfbml: true,
        version: 'v2.3'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

'use strict';

var key = {
    appid: "mF8l9ob91ObHNIgzfX8tnzD8WKcRJGyUkYxm45o4",
    restid: "l8qZLpxhTxZWZYmfJZJu3r5fvwcJcHGYTe7w6igT"
}


(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['$scope', '$rootScope', 'expenseDataApi'];

    function BudgetCtrl($scope, $rootScope, expenseDataApi) {
        $scope.title = 'Budget';
        $scope.expenseGroupByMonth = '';
        $rootScope.expenses = '';
        activate();

        function activate() {
            expenseDataApi.getExpenseList().then(function(data) {
                $scope.expenseGroupByMonth = _(data.results).chain()
                    .groupBy('expenseMonth')
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["month", "expenseDetails"], currentItem));
                    })
                    .value();
                    console.log("expenseGroupByMonth", $scope.expenseGroupByMonth);
                    //$rootScope.expenses = data.results;
            });
        }
    }
})();

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

(function () {
    "use strict";
    angular
        .module('ttmmApp')
        .factory('LoginApi', LoginApi);

    LoginApi.$inject = ['$http', '$q'];

    function LoginApi($http, $q) {

        var LoginServices = {
            registerNewUser: registerNewUser
        }
        return LoginServices;

        function registerNewUser(data) {
            var  deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/User',data,{
                header:{
                    'X-Parse-Application-Id': key.appid,
                    'X-Parse-REST-API-Key': key.restid,
                    'Content-Type': 'application/json'
                }
            }).success(function (response) {
                console.log("user created Successfully");
                deffered.resolve(response);
            }).error(function (error, status) {
                console.log("user create Data Error");
                deffered.reject(error, status);
            })
            return deffered.promise;
        }
    }

})();


(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('EditEventCtrl', EditEventCtrl);

    EditEventCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', '$ionicPopup', 'eventsDataApi'];

    function EditEventCtrl($scope, $state, $stateParams, $rootScope, $ionicPopup, eventsDataApi) {

        $scope.eventDetails = '';
        $scope.eventId = '';

        ////////////////

        $scope.eventId = $stateParams.id;
        console.log("From Edit EventCtrl=", $scope.eventId);

        eventsDataApi.getEventList().then(function(data) {
            $scope.eventDetails = _(data.results).chain()
                .find({
                    'objectId': $scope.eventId
                })
                .pick('eventName', 'eventDescription', 'createdAt', 'photo', 'budgetAmount', 'endDate', 'eventContributors')
                .value();
        });

        $scope.editEvent = function(event) {
            console.log("editEvent is called");

            eventsDataApi.editEvent($scope.eventId, {
                eventName: $scope.eventDetails.eventName,
                eventDescription: $scope.eventDetails.eventDescription,
                budgetAmount: $scope.eventDetails.budgetAmount
            }).then(function() {
                eventsDataApi.getEventList().then(function(data) {
                    $rootScope.events = data.results;
                    $state.go('tab.events');

                    //console.log("Event List =", $rootScope.events);
                });

            });
        }


        // A confirm dialog
        $scope.removeEvent = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete this event',
                template: 'Are you sure you want to delete this event?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    eventsDataApi.removeEvent($scope.eventId).then(function() {
                        eventsDataApi.getEventList().then(function(data) {
                            $rootScope.events = data.results;
                            console.log("Data list=" + $rootScope.events);
                            $state.go('tab.events');
                            console.log("Item is removed");
                        });
                    });

                } else {
                    console.log('You are not sure');
                }
            });
        };

    }
})();

(function() {
    'use strict';
    angular
        .module("ttmmApp")
        .controller("EventListCtrl", EventListCtrl);
    EventListCtrl.$inject = ['$rootScope', 'eventsDataApi'];

    function EventListCtrl($rootScope, eventsDataApi) {

        activate();

        function activate() {
            eventsDataApi.getEventList().then(function(data) {
                $rootScope.events = data.results;
            });
        }
    }
})();

(function() {
    'use strict';
    angular
        .module('ttmmApp')
        .controller('EventDetailsCtrl', EventDetailsCtrl);

    EventDetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'eventsDataApi'];

    function EventDetailsCtrl($scope, $state, $stateParams, eventsDataApi) {

        $scope.eventId = '';
        
        ////////////////

        $scope.eventId = $stateParams.id;
        console.log("Event Id EventDetailsCtrl:", $scope.eventId);

        function showDetails() {
            console.log("Show Details");
        }

        eventsDataApi.getEventList().then(function(data) {
            $scope.eventDetails = _(data.results).chain()
                .find({
                    'objectId': $scope.eventId
                })
                .pick('eventName', 'eventDescription', 'createdAt', 'photo','budgetAmount','endDate')
                .value();
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('NewEventCtrl', NewEventCtrl);

    NewEventCtrl.$inject = ['$scope', '$state', '$rootScope', 'eventsDataApi'];

    function NewEventCtrl($scope, $state, $rootScope, eventsDataApi) {

        $scope.createNewEvent = createNewEvent;

        ////////////////
        function createNewEvent(event) {
            console.log("Create New Event Called", event);
            eventsDataApi.createNewEvent(event).then(function(data) {
                eventsDataApi.getEventList().then(function(data) {
                    $rootScope.events = data.results;
                    $state.go('tab.events');

                    console.log("Event List =", $rootScope.events);
                });

            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('eventsDataApi', eventsDataApi);

    eventsDataApi.$inject = ['$http', '$q'];

    function eventsDataApi($http, $q) {
        var service = {
            getEventList: getEventList,
            createNewEvent: createNewEvent,
            removeEvent: removeEvent,
            editEvent: editEvent
        };
        return service;

        ////////////////

        function getEventList() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/classes/Events', {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("getEventList Data Successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("getEventList Data Error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function createNewEvent(eventData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/Events', eventData, {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log("create new event success");
            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log("create new event error");
            });
            return deffered.promise;
        }

        function removeEvent(id) {
            var deffered = $q.defer();
            $http.delete('https://api.parse.com/1/classes/Events/' + id, {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("Data delete successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data delete error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function editEvent(id, data) {
            var deffered = $q.defer();
            $http.put('https://api.parse.com/1/classes/Events/' + id, data, {
               headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("Data edit successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data edit error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('BudgetDetailsCtrl', BudgetDetailsCtrl);

    BudgetDetailsCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'expenseDataApi'];

    function BudgetDetailsCtrl($scope, $rootScope, $stateParams, expenseDataApi) {
        $scope.expenseMonth = $stateParams.id;
        $scope.expenseDetails = '';
        $rootScope.totalMonthlySum = '';
        console.log("stateParams = ", $scope.expenseMonth);

        expenseDataApi.getExpenseList().then(function(data) {
            $scope.expenseDetails = _(data.results).chain()
                .where({
                    'expenseMonth': $scope.expenseMonth
                })
                .value();

            $rootScope.totalMonthlySum = _(data.results).chain()
                .where({
                    'expenseMonth': $scope.expenseMonth
                })
                .sum('expenseAmount');

            // $scope.totalMonthlySum = _.sum($scope.expenseDetails, 'expenseAmount')
            //                           .value();
            // console("totalMonthlySum",$scope.totalMonthlySum );
        });
    }
})();

// createdAt: "2015-10-13T04:49:31.224Z"
// expenseAmount: "2000"
// expenseDescription: "At pimpri"
// expenseMonth: "Oct"
// expenseName: "Cloth Shopping"
// objectId: "5Vis0wGQSD"

(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .controller('MakeExpenseCtrl', MakeExpenseCtrl);

    MakeExpenseCtrl.$inject = ['$scope', '$state', 'expenseDataApi'];

    function MakeExpenseCtrl($scope, $state, expenseDataApi) {

        $scope.makeExpense = makeExpense;

        ////////////////

        function makeExpense(expense) {
            console.log("makeExpense Called", expense);
            expenseDataApi.makeExpense(expense).then(function(data) {
                expenseDataApi.getExpenseList().then(function(data) {
                    console.log("expense made successfully");
                    $state.go('tab.budget');
                });

            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('expenseDataApi', expenseDataApi);

    expenseDataApi.$inject = ['$http', '$q'];

    function expenseDataApi($http, $q) {
        var service = {
            getExpenseList: getExpenseList,
            makeExpense: makeExpense,
            removeExpense: removeExpense,
            editExpense: editExpense
        };
        return service;

        ////////////////

        function getExpenseList() {
            var deffered = $q.defer();
            $http.get('https://api.parse.com/1/classes/Expenses', {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("getExpenseList Data Successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("getExpenseList Data Error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function makeExpense(expenseData) {
            var deffered = $q.defer();
            $http.post('https://api.parse.com/1/classes/Expenses', expenseData, {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                deffered.resolve(response);
                console.log("make new expense success");
            }).error(function(error, status) {
                deffered.reject(error, status);
                console.log("make new expense success");
            });
            return deffered.promise;
        }

        function removeExpense(id) {
            var deffered = $q.defer();
            $http.delete('https://api.parse.com/1/classes/Expenses/' + id, {
                headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("Data delete successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data delete error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

        function editExpense(id, data) {
            var deffered = $q.defer();
            $http.put('https://api.parse.com/1/classes/Expenses/' + id, data, {
               headers: {
                    'X-Parse-Application-Id':  key.appid,
                    'X-Parse-REST-API-Key':  key.restid
                }
            }).success(function(response) {
                console.log("Data edit successfully");
                deffered.resolve(response);
            }).error(function(error, status) {
                console.log("Data edit error");
                deffered.reject(error, status);
            });
            return deffered.promise;
        }

    }
})();
