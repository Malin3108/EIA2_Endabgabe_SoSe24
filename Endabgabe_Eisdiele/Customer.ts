namespace Eisdiele {
    export class Customer {
        public x: number;
        public y: number;
        public color: string;
        public mood: "happy" | "sad";
        public state: "waiting" | "coming" | "ordering" | "paying" | "leaving";
        public targetPositionX?: number;
        public targetPositionY?: number;
        private lastStateChangeTime: number;
        private readonly moodChangeDelay: number = 30000; // 30 Sekunden
        public order: string;
        public table: Table | null = null;

        constructor(_x: number, _y: number, _color: string, _mood: "happy" | "sad", _state: "waiting" | "coming" | "ordering" | "paying" | "leaving") {
            this.x = _x;
            this.y = _y;
            this.color = _color;
            this.mood = _mood;
            this.state = _state;
            this.lastStateChangeTime = Date.now();
            this.order = "";
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.scale(0.5, 0.5);

            // Gesicht zeichnen
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.arc(55, 10, 90, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

            // Linkes Auge zeichnen
            crc2.beginPath();
            crc2.fillStyle = 'black';
            crc2.arc(30, -20, 10, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge zeichnen
            crc2.beginPath();
            crc2.fillStyle = 'black';
            crc2.arc(80, -20, 10, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

            // Mund basierend auf Stimmung zeichnen
            crc2.beginPath();
            crc2.strokeStyle = 'black';
            crc2.lineWidth = 5;
            if (this.mood === "happy") {
                crc2.arc(55, 20, 50, 0, Math.PI, false); // Glücklicher Mund
            } else {
                crc2.arc(55, 70, 50, 0, Math.PI, true); // Trauriger Mund
            }
            crc2.stroke();
            crc2.closePath();

            crc2.restore();

            // Bestellung zeichnen, wenn der Kunde bestellt
            if (this.state === "ordering") {
                crc2.save();
                crc2.translate(this.x, this.y);
                crc2.fillStyle = "black";
                crc2.font = "20px Arial";
                crc2.fillText(this.order, 120, -60); // Position der Bestelltext neben dem Kunden
                crc2.restore();
            }
        }

        move(): void {
            if (this.state === "coming" && this.targetPositionX !== undefined && this.targetPositionY !== undefined) {
                let dx = this.targetPositionX - this.x;
                let dy = this.targetPositionY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 1) {
                    this.x += dx / distance * 3;
                    this.y += dy / distance * 3;
                } else {
                    this.setState("ordering"); // Zustand auf "ordering" setzen
                }
            } else if (this.state === "leaving") {
                this.x += 5; // Kunde nach rechts bewegen
                if (this.x > crc2.canvas.width) {
                    this.setState("waiting"); // Kunde wieder in den Wartezustand versetzen, wenn er das Canvas verlässt
                }
            }

            this.updateMood(); // Stimmung basierend auf Inaktivität aktualisieren
            this.draw(); // Kunde zeichnen
        }

        private updateMood(): void {
            const currentTime = Date.now();
            if (this.state === "waiting") {
                if (currentTime - this.lastStateChangeTime > this.moodChangeDelay) {
                    this.mood = "sad";
                }
            } else {
                this.mood = "happy"; // Wenn nicht in den Zuständen, die das Setzen von "sad" auslösen
            }
        }

        public setState(newState: "waiting" | "coming" | "ordering" | "paying" | "leaving"): void {
            this.state = newState;
            this.lastStateChangeTime = Date.now(); // Zeitstempel zurücksetzen
            console.log(`Customer state changed to ${newState}`); // Debugging output
            if (newState === "ordering") {
                this.mood = "happy"; // Stimmung auf glücklich setzen
                this.order = this.generateRandomOrder(); // Neue zufällige Bestellung zuweisen
                Eisdiele.displayCustomerOrder(this.order); // Bestellung anzeigen
                console.log(`Order generated: ${this.order}`); // Debugging output
            }
        }

        private generateRandomOrder(): string {
            const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);

            const randomEissorte = data.eissorten[randomIndex(data.eissorten)].name;
            const randomMenge = Math.floor(Math.random() * 5) + 1;
            const randomTopping = data.toppings[randomIndex(data.toppings)].name;
            const randomSauce = data.saucen[randomIndex(data.saucen)].name;

            return `Order:\n${randomMenge}x ${randomEissorte}\n${randomTopping}\n${randomSauce}`;
        }
    }
}