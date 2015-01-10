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

    app.controller('GutscheinDetailCtrl', function ($scope:GutscheinDetailCtrl, APPCONFIG, $ionicModal, $ionicPopup, GutscheinService:iGutscheinService, $rootScope, GutscheinId, OpenFB, $state, identity:iidentity) {

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
                    alert("versuch google");
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

            var provider = 'facebook';


            // ,
            //
            var msg = {
                message: $scope.Gutschein.PostMessage
                //,link: "https://www.facebook.com/City.Friseur.Osnabrueck"
            };


            var facebook = OAuth.create('facebook');
            if (!facebook)
                return;


            facebook.post(
                {
                    url: '/me/feed',
                    data: msg
                })
                .done(function (response) {
                    //this will display the id of the message in the console
                    //console.log(response.id);
                    //alert("done" + response.id);
                })
                .fail(function (err) {
                    //handle error with err
                    //alert("err, post");
                    //alert(JSON.stringify(err));
                });

        };

        var poston_google = function () {

            // https://www.googleapis.com/plus/v1/people/userId/moments/collection


            var target = {
                //kind: "plus#moment",
                id: "target-id-1",
                type: "http://schemas.google.com/AddActivity",
                name: "Name",
                //image:"",
                description: "huhu"

            };


            var body2 = {
                target: target,
                type: "http://schemas.google.com/AddActivity"
            };

            var moment = {
                "kind": "plus#moment",
                "type": "http://schemas.google.com/CreateActivity",
                "target": {
                    "kind": "plus#itemScope",
                    "id": "target-id-2",
                    "type": "http://schema.org/CreativeWork",
                    "name": "Test moment",
                    "description": "This is a sample moment",
                    "text": "samplpe g+ posting!"
                }
            }

            var google_plus = OAuth.create('google_plus');
            if (!google_plus)
                return;

            google_plus.post(
                {
                    url: "/people/me/moments/vault",
                    data: moment
                })
                .done(function (response) {
                    //this will display the id of the message in the console
                    //console.log(response.id);
                    alert("ok");
                })
                .fail(function (err) {
                    //handle error with err
                    //alert("err, post");
                    //alert(JSON.stringify(err));
                    // TODO:Fix this maaaan! i allways get 500!!
                });

        }


    });
})();