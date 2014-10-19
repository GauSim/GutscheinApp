/**
 * Created by Simon on 04.10.14.
 */


(function () {
    var app = angular.module('gutscheinapp.controllers.AddGutscheineCtrl', []);

    app.controller('AddGutscheineCtrl', function ($scope, GutscheinService, OpenFB, DevicesLocationService, $ionicModal) {

        console.log("jo");

        var mystring = "Id->50;Name->Simon";

        function parseBarcodeString(String) {
            var obj = {};
            var arr1 = String.split(";");
            for (var i = 0; i < arr1.length; i++) {
                var arr2 = arr1[i].split("->");
                obj[arr2[0]] = arr2[1];
            }
            console.log(obj);
            return obj;
        }

        //alert(parseBarcodeString(mystring).Name);


        $scope.Headline = "Add";

        $scope.GutscheinListe = GutscheinService.getListAll();


        $scope.add = function () {

            for (var i = 0; i < 5; i++) {
                var _gt = new Gutschein({id: i, title: "name" + i});
                GutscheinService.add(_gt);
            }

            $scope.GutscheinListe = GutscheinService.getListAll();
            console.log($scope.GutscheinListe);
        }


        $scope.scan = function () {
            console.log('scanning');

            var scanner = cordova.require("cordova/plugin/BarcodeScanner");


            scanner.scan(function (result) {
                // result.text
                // result.format

                var obj = parseBarcodeString(result.text)

                alert(obj.Name);
                for (var key in obj) {
                    alert(key + " = " + obj[key]);
                }

                alert("Done");

            }, function (error) {
                console.log("Scanning failed: ", error);
            });
        }

        $scope.selectedLocation = null;
        $scope.GetByLocationButton = true;
        $ionicModal.fromTemplateUrl('templates/_LocationList.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.GetByLocation = function () {
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


        $scope.postonfacebook = function () {
            var msg = {
                message: "hi",
                link: "https://www.facebook.com/City.Friseur.Osnabrueck"
            };
            OpenFB.post('/me/feed', msg)
                .success(function () {
                    $scope.status = "This item has been shared on OpenFB";
                })
                .error(function (data) {
                    alert(data.error.message);
                });
        }


    })
})();