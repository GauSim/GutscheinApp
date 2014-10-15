

(function () {
    var app = angular.module('gutscheinapp.controllers.GutscheinDetailCtrl', []);

    app.controller('GutscheinDetailCtrl', function ($scope, GutscheinService, $rootScope, $stateParams) {

        console.log($stateParams.GutscheinId);

    });
})();