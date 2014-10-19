
var Gutschein = (function () {
    function Gutschein(parameters) {
        this.ImageUrlSmall = null;
        this.ImageUrlBig = null;
        this.Title = "";
        this.Owner = "Qube-Media Gutschein";
        this.Description = "";
        this.AllwaysVaild = true;
        this.UseTimes = 1;
        this.PostMessage = "Ich habe den Gutschein benutzt.";
        this.isDeleted = null;
        this.CreateDate = moment().toISOString();
        this.Id = parameters.Id;

        this.ImageUrlSmall = parameters.ImageUrlSmall ? parameters.ImageUrlSmall : this.ImageUrlSmall;
        this.ImageUrlBig = parameters.ImageUrlBig ? parameters.ImageUrlBig : this.ImageUrlBig;

        this.Title = parameters.Title ? parameters.Title : this.Title;
        this.Owner = parameters.Owner ? parameters.Owner : this.Owner;
        this.Description = parameters.Description ? parameters.Description : this.Description;

        if (typeof parameters.ValidUntil != "undefined") {
            this.ValidUntil = parameters.ValidUntil; //moment().add(5 * (this.Id), 'minutes').toISOString();
            this.AllwaysVaild = false;
        }

        if (typeof parameters.AllwaysVaild != "undefined")
            this.AllwaysVaild = parameters.AllwaysVaild;

        this.UseTimes = parameters.UseTimes ? parameters.UseTimes : this.UseTimes;

        this.PostMessage = parameters.PostMessage ? parameters.PostMessage : this.PostMessage;

        if (typeof parameters.isDeleted != "undefined")
            this.isDeleted = parameters.isDeleted;

        this.CreateDate = moment().toISOString();
    }
    return Gutschein;
})();
//# sourceMappingURL=Gutschein.js.map
