/// <reference path="../app.ts"/>


(function () {
    var app = angular.module('gutscheinapp.controllers.AppCtrl', ['gutscheinapp.services.identity']);


    app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, identity:iidentity, $rootScope, OpenFB, FACEBOOKSETTINGS, APPCONFIG, EVENTS) {

        $rootScope.identity = identity;
        $rootScope.APPCONFIG = APPCONFIG;

        function onLoginDone() {
            $scope.closeLogin();
            $state.go('app.AddGutscheine', null, { inherit: false, relative: null })
        }

        $rootScope.$on(EVENTS.LOGIN, function () {
            $state.go('app.AddGutscheine', null, { inherit: false, relative: null });
        });

        $rootScope.FrontEndErrorMsg = "";


        $rootScope.doLogin = function () {
            identity.create();
            onLoginDone();
        };

        $rootScope.doGoogleLogin = function () {
            $rootScope.FrontEndErrorMsg = "";

            try {
                OAuth.initialize(APPCONFIG.OauthIOKey)
                OAuth.popup('google_plus', {
                    cache: true
                })
                    .done(function (result) {
                        //OAuth.io provider
                        console.log(result);
                        // do some stuff with result

                        result.me().done(function (GoogleUser) {
                            // do something with `data`, e.g. print data.name
                            //alert(JSON.stringify(GoogleUser));

                            identity.createByGoogleUser(GoogleUser);
                            onLoginDone();
                        });
                    })
                    .fail(function (error) {
                        $scope.$apply(function () {

                            if (error) {
                                $rootScope.FrontEndErrorMsg = error;
                            }
                            else {
                                $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
                            }

                        });

                    });
            }
            catch (e) {
                $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
            }
        };


        $rootScope.doFacebookLogin = function () {
            $rootScope.FrontEndErrorMsg = "";


            try {
                OAuth.initialize(APPCONFIG.OauthIOKey)
                OAuth.popup('facebook', {
                     cache: true
                }).done(function (result) {
                    console.log(result)
                    // do some stuff with result

                    //alert(result.access_token);

                    window.sessionStorage['fbtoken'] = result.access_token;

                    result.me().done(function (FaceBookUser) {

                        // alert(FaceBookUser.email);

                        identity.createByFacebookUser(FaceBookUser);
                        onLoginDone();
                    }, function () {
                        $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
                    });
                });
            }
            catch (e) {
                $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
            }
            /*
             try {
             OpenFB.login(FACEBOOKSETTINGS.Scope).then(
             function () {
             OpenFB.get('/me').success(function (FaceBookUser) {
             identity.createByFacebookUser(FaceBookUser);
             onLoginDone();
             });
             },
             function (e) {
             if (e && e.error) {
             $rootScope.FrontEndErrorMsg = e.error;
             }
             else {
             $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
             }
             });
             }*/

        };
    });
})();



