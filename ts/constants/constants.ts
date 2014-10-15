/**
 * Created by Simon on 04.10.14.
 */
/// <reference path="../app.ts"/>

(function () {
    var app = angular.module('gutscheinapp.constants', [])

    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        user: 'user'
    });

    app.constant('EVENTS', {
        LOGIN: '####LOGINEVENT####'
    });


    app.constant('FACEBOOKSETTINGS', {
        AppID: '797691880296264',
        Scope: 'email,read_stream,publish_stream,publish_actions'
    });

    app.constant('APPCONFIG', {
        Name: 'Gutschein App',
        PrivacyStatementUrl: 'http://www.gausmann-media.de',
        SupportUrl: 'info@gausmann-media.de',
        CopyrightInfo: 'by Gausmann-Media',
        CopyrightUrl: 'http://www.gausmann-media.de',
        CreatedBy: 'Simon Gausmann',
        Version: "V0.1.1"
    });

})
();