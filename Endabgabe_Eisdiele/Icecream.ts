namespace Eisdiele {
    export class Icecream extends Food {
        waffleColor: string;
        scoops: number;

        constructor(_x: number, _y: number, _color: string, _waffleColor: string, _scoops: number) {
            super(_x, _y, _color);
            this.waffleColor = _waffleColor;
            this.scoops = _scoops;
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.scale(0.5, 0.5);

            // Zeichne die Waffel
            crc2.fillStyle = this.waffleColor;
            crc2.beginPath();
            crc2.moveTo(100, 50); // Linke Ecke oben
            crc2.lineTo(300, 50); // Rechte Ecke oben
            crc2.lineTo(200, 290); // Untere Spitze
            crc2.closePath();
            crc2.fill();

            // Zeichne die Eiskugeln
            for (let i = 0; i < this.scoops; i++) {
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.arc(200, 0 - i * 80, 70, 0, 2 * Math.PI);
                crc2.fill();
            }

            crc2.restore();
        }

        
    }
}

