namespace Eisdiele {
    export class Topping extends Food {
        public count: number;
        public streuselPositions: { x: number, y: number, width: number, height: number }[];

        constructor(_x: number, _y: number, _count: number, _color: string) {
            super(_x, _y, _color);
            this.count = _count;
            this.streuselPositions = this.generateStreuselPositions();
        }

        private generateStreuselPositions() {
            let positions = [];
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

        public draw(): void {
            crc2.save();
            crc2.translate(this.x, this.y);
            // crc2.scale(0.5, 0.5); // Skalierung ist derzeit deaktiviert
            crc2.fillStyle = this.color;
            for (let pos of this.streuselPositions) {
                crc2.fillRect(pos.x, pos.y, pos.width, pos.height);
            }
            crc2.restore();
        }
    }
}
