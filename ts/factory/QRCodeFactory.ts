/**
 * Created by Simon on 11.10.14.
 */
/// <reference path="../app.ts"/>
/// <reference path="../models/Gutschein.ts"/>


interface iQRCodeFactory {
    decode(Input:string):any;
    scan();
    encode(obj:Gutschein):string;
}


(function () {
    var app = angular.module('gutscheinapp.factory.QRCodeFactory', []);


    app.factory('QRCodeFactory', function ($q) {

        var self:iQRCodeFactory = this;

        self.scan = function () {
            var q = $q.defer();


            //
            //alert(typeof sanner);

            //sanner.scan(q.resolve, q.reject);

            q.reject({error: 'BarcodeScanner Plugin not found'});
            //
            // returns :
            // result.text
            // result.format

            return q.promise;
        }
        self.decode = function (Input:string) {

            var q = $q.defer();

            var obj = new Gutschein({});

            try {
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
            scan: self.scan
        }
        return _inst;
    });

})();
