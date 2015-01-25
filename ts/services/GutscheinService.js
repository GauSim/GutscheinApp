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
        self.getListAll = function () {
            var rslt = _.sortBy(self.GutscheinListe, function (Gutschein) {
                return Gutschein.Owner;
            });
            return rslt;
        };
        self.getListValid = function () {
            var rslt = _.filter(self.getListAll(), function (Gutschein) {
                return (Gutschein.AllwaysVaild || moment(Gutschein.ValidUntil) >= moment());
            });
            return rslt;
        };
        self.add = function (Gutschein) {
            var check = _.find(self.getListAll(), function (Item) {
                return Item.Id == Gutschein.Id;
            });
            if (check)
                return;
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