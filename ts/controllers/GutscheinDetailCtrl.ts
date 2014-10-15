/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
//
interface  GutscheinDetailCtrl {
    Gutschein:Gutschein;
    goback();
    postonfacebook();
    Valid(Gutschein:Gutschein):boolean
    Entwerten();
}

(function () {
    var app = angular.module('gutscheinapp.controllers.GutscheinDetailCtrl', []);

    app.controller('GutscheinDetailCtrl', function ($scope:GutscheinDetailCtrl, GutscheinService:iGutscheinService, $rootScope, GutscheinId, OpenFB, $state) {

        console.log(GutscheinId);

        $scope.Gutschein = GutscheinService.getById(GutscheinId);
        if (!$scope.Gutschein)
            $state.go("app.MeineGutscheine");

        $scope.goback = function () {
            $state.go("app.MeineGutscheine");
        }

        $scope.Valid = function (Gutschein:Gutschein) {
            return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
        }


        $scope.Entwerten = function () {

            // Do FB Post

            GutscheinService.deleteById(GutscheinId);
            $state.go("app.MeineGutscheine");

        };

        $scope.postonfacebook = function () {
            var msg = {
                message: "hi",
                link: "https://www.facebook.com/City.Friseur.Osnabrueck"
            };
            OpenFB.post('/me/feed', msg)
                .success(function () {
                    var a = "This item has been shared on OpenFB";
                })
                .error(function (data) {
                    alert(data.error.message);
                });
        };


    });
})();