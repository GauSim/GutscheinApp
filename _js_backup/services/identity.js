/**
 * Created by Simon on 04.10.14.
 */
(function () {

    var app = angular.module('gutscheinapp.services.identity', []);
    app.service('identity', function (USER_ROLES, OpenFB, StorageService, $rootScope, EVENTS) {

        var identity = this;


        function _UserModel() {
            var self = this;
            self.SessionId = null;
            self.Role = null;

            self.Email = null;
            self.Firstname = null;
            self.Lastname = null;
            self.FacebookId = null;
            self.fbtoken = null;
        }


        identity.User = new _UserModel();
        identity.IsAuthenticated = false;

        identity.create = function (FaceBookUser) {

            identity.IsAuthenticated = true;

            identity.User.SessionId = '6A3DDE3B-3BB5-41FB-9E02-E1EEB38CBE22';
            identity.User.Role = USER_ROLES.user;

            identity.User.Email = (FaceBookUser) ? FaceBookUser.email : "TestUser@Gausmann-Media.de";
            identity.User.Firstname = (FaceBookUser) ? FaceBookUser.first_name : "Kein";
            identity.User.Lastname = (FaceBookUser) ? FaceBookUser.last_name : "User";
            identity.User.FacebookId = (FaceBookUser) ? FaceBookUser.id : null;
            identity.User.fbtoken = (FaceBookUser) ? window.sessionStorage['fbtoken'] : null;
            debugger;
            StorageService.save(StorageService.keys.User, identity.User);
        }
        identity.destroy = function () {
            OpenFB.revokePermissions();
            OpenFB.logout();

            identity.IsAuthenticated = false;
            identity.User = new _UserModel();
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


