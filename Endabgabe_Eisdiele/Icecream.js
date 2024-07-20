"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Icecream extends Eisdiele.Food {
        waffleColor;
        scoops;
        constructor(_x, _y, _color, _waffleColor, _scoops) {
            super(_x, _y, _color);
            this.waffleColor = _waffleColor;
            this.scoops = _scoops;
        }
        draw() {
            Eisdiele.crc2.save();
            Eisdiele.crc2.translate(this.x, this.y);
            Eisdiele.crc2.scale(0.5, 0.5);
            // Zeichne die Waffel
            Eisdiele.crc2.fillStyle = this.waffleColor;
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.moveTo(100, 50); // Linke Ecke oben
            Eisdiele.crc2.lineTo(300, 50); // Rechte Ecke oben
            Eisdiele.crc2.lineTo(200, 290); // Untere Spitze
            Eisdiele.crc2.closePath();
            Eisdiele.crc2.fill();
            // Zeichne die Eiskugeln
            for (let i = 0; i < this.scoops; i++) {
                Eisdiele.crc2.fillStyle = this.color;
                Eisdiele.crc2.beginPath();
                Eisdiele.crc2.arc(200, 0 - i * 80, 70, 0, 2 * Math.PI);
                Eisdiele.crc2.fill();
            }
            Eisdiele.crc2.restore();
        }
    }
    Eisdiele.Icecream = Icecream;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Icecream.js.map