var Gutschein = (function () {
    function Gutschein(parameters) {
        this.ImageUrlSmall = null; //"http://www.gausmann-media.de/kunden/GutscheinApp/demogutschein.jpg";
        this.ImageUrlBig = null; //"http://www.gausmann-media.de/kunden/GutscheinApp/demogutschein.jpg";
        this.Title = ""; // 50 Zeichen
        this.Owner = "Qube-Media Gutschein"; // 30 Zeichen
        this.Description = ""; //"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e"; // 500 Zeichen
        this.AllwaysVaild = true;
        this.UseTimes = 1; // Einmal benutzbar.
        this.PostMessage = "Ich habe den Gutschein benutzt.";
        this.isDeleted = null; // null oder moment().toISOString();
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