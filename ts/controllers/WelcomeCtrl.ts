/**
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>

(function () {
    var app = angular.module('gutscheinapp.controllers.WelcomeCtrl', []);
    app.controller('WelcomeCtrl', function ($scope, $ionicSlideBoxDelegate, identity, $state, $rootScope) {


        // Try Autologin

        if (identity.tryRestore()) {
            console.log('autologin ...');

            //console.log(identity);

            if ($rootScope.afterlogin) {

                $state.go($rootScope.afterlogin.toState.name, $rootScope.afterlogin.toParams);
            } else {
                $state.go('app.AddGutscheine', null, { inherit: false, relative: null });
            }
        }


        $scope.Headline = "Willkommen";

        $scope.nextSlide = function () {
            $ionicSlideBoxDelegate.next();
        }

        $scope.showNextButton = true;
        $scope.slideHasChanged = function (index) {
            if (index == 2)
                $scope.showNextButton = false;
            else
                $scope.showNextButton = true;

        }
    });
})();


