(function() {
    'use strict';

    angular
        .module('ttmmApp.common')
        .factory('firebaseAuthService', firebaseAuthService);

    firebaseAuthService.$inject = [
        '$firebaseAuth',
        '$window',
        '$q',
        '$log',
        '$cordovaFacebook',
        '$ionicPopup',
        'commonService'
    ];

    function firebaseAuthService(
        $firebaseAuth,
        $window,
        $q,
        $log,
        $cordovaFacebook,
        $ionicPopup,
        commonService) {
        var user = {
            username: '',
            email: '',
            mobileNo : ''
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
                        username: credentials.username,
                        country: credentials.country,
                        mobileNo: credentials.mobileNo
                    });
                    return fAuth.$authWithPassword({
                        email: credentials.email,
                        password: credentials.password,
                        username: credentials.username,
                        country: credentials.country,
                        mobileNo: credentials.mobileNo
                    });
                })
                .then(function(authData) {
                    var userObj = authData[authData.provider];
                    if (userObj) {
                        user.username = userObj.username || userObj.email;
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
                    /* jshint -W106 */
                    return fAuth.$authWithOAuthToken('facebook', facebookAuthData.access_token);

                })
                .then(function(authData) {
                    console.log('Logged In', 2000, 'center');
                    $log.debug('Firebase Facebook Login ', authData);

                    var userObj = authData[authData.provider];
                    user.username = userObj.username || userObj.email;
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
                    user.username = userObj.username || userObj.email;
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
                /*console.log('userObj ---->', userObj);
                Object {email: "sonu@gmail.com", isTemporaryPassword: false, profileImageURL: 
                         "https://secure.gravatar.com/avatar/9bd6dab5e084292a34168a899882f400?d=retro"
                        }*/
                commonService.firebaseRef
                             .child('users')
                             .child(authData.uid)
                             .once('value', function(snapshot) {
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    user = val;
                    console.log('User details from signIn function in fauth ', user);
                });
                 user.username = userObj.username || userObj.email;
                // user.email = userObj.email;
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
                    $ionicPopup.alert({
                        title: 'Success !',
                        template: 'Email sent to your registerd email id .',
                        okType: 'button-royal'
                    });
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
            // if (isUser) {
            //     var userObj = currentUser[currentUser.provider];
            //     user.username = userObj.username || userObj.email;
            //     user.email = userObj.email;
            // }
            
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
