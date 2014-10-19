/**
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
/// <reference path="../services/DevicesLocationService.ts"/>
/// <reference path="../factory/QRCodeFactory.ts"/>

interface MeineGutscheineListeCtrl {
    Headline:string;
    moment: any;
    MeineGutscheine:Gutschein[];
    Valid(Gutschein:Gutschein):boolean;
    ValidUntilDisplayText(Gutschein:Gutschein):string;
    ShowNotice(Gutschein:Gutschein);

    gotoDetail(Gutschein:Gutschein);


}

(function () {
    var app = angular.module('gutscheinapp.controllers.MeineGutscheineListeCtrl', []);

    app.controller('MeineGutscheineListeCtrl', function ($scope:MeineGutscheineListeCtrl, $state, GutscheinService:iGutscheinService) {

        $scope.Headline = "Gutschein App";
        $scope.moment = moment;
        $scope.MeineGutscheine = GutscheinService.getListValid();





        $scope.gotoDetail = function (Gutschein:Gutschein) {
            $state.go('app.GutscheinDetail', { GutscheinId: Gutschein.Id }, { inherit: true });
        }


        $scope.ShowNotice = function (Gutschein:Gutschein) {
            moment(Gutschein.ValidUntil) >= moment();
        }
    })
})();

