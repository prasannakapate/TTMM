(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('sessionService', sessionService);
    sessionService.$inject = ['$log', '$q', '$http', 'CacheFactory', 'commonService'];

    function sessionService($log, $q, $http, CacheFactory, commonService) {
        var key = commonService.getKey();
        var currentUser = '';
        /*
                self.sessionCache = CacheFactory.get('sessionCache');
                self.sessionCache.setOptions({
                    onExpire: function(key, value) {
                        getCurrentUser()
                            .then(function() {
                                console.log('sessionCache was automatically refreshed', new Date());
                            }, function() {
                                console.log('Error getting sessionCache. 
                                            Putting expired item back to cache', new Date());
                            });
                    },
                    cacheFlushInterval: 55000,
                    maxAge: 3600000,
                    verifyIntegrity: true
                });*/

        var service = {
            getUserSession: getUserSession
        };

        return service;

        ////////////////

        function getUserSession() {
            var deffered = $q.defer(),
                cacheKey = 'sessions',
                sessiontData = null;

            if (!currentUser) {
                sessiontData = self.sessionCache.get(cacheKey);
            }
            if (sessiontData) {
                deffered.resolve(sessiontData);
            } else {
                $http.get('https://api.parse.com/1/users/me', {
                        headers: {
                            'X-Parse-Application-Id': key.appid,
                            'X-Parse-REST-API-Key': key.restid,
                            'X-Parse-Session-Token': currentUser.sessionToken
                        }
                    })
                    .success(function(response) {
                        self.sessionCache.put(cacheKey, response);
                        console.log('Current users details', response);
                        deffered.resolve(response);
                    })
                    .error(function(error, status) {
                        console.log('error getting current users details', error, status);
                        deffered.reject(error, status);
                    });
                return deffered.promise;

            }

        }
    }
})();
