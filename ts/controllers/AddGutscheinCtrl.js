/// <reference path="../app.ts"/>
/// <reference path="../services/GutscheinService.ts"/>
/// <reference path="../services/DevicesLocationService.ts"/>
/// <reference path="../factory/QRCodeFactory.ts"/>

(function () {
    var app = angular.module('gutscheinapp.controllers.AddGutscheineCtrl', []);

    app.controller('AddGutscheineCtrl2', function ($scope) {
    });

    app.controller('AddGutscheineCtrl', function ($scope, $q, GutscheinService, DevicesLocationService, $ionicModal, QRCodeFactory, OpenFB) {
        var Scanner;
        $scope.ScanButton = false;
        if (window.hasOwnProperty('cordova')) {
            try  {
                Scanner = cordova.require("cordova/plugin/BarcodeScanner");
                $scope.ScanButton = true;
            } catch (e) {
                $scope.ScanButton = false;
            }
        } else {
            Scanner = { scan: function (ok, err) {
                    err("plugin not found");
                } };
        }

        $scope.Headline = "Add";
        $scope.GutscheinListe = GutscheinService.getList();
        $ionicModal.fromTemplateUrl('templates/_LocationList.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.add = function () {
            for (var i = 0; i < 2; i++) {
                var _gt = new Gutschein({
                    Id: Math.floor((Math.random() * 1000) + 1),
                    Title: "30% auf den Gesamt Einkauf_" + i,
                    ValidUntil: moment().add(5 * (i + 1), 'minutes').toISOString()
                });
                GutscheinService.add(_gt);
            }
            $scope.GutscheinListe = GutscheinService.getList();
            console.log($scope.GutscheinListe);
        };

        $scope.scan = function () {
            var Test = "Id->50;Title->Simons Test Gustschein";

            function test() {
                setTimeout(function () {
                    QRCodeFactory.decode(Test).then(function (Gutschein) {
                        console.log(Gutschein);

                        GutscheinService.add(Gutschein);
                        $scope.GutscheinListe = GutscheinService.getList();

                        console.log(QRCodeFactory.encode(Gutschein));

                        $scope.modal.hide();
                    }, function (error) {
                        console.log(error);

                        $scope.modal.hide();
                    });
                }, 500);
            }

            function done(msg) {
                var q = $q.defer();

                if (msg)
                    alert(msg);

                $scope.modal.hide();
                q.resolve();
            }

            function tryScann() {
                try  {
                    Scanner.scan(function (obj) {
                        QRCodeFactory.decode(obj.text).then(function (result) {
                            //alert(result.Title);
                            $scope.GutscheinListe = GutscheinService.getList();
                            GutscheinService.add(result);
                            done();
                        }, function (e) {
                            console.log(e);
                            done("Code konnte nicht gelesen werden");
                        });
                    }, function (error) {
                        console.log(error.error);
                        setTimeout(function () {
                            done("Scanner konnte nicht gestartet werden.");
                        }, 500);
                    });
                } catch (e) {
                    done("Scanner konnte nicht gestartet werden.");
                }
            }

            $scope.modal.show().then(tryScann);
        };

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
                OpenFB.get('/search', { type: 'place', center: position.coords.latitude + "," + position.coords.longitude, distance: 25 }).success(function (obj) {
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
        };
        $scope.LocationSelect = function (item) {
            $scope.modal.hide();
            $scope.GetByLocationButton = false;
            $scope.selectedLocation = item;
        };
    });
})();
//# sourceMappingURL=AddGutscheinCtrl.js.map
