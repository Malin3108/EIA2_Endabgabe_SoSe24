namespace Eisdiele {
    export class Sauce extends Food {
        constructor(_x: number, _y: number, _color: string) {
            super(_x, _y, _color);
        }

        draw(): void {
            crc2.fillStyle = this.color;

            crc2.beginPath();
            crc2.moveTo(this.x, this.y); // Startpunkt der Sauce
            crc2.bezierCurveTo(this.x + 0, this.y + 10, this.x + 10, this.y - 10, this.x + 30, this.y); // Erster Wellenbogen
            crc2.bezierCurveTo(this.x + 40, this.y - 10, this.x + 50, this.y - 10, this.x + 60, this.y); // Zweiter Wellenbogen
            crc2.bezierCurveTo(this.x + 70, this.y + 10, this.x + 80, this.y + 10, this.x + 90, this.y); // Dritter Wellenbogen
            crc2.lineTo(this.x + 90, this.y + 20); // Linie nach unten, um den Tropfen zu erzeugen
            crc2.bezierCurveTo(this.x + 70, this.y + 40, this.x + 50, this.y + 40, this.x + 30, this.y + 20); // Tropfenform
            crc2.lineTo(this.x, this.y + 20); // Zurück zum Startpunkt
            crc2.closePath();
            crc2.fill();
        }
    }
}
