/// <reference path="../app.ts"/>
declare var googleapi;

angular.module('gutscheinapp.factory.GoogleplusFactory', [])
    .factory('GoogleplusFactory', function ($rootScope, $q, $window, $http) {



        // Check https://developers.google.com/+/api/oauth
        // https://developers.google.com/+/web/api/javascript


        var tokenStore = window.sessionStorage,
            login,
            api,
            revokePermissions;



        login = function () {
            var deferredLogin = $q.defer();
            // http://schemas.google.com/AddActivity
            googleapi.authorize({
                client_id: 'CLIENT_ID',
                client_secret: 'CLIENT_SECRET',

                redirect_uri: 'http://localhost',
                scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            })
                .done(function (data) {
                    alert(data.access_token);

                    tokenStore['googletoken'] = data.access_token;

                    deferredLogin.resolve();
                }).error(function (e) {
                    debugger;
                    deferredLogin.reject({ error: e });
                });


            return deferredLogin.promise;
        };

        api = function (obj) {
            var deferredLogin = $q.defer();

            var method = obj.method || 'GET',
                params = obj.params || {};

            var baseurl = 'https://graph.facebook.com';

            params['access_token'] = tokenStore['googletoken'];
            params['alt'] = 'json';



            $http({ method: method, url: baseurl + obj.path, params: params })
                .success(function (data) {
                    alert(data);
                    deferredLogin.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    if (data.error && data.error.type === 'OAuthException') {
                        $rootScope.$emit('OAuthException');
                    }
                });
            return deferredLogin.promise;
        }

        revokePermissions = function () {
            var deferredLogin = $q.defer();

            var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + tokenStore['googletoken'];


            $http({ method: 'GET', url: revokeUrl })
                .success(function (e) {
                    alert(e);
                    tokenStore['googletoken'] = null;
                    deferredLogin.resolve();
                })
                .error(function (e) {
                    // Handle the error
                    // console.log(e);
                    // You could point users to manually disconnect if unsuccessful
                    // https://plus.google.com/apps
                    alert(e);
                    deferredLogin.reject({ error: e });
                });


            deferredLogin.resolve();

            return deferredLogin.promise;
        }


        return {
            login: login,
            api: api,
            revokePermissions: revokePermissions
        }
    });

