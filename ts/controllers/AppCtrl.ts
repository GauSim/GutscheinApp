/// <reference path="../app.ts"/>

(function () {


    var app = angular.module('gutscheinapp.controllers.AppCtrl', ['gutscheinapp.services.identity']);
    app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, identity, $rootScope, OpenFB, GoogleplusFactory, FACEBOOKSETTINGS, APPCONFIG, EVENTS) {

        //identity.create();

        $rootScope.identity = identity;
        $rootScope.APPCONFIG = APPCONFIG;


        console.log(GoogleplusFactory);


        // Form data for the login modal
        $scope.loginData = {};


        // window.sessionStorage['fbtoken']

        function onLoginDone() {
            $scope.closeLogin();
            $state.go('app.AddGutscheine', null, { inherit: false, relative: null })
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


            // // https://console.developers.google.com/
            // 1045383240578-bfkp9gcufmp0gk1146pf6giji7r0bt4h.apps.googleusercontent.com
            gapi.auth.signIn({
                'callback': 'GooglePlusReadysigninCallback',
                'clientid': '1045383240578-e0rmj2eqo0k1jl3h5uvodh0000iajqo4.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'requestvisibleactions': 'http://schemas.google.com/AddActivity',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.stream.write'
            });
            // gapi.auth.signOut()
        }

        $rootScope.facebookLogin = function () {
            $rootScope.FrontEndErrorMsg = "";

            OpenFB.login(FACEBOOKSETTINGS.Scope).then(
                function () {
                    OpenFB.get('/me').success(function (FaceBookUser) {
                        identity.create(FaceBookUser);
                        onLoginDone();
                    });
                },
                function (e) {
                    if (e && e.error) {
                        $rootScope.FrontEndErrorMsg = e.error;
                    }
                    else {
                        $rootScope.FrontEndErrorMsg = "Login fehlgeschlagen ...";
                    }
                });
        };
    });


})();



