/**
 * Created by Simon on 04.10.14.
 */
// hu
/// <reference path="../app.ts"/>
/// <reference path="../models/UserModel.ts"/>

interface iidentity {
    User:UserModel
    IsAuthenticated:boolean;
    create():boolean;
    createByFacebookUser(FaceBookUser):boolean;
    destroy();
    tryRestore():boolean;
}

(function () {

    var app = angular.module('gutscheinapp.services.identity', []);
    app.service('identity', function (USER_ROLES, OpenFB, StorageService, $rootScope, EVENTS) {

        var identity:iidentity = this;


        identity.User = new UserModel();
        identity.IsAuthenticated = false;

        identity.create = function () {

            identity.IsAuthenticated = true;

            identity.User.Role = USER_ROLES.user;

            identity.User.Email = "TestUser@Gausmann-Media.de";
            identity.User.Firstname = "Test User";
            identity.User.Lastname = "Test User";

            identity.User.FacebookId = null;
            identity.User.FacebookToken = null;

            StorageService.save(StorageService.keys.User, identity.User);
            return true;
        }

        identity.createByFacebookUser = function (FaceBookUser) {

            identity.IsAuthenticated = true;

            identity.User.Role = USER_ROLES.user;

            identity.User.Email = FaceBookUser.email;
            identity.User.Firstname = FaceBookUser.first_name;
            identity.User.Lastname = FaceBookUser.last_name;

            identity.User.FacebookId = FaceBookUser.id;
            identity.User.FacebookToken = (window.sessionStorage['fbtoken']) ? window.sessionStorage['fbtoken'] : null;

            StorageService.save(StorageService.keys.User, identity.User);


            return true;
        }

        identity.destroy = function () {
            OpenFB.revokePermissions();
            OpenFB.logout();

            identity.IsAuthenticated = false;
            identity.User = new UserModel();
            StorageService.save(StorageService.keys.User, null);
        }

        identity.tryRestore = function () {

            var qry = StorageService.get(StorageService.keys.User);
            if (qry) {

                identity.User = qry;
                identity.IsAuthenticated = true;
                return true;
            }
            else
                return false;


        }


        return identity;
    })
})();


