/**
 * Created by Simon on 19.10.14.
 */


class UserModel {

    Role:string;
    Email:string;
    Firstname:string;
    Lastname:string;
    FacebookId:string;
    FacebookToken:string;
    GoogleId:string;


    constructor() {
        var self = this;
        self.Role = null;

        self.Email = null;
        self.Firstname = null;
        self.Lastname = null;

        self.FacebookId = null;
        self.FacebookToken = null;

        self.GoogleId = null;
    }
}