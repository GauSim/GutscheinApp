/**
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>

interface iGutscheinService {

    GutscheinListe:Gutschein[];
    getListAll():Gutschein[];
    getListValid():Gutschein[];
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


        self.getListAll = function () {
            var rslt:Gutschein[] = _.sortBy(self.GutscheinListe, function (Gutschein) {
                return Gutschein.Owner
            });
            return rslt;
        }


        self.getListValid = function () {
            var rslt:Gutschein[] = _.filter(self.getListAll(), function (Gutschein) {
                return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
            });
            return rslt;

        }

        self.add = function (Gutschein:Gutschein) {

            var check = _.find(self.getListAll(), function (Item:Gutschein) {
                return Item.Id == Gutschein.Id;
            });

            if (check)
                return;

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


