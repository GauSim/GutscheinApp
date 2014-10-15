/**
* Created by Simon on 05.10.14.
*/
/// <reference path="../app.ts"/>
(function () {
    var app = angular.module('gutscheinapp.services.AppConfig', []);
    app.service('AppConfig', function () {
        var self = this;
        self.AppName = "App Name";
        self.AppVersion = "0.1";
    });
})();
//# sourceMappingURL=AppConfig.js.map
