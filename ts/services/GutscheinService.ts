/** 
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>

interface iGutscheinService {

    GutscheinListe:Gutschein[];
    getList():Gutschein[];
    add(Gutschein:Gutschein):void;
    deleteAll():void;
    getById(GutscheinId:string):Gutschein
    deleteById(GutscheinId:string):void;
}

(function () {

    var app = angular.module('gutscheinapp.services.GutscheinService', []);
    app.service('GutscheinService', function (StorageService) {

        var self:iGutscheinService = this;
        var qry = StorageService.get(StorageService.keys.GutscheinListe);
        self.GutscheinListe = qry ? qry : [];


        self.getList = function () {
            var rslt:Gutschein[] = _.sortBy(self.GutscheinListe, function (Gutschein) {
                return Gutschein.ValidUntil
            });
            return rslt;
        }
        self.add = function (Gutschein:Gutschein) {
            self.GutscheinListe.push(Gutschein);
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        }

        self.deleteById = function (GutscheinId:string) {
            self.GutscheinListe = _.reject(self.GutscheinListe, function (Gutschein:Gutschein) {
                return Gutschein.Id + "" === GutscheinId + "";
            });
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        }

        self.deleteAll = function () {
            self.GutscheinListe = [];
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        }

        self.getById = function (GutscheinId:string) {
            return _.find(self.GutscheinListe, function (Gutschein:Gutschein) {
                return Gutschein.Id + "" === GutscheinId + "";
            });
        }

    })
})();


