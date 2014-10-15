/**
 * Created by Simon on 04.10.14.
 */


(function () {
    var app = angular.module('gutscheinapp.controllers.SettingsCtrl', []);

    app.controller('SettingsCtrl', function ($scope, GutscheinService, $rootScope, OpenFB) {

        $scope.Headline = "Einstellungen";

        $scope.GutscheinListe = GutscheinService.getList();
        $scope.deleteGutscheinListe = function () {
            GutscheinService.deleteAll();
            $scope.GutscheinListe = GutscheinService.getList();
        }

        $scope.logoff = function(){

            $rootScope.identity.destroy();
        }

    })
})();