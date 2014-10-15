/// <reference path="../app.ts"/>
(function () {
    var app = angular.module('gutscheinapp.controllers.AppCtrl', ['gutscheinapp.services.identity']);

    app.factory('googleapi', function ($rootScope, $q, $window, $http) {
        var _runningInCordova;
        document.addEventListener("deviceready", function () {
            _runningInCordova = true;
        }, false);

        var self = this;

        self.setToken = function (data) {
            //Cache the token
            var localStorage = window.sessionStorage;

            localStorage["access_token"] = data.access_token;

            //Cache the refresh token, if there is one
            localStorage["refresh_token"] = data.refresh_token || localStorage["refresh_token"];

            //Figure out when the token will expire by using the current
            //time, plus the valid time (in seconds), minus a 1 minute buffer
            var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
            localStorage["expires_at"] = expiresAt;
        };
        self.authorize = function (options) {
            //var deferred = $.Deferred();
            var deferred = $q.defer();

            debugger;

            var oauthRedirectURL = null;
            if (_runningInCordova)
                oauthRedirectURL = 'http://localhost'; //'https://www.facebook.com/connect/login_success.html';

            if (!oauthRedirectURL) {
                var idx = document.location.href.indexOf('index.html');
                if (idx > 0)
                    oauthRedirectURL = document.location.href.substring(0, idx);
                else
                    deferred.reject({ error: "Can't reliably infer the OAuth redirect URI." });
            }

            alert(oauthRedirectURL);

            //Build the OAuth consent page URL
            /*
            var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope
            });
            */
            var authUrl = 'https://accounts.google.com/o/oauth2/auth?';
            authUrl += "client_id=" + options.client_id;
            authUrl += "&redirect_uri=" + oauthRedirectURL; //options.redirect_uri;
            authUrl += "&response_type=code";
            authUrl += "&scope=" + options.scope;

            //Open the OAuth consent page in the InAppBrowser
            var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

            //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
            //which sets the authorization code in the browser's title. However, we can't
            //access the title of the InAppBrowser.
            //
            //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
            //authorization code will get set in the url. We can access the url in the
            //loadstart and loadstop events. So if we bind the loadstart event, we can
            //find the authorization code and close the InAppBrowser after the user
            //has granted us access to their data.
            authWindow.addEventListener('loadstart', googleCallback);
            function googleCallback(e) {
                var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
                var code = /\?code=(.+)$/.exec(url);
                var error = /\?error=(.+)$/.exec(url);

                debugger;

                if (code || error) {
                    //Always close the browser when match is found
                    authWindow.close();
                }

                if (code) {
                    //Exchange the authorization code for an access token
                    $http.post('https://accounts.google.com/o/oauth2/token', {
                        code: code[1],
                        client_id: options.client_id,
                        client_secret: options.client_secret,
                        redirect_uri: options.redirect_uri,
                        grant_type: 'authorization_code'
                    }).success(function (data) {
                        self.setToken(data);
                        deferred.resolve(data);
                    }).error(function (response) {
                        deferred.reject(response.responseJSON);
                    });
                } else if (error) {
                    //The user denied access to the app
                    deferred.reject({
                        error: error[1]
                    });
                }
            }

            return deferred.promise;
        };
        self.getToken = function (options) {
            //var deferred = $.Deferred();
            var deferred = $q.defer();

            if (new Date().getTime() < localStorage["expires_at"]) {
                debugger;
                deferred.resolve({
                    access_token: localStorage["access_token"]
                });
            } else if (localStorage["refresh_token"]) {
                debugger;
                $http.post('https://accounts.google.com/o/oauth2/token', {
                    refresh_token: localStorage["refresh_token"],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    grant_type: 'refresh_token'
                }).success(function (data) {
                    self.setToken(data);
                    deferred.resolve(data);
                }).error(function (response) {
                    deferred.reject(response.responseJSON);
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };
        self.userInfo = function (options) {
            return $http.get('https://www.googleapis.com/oauth2/v1/userinfo', options);
        };

        return self;
    });

    app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, identity, $rootScope, OpenFB, googleapi, FACEBOOKSETTINGS, APPCONFIG, EVENTS) {
        //identity.create();
        $rootScope.identity = identity;
        $rootScope.APPCONFIG = APPCONFIG;

        // Form data for the login modal
        $scope.loginData = {};

        // window.sessionStorage['fbtoken']
        function onLoginDone() {
            $scope.closeLogin();
            $state.go('app.AddGutscheine', null, { inherit: false, relative: null });
        }

        $rootScope.$on(EVENTS.LOGIN, function () {
            $state.go('app.AddGutscheine', null, { inherit: false, relative: null });
        });

        // Perform the login action when the user submits the login form
        $rootScope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                identity.create();
                onLoginDone();
            }, 1000);
        };

        $rootScope.FrontEndErrorMsg = "";

        $rootScope.googleLogin = function () {
            alert("letz go");
            OAuth.popup('google').done(function (result) {
                console.log(result);

                // do some stuff with result
                result.me().done(function (data) {
                    // do something with `data`, e.g. print data.name
                    console.log(data);
                });
            });
        };

        $rootScope.googleLogin2 = function () {
            // // https://console.developers.google.com/
            var client_id = '1045383240578-bfkp9gcufmp0gk1146pf6giji7r0bt4h.apps.googleusercontent.com';
            var client_secret = 'WOMtjZ7cvTAeRRcZA2Fy_iEn';

            //var redirect_uri = oauthRedirectURL; //'http://192.168.178.36:3000';//'http://localhost';
            var scope = 'https://www.googleapis.com/auth/plus.me';

            // Do Login
            googleapi.getToken({
                client_id: client_id,
                client_secret: client_secret
            }).then(function () {
                //Show the greet view if we get a valid token
                $rootScope.FrontEndErrorMsg = ("Show the greet view if we get a valid token");
            }, function () {
                //Show the login view if we have no valid token
                authorize();
            });

            function authorize() {
                googleapi.authorize({
                    client_id: client_id,
                    client_secret: client_secret,
                    //redirect_uri: redirect_uri,
                    scope: scope
                }).then(function () {
                    //Show the greet view if access is granted
                    $rootScope.FrontEndErrorMsg = "Show the greet view if access is granted";
                }, function (data) {
                    //Show an error message if access was denied
                    $rootScope.FrontEndErrorMsg = data.error;
                });
            }
        };

        $rootScope.facebookLogin = function () {
            $rootScope.FrontEndErrorMsg = "";

            OpenFB.login(FACEBOOKSETTINGS.Scope).then(function () {
                OpenFB.get('/me').success(function (FaceBookUser) {
                    identity.create(FaceBookUser);
                    onLoginDone();
                });
            }, function (e) {
                if (e && e.error) {
                    $rootScope.FrontEndErrorMsg = e.error;
                } else {
                    $rootScope.FrontEndErrorMsg = "Login fehlgeschlagen ...";
                }
            });
        };
    });
})();
//# sourceMappingURL=AppCtrl.js.map
