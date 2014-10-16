/**
* Created by Simon on 04.10.14.
*/
/// <reference path="./app.ts"/>
(function () {
    var app = angular.module('gutscheinapp.routes', []);

    app.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        }).state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html"
                }
            }
        }).state('app.Welcome', {
            url: "/Welcome",
            views: {
                'menuContent': {
                    templateUrl: "templates/welcome.html",
                    controller: 'WelcomeCtrl'
                }
            }
        }).state('app.MeineGutscheine', {
            url: "/MeineGutscheine",
            views: {
                'menuContent': {
                    templateUrl: "templates/meineGutscheine.html",
                    controller: 'MeineGutscheineListeCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('app.AddGutscheine', {
            url: "/AddGutscheine",
            views: {
                'menuContent': {
                    templateUrl: "templates/addGutscheine.html",
                    controller: 'AddGutscheineCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('app.GutscheinDetail', {
            resolve: {
                GutscheinId: function ($stateParams) {
                    return $stateParams.GutscheinId;
                }
            },
            url: "/Gutschein/:GutscheinId",
            views: {
                'menuContent': {
                    templateUrl: "templates/GutscheinDetail.html",
                    controller: 'GutscheinDetailCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('app.Settings', {
            url: "/Settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/settings.html",
                    controller: 'SettingsCtrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/Welcome');
    });
})();
//# sourceMappingURL=routes.js.map
