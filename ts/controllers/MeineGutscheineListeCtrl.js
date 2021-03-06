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
        $scope.Headline = "Meine Gutscheine";
        $scope.moment = moment;
        $scope.MeineGutscheine = GutscheinService.getListValid();
        $scope.gotoDetail = function (Gutschein) {
            $state.go('app.GutscheinDetail', { GutscheinId: Gutschein.Id }, { inherit: true });
        };
        $scope.ShowNotice = function (Gutschein) {
            return !(moment(Gutschein.ValidUntil) >= moment().add(1, 'day')) && !Gutschein.AllwaysVaild;
        };
    });
})();
//# sourceMappingURL=MeineGutscheineListeCtrl.js.map