/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
//
interface GutscheinDetailCtrl {
    Gutschein: Gutschein;
    goback();
    postonfacebook();
    Valid(Gutschein:Gutschein): boolean
    Entwerten();
    moment:any;
    Headline:string;
}

(function () {
    var app = angular.module('gutscheinapp.controllers.GutscheinDetailCtrl', []);

    app.controller('GutscheinDetailCtrl', function ($scope:GutscheinDetailCtrl, $ionicModal, $ionicPopup, GutscheinService:iGutscheinService, $rootScope, GutscheinId, OpenFB, $state, identity:iidentity) {

        $scope.Headline = "Gutschein";
        $scope.moment = moment;

        $scope.Gutschein = GutscheinService.getById(GutscheinId);
        if (!$scope.Gutschein)
            $state.go("app.MeineGutscheine");


        $scope.Valid = function (Gutschein:Gutschein) {
            return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
        }
        if (!$scope.Valid($scope.Gutschein))
            $state.go("app.MeineGutscheine");

        $scope.goback = function () {
            $state.go("app.MeineGutscheine");
        }


        $scope.Entwerten = function () {
            // Do FB Post
            // http://ionicframework.com/docs/api/service/$ionicPopup/
            function doit() {


                if (identity.User.FacebookId) {

                    alert("versuch Facebook");
                    poston_facebook();
                }

                if (identity.User.GoogleId) {
                    poston_google();
                }

                GutscheinService.deleteById(GutscheinId);
                $state.go("app.MeineGutscheine");
            }

            var confirmPopup = $ionicPopup.confirm({
                title: 'Gutschein Entwerten & Löschen',
                template: 'Bist du dir sicher, dass du diesen Gutschein Entwerten und Löschen möchtest ? '
            });
            confirmPopup.then(function (res:boolean) {
                if (res)
                    doit();
                else
                    console.log('You are not sure');
            });
        };

        var poston_facebook = function () {

            //alert(identity.User.FacebookToken);

            var msg = {
                message: $scope.Gutschein.PostMessage,
                link: "https://www.facebook.com/City.Friseur.Osnabrueck"
            };
            OpenFB.post('/me/feed', msg)
                .success(function () {
                    var a = "This item has been shared on OpenFB";
                    alert("ok, ist auf der wall")
                })
                .error(function (data) {
                    alert(data.error.message);
                });
        };

        var poston_google = function () {

            alert("Google API todo");
        }


    });
})();