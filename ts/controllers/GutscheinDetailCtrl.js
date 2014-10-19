/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>

(function () {
    var app = angular.module('gutscheinapp.controllers.GutscheinDetailCtrl', []);

    app.controller('GutscheinDetailCtrl', function ($scope, $ionicModal, $ionicPopup, GutscheinService, $rootScope, GutscheinId, OpenFB, $state, identity) {
        console.log(GutscheinId);

        $scope.Gutschein = GutscheinService.getById(GutscheinId);
        if (!$scope.Gutschein)
            $state.go("app.MeineGutscheine");

        $scope.goback = function () {
            $state.go("app.MeineGutscheine");
        };

        $scope.Valid = function (Gutschein) {
            return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
        };

        $scope.Entwerten = function () {
            // Do FB Post
            // http://ionicframework.com/docs/api/service/$ionicPopup/
            function doit() {
                if (identity.User.FacebookId) {
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
            confirmPopup.then(function (res) {
                if (res)
                    doit();
                else
                    console.log('You are not sure');
            });
        };

        var poston_facebook = function () {
            var msg = {
                message: "hi",
                link: "https://www.facebook.com/City.Friseur.Osnabrueck"
            };
            OpenFB.post('/me/feed', msg).success(function () {
                var a = "This item has been shared on OpenFB";
            }).error(function (data) {
                alert(data.error.message);
            });
        };

        var poston_google = function () {
            alert("Google API todo");
        };
    });
})();
//# sourceMappingURL=GutscheinDetailCtrl.js.map
