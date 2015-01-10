/**
 * Created by Simon on 11.10.14.
 */
/// <reference path="../app.ts"/>
/// <reference path="../models/Gutschein.ts"/>


interface iQRCodeFactory {
    decode(Input:string):any;
    getFromServer(obj:Gutschein);
    encode(obj:Gutschein):string;
}


(function () {
    var app = angular.module('gutscheinapp.factory.QRCodeFactory', []);


    app.factory('QRCodeFactory', function ($q, $http) {

        var self:iQRCodeFactory = this;


        self.getFromServer = function (obj) {


            var q = $q.defer();
            // http://kunden.gausmann-media.de/GutscheinApp/gutschein.php?Id=999&AddDays=1
            //var url = "http://www.fredrickmundia.com/videos/?page_id=1078&voucher_id=" + obj.Id;

            var url = "http://colibri-interactive.com/questmedia/?page_id=1078&voucher_id=" + obj.Id;


            //var url = "http://kunden.gausmann-media.de/GutscheinApp/gutschein.php?";
            //url += "Id=" + obj.Id;
            //url += "&AddDays=" + 0;


            console.log(url);


            $http.get(url).
                success(function (RawGutschein, status, headers, config) {


                    var item:Gutschein = new Gutschein(RawGutschein);

                    if (item.Id)
                        q.resolve(item);
                    else
                        q.reject();

                }).
                error(function (data, status, headers, config) {

                    q.reject();
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });


            return q.promise;
        }

        self.decode = function (Input:string) {

            var q = $q.defer();

            if (Input.indexOf(";") === -1)
                q.reject("decode fail");

            if (Input.indexOf("->") === -1)
                q.reject("decode fail");


            if (Input.indexOf("Id") === -1)
                q.reject("decode fail");

            //self.getFromServer(obj);

            try {

                var obj = new Gutschein({});

                var Pairs = Input.split(";");
                for (var i = 0; i < Pairs.length; i++) {
                    var KeyValue = Pairs[i].split("->");
                    if (KeyValue.length == 2 && obj.hasOwnProperty(KeyValue[0]))
                        obj[KeyValue[0]] = KeyValue[1];
                }


                q.resolve(obj);
            }
            catch (e) {
                q.reject(e);
            }


            //return new Gutschein({id: 1, title: ""});

            return q.promise;
        }
        self.encode = function (obj:Gutschein) {
            var StrResult = "";

            for (var key in obj) {
                StrResult += key + "->" + obj[key] + ";"
            }

            return StrResult;
        }
        var _inst:iQRCodeFactory = {
            decode: self.decode,
            encode: self.encode,
            getFromServer: self.getFromServer
        }
        return _inst;
    });

})();
