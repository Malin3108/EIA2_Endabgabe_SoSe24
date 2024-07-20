"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Counter {
        x;
        y;
        color;
        constructor(_x, _y, _color) {
            this.x = _x;
            this.y = _y;
            this.color = _color;
        }
        draw() {
            Eisdiele.crc2.fillStyle = this.color;
            Eisdiele.crc2.fillRect(this.x, this.y, 950, 250);
        }
    }
    Eisdiele.Counter = Counter;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Counter.js.map