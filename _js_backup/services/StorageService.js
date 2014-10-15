/**
 * Created by Simon on 04.10.14.
 */
(function () {

    var app = angular.module('gutscheinapp.services.StorageService', []);
    app.factory('StorageService', function () {

        return {
            keys: {
                GutscheinListe: "app.GutscheinListe",
                User: "app.User"
            },
            get: function (_key) {
                var data = localStorage.getItem(_key);
                if (data == null) {
                    return new Array();
                } else return JSON.parse(data);
            },
            save: function (_key, data) {
                try  {
                    localStorage.setItem(_key, JSON.stringify(data));
                } catch (e) {
                    console.log('Error saving to storage.');
                    throw e;
                }
            },
            clear: function (_key) {
                localStorage.setItem(_key, JSON.stringify([]));
            }
        };


    })
})();


