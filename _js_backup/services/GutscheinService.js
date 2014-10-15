/**
 * Created by Simon on 04.10.14.
 */
(function () {

    var app = angular.module('gutscheinapp.services.GutscheinService', []);
    app.service('GutscheinService', function (StorageService) {

        var self = this;
        self.GutscheinListe = StorageService.get(StorageService.keys.GutscheinListe);


        self.getList = function(){
            return _.sortBy(self.GutscheinListe, function (Gutschein) { return Gutschein.ValidUntil });;
        }
        self.add = function(Gutschein){
            self.GutscheinListe.push(Gutschein);
            StorageService.save(StorageService.keys.GutscheinListe,self.GutscheinListe);

        }
        self.deleteAll = function(){
            self.GutscheinListe = [];
            StorageService.save(StorageService.keys.GutscheinListe,self.GutscheinListe);
        }




    })
})();


