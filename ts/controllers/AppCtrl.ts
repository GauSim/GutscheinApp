/// <reference path="../app.ts"/>


(function () {
    var app = angular.module('gutscheinapp.controllers.AppCtrl', ['gutscheinapp.services.identity']);


    app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, identity:iidentity, $rootScope, OpenFB, FACEBOOKSETTINGS, APPCONFIG, EVENTS) {

        $rootScope.identity = identity;
        $rootScope.APPCONFIG = APPCONFIG;


        // window.sessionStorage['fbtoken']

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
                OAuth.initialize('eRvbHpnoDZTB0zwIaZseLgVZfyQ');
                OAuth.popup('google')
                    .done(function (result) {
                        //OAuth.io provider
                        console.log(result);
                        // do some stuff with result
                        alert("ok");
                        result.me().done(function (data) {
                            // do something with `data`, e.g. print data.name
                            alert(data.name);
                            console.log(data);
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
            }
            catch (e) {
                $rootScope.FrontEndErrorMsg = "Login ist fehlgeschlagen ...";
            }


        };
    });
})();



