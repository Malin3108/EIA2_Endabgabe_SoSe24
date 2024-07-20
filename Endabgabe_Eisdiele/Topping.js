"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Topping extends Eisdiele.Food {
        count;
        streuselPositions;
        constructor(_x, _y, _count, _color) {
            super(_x, _y, _color);
            this.count = _count;
            this.streuselPositions = this.generateStreuselPositions();
        }
        generateStreuselPositions() {
            const positions = [];
            for (let i = 0; i < this.count; i++) {
                // Vergrößere den Bereich, in dem die Streusel generiert werden
                const offsetX = Math.random() * 80 - 40; // Bisher: Math.random() * 40 - 20;
                const offsetY = Math.random() * 30 - 15; // Bisher: Math.random() * 15 - 7.5;
                const width = Math.random() * 2 + 2;
                const height = Math.random() * 10 + 1;
                positions.push({ x: offsetX, y: offsetY, width, height });
            }
            return positions;
        }
        draw() {
            Eisdiele.crc2.save();
            Eisdiele.crc2.translate(this.x, this.y);
            // crc2.scale(0.5, 0.5); // Skalierung ist derzeit deaktiviert
            Eisdiele.crc2.fillStyle = this.color;
            for (let pos of this.streuselPositions) {
                Eisdiele.crc2.fillRect(pos.x, pos.y, pos.width, pos.height);
            }
            Eisdiele.crc2.restore();
        }
    }
    Eisdiele.Topping = Topping;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Topping.js.map