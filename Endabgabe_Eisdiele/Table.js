"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Table {
        x;
        y;
        color;
        state = "free";
        constructor(_x, _y, _color) {
            this.x = _x;
            this.y = _y;
            this.color = _color;
        }
        draw() {
            Eisdiele.crc2.fillStyle = this.color;
            Eisdiele.crc2.fillRect(this.x, this.y, 200, 100);
        }
    }
    Eisdiele.Table = Table;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Table.js.map