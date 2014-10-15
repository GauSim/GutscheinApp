/// <reference path="./models/Gutschein.ts"/>
/// <reference path="./services/GutscheinService.ts"/>

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in AppCtrl.js
angular.module('starter', [
    'ionic',
    'openfb',
    'gutscheinapp.constants',
    'gutscheinapp.routes',
    'gutscheinapp.services.StorageService',
    'gutscheinapp.services.GutscheinService',
    'gutscheinapp.services.AppConfig',
    'gutscheinapp.services.DevicesLocationService',
    'gutscheinapp.factory.QRCodeFactory',
    'gutscheinapp.controllers.AppCtrl',
    'gutscheinapp.controllers.WelcomeCtrl',
    'gutscheinapp.controllers.SettingsCtrl',
    'gutscheinapp.controllers.AddGutscheineCtrl',
    'gutscheinapp.controllers.MeineGutscheineListeCtrl',
    'gutscheinapp.controllers.GutscheinDetailCtrl',
    'gutscheinapp.services.identity'
]).config(function ($provide) {
    $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
        return function (exception, cause) {
            //var $rootScope = $injector.get("$rootScope");
            //$rootScope.addError({message:"Exception", reason:exception});
            alert("Fehler.");
            alert(exception);

            $delegate(exception, cause);
        };
    });
}).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.hasOwnProperty('cordova') && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.hasOwnProperty('StatusBar')) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}).run(function (APPCONFIG, StorageService) {
    //StorageService.save(StorageService.keys.AppVersion,"V0.1");
    var LocalVersion = StorageService.get(StorageService.keys.AppVersion);

    if (LocalVersion != APPCONFIG.Version) {
        // Neue Version der APP
        // Localen User löschen
        StorageService.save(StorageService.keys.User, null);
        StorageService.save(StorageService.keys.AppVersion, APPCONFIG.Version);
    }
}).run(function (OpenFB, FACEBOOKSETTINGS) {
    // Facebook Factory init
    OpenFB.init(FACEBOOKSETTINGS.AppID);
}).run(function ($rootScope, $ionicModal) {
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/_login.html', {
        scope: $rootScope
    }).then(function (modal) {
        $rootScope.modal = modal;

        // Open the login modal
        $rootScope.login = function () {
            $rootScope.modal.show();
        };

        // Triggered in the login modal to close it
        $rootScope.closeLogin = function () {
            $rootScope.modal.hide();
        };
    });
}).run(function ($state, $rootScope, $urlRouter, USER_ROLES, identity, $ionicModal) {
    $rootScope.$on('OAuthException', function () {
        if ($rootScope.login)
            $rootScope.login();
        else
            $state.go('app.Welcome');
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // ignore Welcome Screen, when eingeloggt ...
        if (toState.name === 'app.Welcome' && identity.IsAuthenticated) {
            event.preventDefault();
        }

        if (toState.data && toState.data.authorizedRoles) {
            if (!identity.IsAuthenticated)
                identity.tryRestore();

            if (!identity.IsAuthenticated || !identity.User.Role || (_.indexOf(toState.data.authorizedRoles, identity.User.Role) === -1)) {
                // Stop!
                event.preventDefault();

                $rootScope.afterlogin = { toState: toState, toParams: toParams };

                if ($rootScope.login)
                    $rootScope.login();
                else
                    $state.go('app.Welcome');
            }
        }
    });
});
//# sourceMappingURL=app.js.map
