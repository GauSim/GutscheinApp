/**
 * Created by Simon on 04.10.14.
 */

(function () {
    var app = angular.module('gutscheinapp.controllers.MeineGutscheineListeCtrl', []);

    app.controller('MeineGutscheineListeCtrl', function ($scope, $state, GutscheinService) {

        $scope.MeineGutscheine = GutscheinService.GutscheinListe

        $scope.filter = function (Gutschein) {
            debugger;
            return true;
        }
        $scope.Valid = function (Gutschein) { return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment()); }
        $scope.ValidUntilDisplayText = function (Gutschein) {
            if ($scope.Valid(Gutschein))
                return moment(Gutschein.ValidUntil).fromNow();
            else
                return "abgelaufen";
        };
        $scope.gotoDetail = function (Id) {
 
            $state.go('app.GutscheinDetail', { GutscheinId: Id }, { inherit: true });
        }

    })
})();

