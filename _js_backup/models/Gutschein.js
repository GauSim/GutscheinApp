/**
 * Created by Simon on 04.10.14.
 */



function Gutschein(id, title) {

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

    this.isDeleted = null // moment() Gutschein bereits entwertet?
    this.CreateDate = moment().toISOString();
}
