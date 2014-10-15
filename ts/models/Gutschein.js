
var Gutschein = (function () {
    function Gutschein(parameters) {
        this.ImageUrlSmall = "http://placehold.it/250x250";
        this.ImageUrlBig = "http://placehold.it/250x250";
        this.Title = "Lorem ipsum dolor sit amet, consetetur sadipscing ";
        this.Owner = "Cube Media Gutschein";
        this.Description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e";
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

function Gutschein2(parameters) {
    var id = parameters.id;
    var title = parameters.title;

    this.Id = id;

    this.ImageUrlSmall = "http://placehold.it/200x200"; // 150x80px
    this.ImageUrlBig = "http://placehold.it/250x250"; // 250x250px

    this.Title = title; // 50 Zeichen
    this.Owner = "GausmannMedia"; // 30 Zeichen
    this.Description = ""; // 500 Zeichen

    this.ValidUntil = moment().add(5 * (id), 'minutes').toISOString(); // "2014-09-08T08:02:17-05:00" (ISO 8601)

    this.AllwaysVaild = false;
    this.UseTimes = 1; // Einmal benutzbar.

    this.PostMessage = "Ich habe den Gutschein benutzt.";

    this.isDeleted = null;
    this.CreateDate = moment().toISOString();
}
//# sourceMappingURL=Gutschein.js.map
