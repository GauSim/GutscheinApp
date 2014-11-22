/**
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
/// <reference path="../services/DevicesLocationService.ts"/>
/// <reference path="../factory/QRCodeFactory.ts"/>
//
interface AddGutscheineCtrl {
    modal:{
        show();
        hide();
    }
    status:string;

    Headline:string;
    GutscheinListe: Gutschein[];
    selectedLocation:FB_Location;
    Locations:FB_Location[];

    add();

    ScanButton:boolean;
    scan();

    GetByLocationButton:boolean;
    getByLocation();

    LocationSelect(item:FB_Location);

    $apply(func:any);

}
interface FB_Location {
    name:string;
    location: {
        street:string;
        zip:string;
        city:string;
    }
}

(function () {
    var app = angular.module('gutscheinapp.controllers.AddGutscheineCtrl', []);


    app.controller('AddGutscheineCtrl2', function ($scope) {
    });

    app.controller('AddGutscheineCtrl', function ($scope:AddGutscheineCtrl, $q, GutscheinService:iGutscheinService, DevicesLocationService, $ionicModal, QRCodeFactory:iQRCodeFactory, OpenFB, $state) {

        var Scanner;
        $scope.ScanButton = false;
        if (window.hasOwnProperty('cordova')) {

            try {
                Scanner = cordova.require("cordova/plugin/BarcodeScanner");
                $scope.ScanButton = true;
            }
            catch (e) {
                $scope.ScanButton = false;
            }
        }
        else {
            Scanner = {scan: function (ok, err) {
                err("plugin not found");
            }}
        }

        $scope.Headline = "QR-Code";
        $scope.GutscheinListe = GutscheinService.getListAll();
        $ionicModal.fromTemplateUrl('templates/_LocationList.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.add = function () {


            for (var i = 0; i < 2; i++) {


                var rndID = Math.floor((Math.random() * 1000) + 1);
                QRCodeFactory.getFromServer(new Gutschein({Id: rndID}))
                    .then(function (Gutschein:Gutschein) {
                        GutscheinService.add(Gutschein);
                        $scope.GutscheinListe = GutscheinService.getListAll();
                    });
            }


        }


        $scope.scan = function () {


            var Test = "Id->50;Title->Simons Test Gustschein";

            function test() {
                setTimeout(function () {
                    QRCodeFactory.decode(Test)
                        .then(function (Gutschein) {
                            console.log(Gutschein);

                            GutscheinService.add(Gutschein);
                            $scope.GutscheinListe = GutscheinService.getListAll();

                            console.log(QRCodeFactory.encode(Gutschein));

                            $scope.modal.hide();
                        }, function (error) {
                            alert(JSON.stringify(error));
                            console.log(error);

                            $scope.modal.hide();
                        });
                }, 500);
            }


            function done(msg?:string) {
                var q = $q.defer();

                if (msg)
                    alert(msg);

                $scope.modal.hide();
                q.resolve();
            }

            function tryScann() {
                try {
                    Scanner.scan(function (obj) {
                        QRCodeFactory.decode(obj.text).then(
                            function (Gutschein:Gutschein) {

                                QRCodeFactory.getFromServer(Gutschein)
                                    .then(function (result:Gutschein) {
                                        //alert(result.Title);
                                        $scope.GutscheinListe = GutscheinService.getListAll();
                                        GutscheinService.add(result);
                                        done();
                                        $state.go("app.MeineGutscheine");

                                    });

                            },
                            function (e) {
                                console.log(e);
                                done("Code konnte nicht erkannt");
                            });
                    }, function (error) {
                        console.log(error.error);
                        setTimeout(function () {
                            done("Scanner konnte nicht gestartet werden.");
                        }, 500)

                    });
                } catch (e) {
                    done("Scanner konnte nicht gestartet werden.");
                }
            }

            $scope.modal.show().then(tryScann);
        }

        $scope.selectedLocation = null;
        $scope.GetByLocationButton = false;

        $scope.getByLocation = function () {
            $scope.modal.show();
            $scope.GetByLocationButton = false;
            DevicesLocationService.getLocation().then(function (position) {
                //var lat = position.coords.latitude;
                //var longi = position.coords.longitude;
                //alert("latitude is: " + position.coords.latitude + " longitude is: " + position.coords.longitude);

                // Facebook nach Locations im Umkreis fragen...
                OpenFB.get('/search',
                    { type: 'place', center: position.coords.latitude + "," + position.coords.longitude, distance: 25 }
                ).success(function (obj) {
                        $scope.GetByLocationButton = true;
                        $scope.Locations = obj;
                        console.log(obj);
                    }).error(function (e) {
                        console.log(e.message);
                        $scope.GetByLocationButton = true;
                        $scope.modal.hide();
                    });

            }, function (e) {
                console.log(e.message);
                $scope.GetByLocationButton = true;
                $scope.modal.hide();
            });


        }
        $scope.LocationSelect = function (item) {
            $scope.modal.hide();
            $scope.GetByLocationButton = false;
            $scope.selectedLocation = item;
        }


    })

})
();