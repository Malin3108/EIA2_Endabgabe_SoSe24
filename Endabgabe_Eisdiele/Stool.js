"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Stool {
        x;
        y;
        color;
        constructor(_x, _y, _color) {
            this.x = _x;
            this.y = _y;
            this.color = _color;
        }
        draw() {
            Eisdiele.crc2.save();
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.translate(this.x, this.y);
            Eisdiele.crc2.scale(0.5, 0.5);
            Eisdiele.crc2.fillStyle = this.color;
            Eisdiele.crc2.arc(55, 10, 70, 0, 2 * Math.PI);
            Eisdiele.crc2.fill();
            Eisdiele.crc2.closePath();
            Eisdiele.crc2.restore();
        }
    }
    Eisdiele.Stool = Stool;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Stool.js.map