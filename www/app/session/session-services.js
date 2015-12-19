(function() {
    'use strict';

    angular
        .module('ttmmApp')
        .factory('sessionService', sessionService);
    sessionService.$inject = ['$log', 'CacheFactory', 'userLoginDataApi', 'commonService'];

    function sessionService($log, CacheFactory, userLoginDataApi, commonService) {
        var key = commonService.getKey();
        self.userCache = CacheFactory.get('loginUserCache');
        self.accessTokenCache = CacheFactory.get('sessionCache');

        self.userCache.setOptions({
            onExpire: function(key, value) {
                userLoginDataApi.loginUser()
                    .then(function() {
                        console.log("userLoginDataApi.loginUser was automatically refreshed", new Date());
                    }, function() {
                        console.log("Error getting data. Putting expired item back to cache", new Date());
                        self.userCache.put(key, value);
                    });
            },
            cacheFlushInterval: 55000,
            maxAge: 3600000,
            verifyIntegrity: true
        });

        self.accessTokenCache.setOptions({
            onExpire: function(key, value) {
                userLoginDataApi.loginUser()
                    .then(function() {
                        console.log("userLoginDataApi.loginUser was automatically refreshed", new Date());
                    }, function() {
                        console.log("Error getting data. Putting expired item back to cache", new Date());
                        self.accessTokenCache.put(key, value);
                    });
            },
            cacheFlushInterval: 55000,
            maxAge: 3600000,
            verifyIntegrity: true
        });

        var service = {
            getUser: getUser,
            setUser: setUser,
            getAccessToken: getAccessToken,
            destroy: destroy
        };


        return service;

        ////////////////

        function getUser() {
            return self.user;
        }

        function setUser(user) {
            self.user = user;
            self.user.put(cacheKey, user);
            return self.user;
        }

        function getAccessToken() {
            return self.accessToken;
        }

        function setAccessToken(token) {
            self.accessToken = token;
            CacheFactory.put(cacheKey, token);
            return self;
        }

        function destroy() {
            setUser(null);
            setAccessToken(null);
        }
    }
})();
