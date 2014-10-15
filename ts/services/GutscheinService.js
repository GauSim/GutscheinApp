/**
* Created by Simon on 04.10.14.
*/
/// <reference path="../app.ts"/>

(function () {
    var app = angular.module('gutscheinapp.services.GutscheinService', []);
    app.service('GutscheinService', function (StorageService) {
        var self = this;
        var qry = StorageService.get(StorageService.keys.GutscheinListe);
        self.GutscheinListe = qry ? qry : [];

        self.getList = function () {
            var rslt = _.sortBy(self.GutscheinListe, function (Gutschein) {
                return Gutschein.ValidUntil;
            });
            return rslt;
        };
        self.add = function (Gutschein) {
            self.GutscheinListe.push(Gutschein);
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        };

        self.deleteById = function (GutscheinId) {
            self.GutscheinListe = _.reject(self.GutscheinListe, function (Gutschein) {
                return Gutschein.Id + "" === GutscheinId + "";
            });
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        };

        self.deleteAll = function () {
            self.GutscheinListe = [];
            StorageService.save(StorageService.keys.GutscheinListe, self.GutscheinListe);
        };

        self.getById = function (GutscheinId) {
            return _.find(self.GutscheinListe, function (Gutschein) {
                return Gutschein.Id + "" === GutscheinId + "";
            });
        };
    });
})();
//# sourceMappingURL=GutscheinService.js.map
