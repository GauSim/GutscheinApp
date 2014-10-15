/// <reference path="../app.ts"/>
(function () {
    var app = angular.module('gutscheinapp.controllers.AppCtrl', ['gutscheinapp.services.identity']);
    app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, identity, $rootScope, OpenFB, FACEBOOKSETTINGS, APPCONFIG, EVENTS) {
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

        $rootScope.facebookLogin = function () {
            OpenFB.login(FACEBOOKSETTINGS.Scope).then(function () {
                OpenFB.get('/me').success(function (FaceBookUser) {
                    identity.create(FaceBookUser);
                    onLoginDone();
                });
            }, function () {
                alert('OpenFB login failed');
            });
        };
    });
})();
//# sourceMappingURL=AppCtrl.js.map
