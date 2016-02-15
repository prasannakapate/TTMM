(function() {
    'use strict';

    angular
        .module('ttmmApp.common')
        .factory('firebaseAuthService', firebaseAuthService);

    firebaseAuthService.$inject = ['$firebaseAuth', '$window', '$q', '$log', '$cordovaFacebook', 'commonService'];

    function firebaseAuthService($firebaseAuth, $window, $q, $log, $cordovaFacebook, commonService) {
        var user = {
            displayName: '',
            email: ''
        };

        var nativeProviderHandler = {
            facebook: nativeFacebookLogin
        };
        var fAuth = $firebaseAuth(commonService.firebaseRef);

        var service = {
            createUser: createUser,
            signIn: signIn,
            oauthSignIn: oauthSignIn,
            signOut: signOut,
            forgot: forgot,
            user: user,
            isLoggedIn: isLoggedIn,
            changePassword: changePassword

        };
        return service;

        function createUser(credentials) {
            var deferred = $q.defer();
            fAuth.$createUser({
                    email: credentials.email,
                    password: credentials.password
                }).then(function(authData) {
                    commonService.firebaseRef.child('users').child(authData.uid).set({
                        email: credentials.email,
                        username: credentials.username
                    });
                    return fAuth.$authWithPassword({
                        email: credentials.email,
                        password: credentials.password
                    });
                })
                .then(function(authData) {

                    var userObj = authData[authData.provider];
                    if (userObj) {
                        user.displayName = userObj.displayName || credentials.username || userObj.email;
                        user.email = userObj.email;
                    }
                    deferred.resolve(user);

                }).catch(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function nativeFacebookLogin(deferred) {
            $cordovaFacebook.login(['public_profile', 'email'])
                .then(function(success) {

                    $log.debug('Native SignIn', success);

                    //Need to convert expiresIn format from FB to date
                    var expirationDate = new Date();
                    expirationDate.setSeconds(expirationDate.getSeconds() + success.authResponse.expiresIn);
                    expirationDate = expirationDate.toISOString();

                    var facebookAuthData = {
                        'id': success.authResponse.userID,
                        'access_token': success.authResponse.accessToken,
                        'expirationDate': expirationDate
                    };
                    return facebookAuthData;
                })
                .then(function(facebookAuthData) {

                    return fAuth.$authWithOAuthToken('facebook', facebookAuthData.access_token);
                })
                .then(function(authData) {
                   console.log('Logged In', 2000, 'center');
                    $log.debug('Firebase Facebook Login ', authData);

                    var userObj = authData[authData.provider];
                    user.displayName = userObj.displayName || userObj.email;
                    user.email = userObj.email;
                    deferred.resolve(user);

                }).catch(function(error) {
                    deferred.reject(error);
                });

        }

        function oauthBrowserSignIn(provider) {
            var deferred = $q.defer();
            fAuth.$authWithOAuthPopup(provider)
                .then(function(authData) {
                    console.log('Logged In', 2000, 'center');
                    var userObj = authData[authData.provider];
                    user.displayName = userObj.displayName || userObj.email;
                    user.email = userObj.email;
                    deferred.resolve(user);

                }).catch(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function oauthNativeSignIn(provider) {

            var deferred = $q.defer();

            var providerHandler = nativeProviderHandler[provider];
            if (providerHandler) {
                providerHandler(deferred);
            } else {
                oauthBrowserSignIn(provider)
                    .then(function(user) {
                        deferred.resolve(user);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

            }

            return deferred.promise;

        }

        function oauthSignIn(provider) {
            //AppAvailability.isAppAvailable(provider);
            if ($window.cordova) {
                return oauthNativeSignIn(provider);
            } else {
                return oauthBrowserSignIn(provider);
            }
        }


        function signIn(credentials) {
            var deferred = $q.defer();
            fAuth.$authWithPassword({
                email: credentials.email,
                password: credentials.password
            }).then(function(authData) {
                console.log('Logged In', 2000, 'center');
                var userObj = authData[authData.provider];
                commonService.firebaseRef.child('users').child(authData.uid).once('value', function(snapshot) {
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    user.username = val;
                    user.displayName = val;

                });
                user.displayName = userObj.displayName || userObj.email;
                user.email = userObj.email;
                deferred.resolve(user);

            }).catch(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function forgot(credentials) {
            var deferred = $q.defer();

            fAuth.$resetPassword({
                    email: credentials.email
                })
                .then(function() {
                    $log.debug('Password reset email sent successfully!');
                    deferred.resolve('Password reset email sent successfully!');
                })
                .catch(function(error) {
                    deferred.reject(error);
                });


            return deferred.promise;
        }

        function isLoggedIn() {

            var currentUser = fAuth.$getAuth();
            var isUser = currentUser ? true : false;
            if (isUser) {
                var userObj = currentUser[currentUser.provider];
                user.displayName = userObj.displayName || userObj.email;
                user.email = userObj.email;
            }
            return isUser;
        }

        function signOut() {
            fAuth.$unauth();
        }

        function changePassword(credentials) {
            var deferred = $q.defer();
            fAuth.$changePassword(credentials)
                .then(function() {
                    $log.debug('Password changed successfully!');
                    deferred.resolve('Password changed successfully');
                }).catch(function(error) {
                    console.error('Error: ', error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }


})();
