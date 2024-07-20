"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Sauce extends Eisdiele.Food {
        constructor(_x, _y, _color) {
            super(_x, _y, _color);
        }
        draw() {
            Eisdiele.crc2.fillStyle = this.color;
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.moveTo(this.x, this.y); // Startpunkt der Sauce
            Eisdiele.crc2.bezierCurveTo(this.x + 0, this.y + 10, this.x + 10, this.y - 10, this.x + 30, this.y); // Erster Wellenbogen
            Eisdiele.crc2.bezierCurveTo(this.x + 40, this.y - 10, this.x + 50, this.y - 10, this.x + 60, this.y); // Zweiter Wellenbogen
            Eisdiele.crc2.bezierCurveTo(this.x + 70, this.y + 10, this.x + 80, this.y + 10, this.x + 90, this.y); // Dritter Wellenbogen
            Eisdiele.crc2.lineTo(this.x + 90, this.y + 20); // Linie nach unten, um den Tropfen zu erzeugen
            Eisdiele.crc2.bezierCurveTo(this.x + 70, this.y + 40, this.x + 50, this.y + 40, this.x + 30, this.y + 20); // Tropfenform
            Eisdiele.crc2.lineTo(this.x, this.y + 20); // Zurück zum Startpunkt
            Eisdiele.crc2.closePath();
            Eisdiele.crc2.fill();
        }
    }
    Eisdiele.Sauce = Sauce;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Sauce.js.map