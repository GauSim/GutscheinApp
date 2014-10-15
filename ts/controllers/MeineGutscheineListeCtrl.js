/**
* Created by Simon on 04.10.14.
*/
/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
/// <reference path="../services/DevicesLocationService.ts"/>
/// <reference path="../factory/QRCodeFactory.ts"/>

(function () {
    var app = angular.module('gutscheinapp.controllers.MeineGutscheineListeCtrl', []);

    app.controller('MeineGutscheineListeCtrl', function ($scope, $state, GutscheinService) {
        $scope.Headline = "Gutschein App";

        $scope.MeineGutscheine = GutscheinService.GutscheinListe;

        $scope.Valid = function (Gutschein) {
            return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
        };
        $scope.ValidUntilDisplayText = function (Gutschein) {
            if ($scope.Valid(Gutschein))
                return moment(Gutschein.ValidUntil).fromNow();
            else
                return "abgelaufen";
        };
        $scope.gotoDetail = function (Gutschein) {
            $state.go('app.GutscheinDetail', { GutscheinId: Gutschein.Id }, { inherit: true });
        };
    });
})();
//# sourceMappingURL=MeineGutscheineListeCtrl.js.map
