/**
 * Created by Simon on 06.10.14.
 */
/// <reference path="../app.ts"/>
(function () {
    var app = angular.module('gutscheinapp.services.DevicesLocationService', []);
    app.service('DevicesLocationService', function ($q) {
        var self = this;
        self.getLocation = function () {
            var deferred = $q.defer();
            deferred.notify('loading ...');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, { enableHighAccuracy: true });
            }
            else {
                deferred.reject({ message: 'geolocation not supported' });
            }
            return deferred.promise;
        };
    });
})();
//# sourceMappingURL=DevicesLocationService.js.map