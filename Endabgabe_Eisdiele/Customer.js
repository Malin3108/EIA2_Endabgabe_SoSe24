"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Customer {
        x;
        y;
        color;
        mood;
        state;
        targetPositionX;
        targetPositionY;
        lastStateChangeTime;
        moodChangeDelay = 30000; // 30 Sekunden
        order;
        table = null;
        constructor(_x, _y, _color, _mood, _state) {
            this.x = _x;
            this.y = _y;
            this.color = _color;
            this.mood = _mood;
            this.state = _state;
            this.lastStateChangeTime = Date.now();
            this.order = "";
        }
        draw() {
            Eisdiele.crc2.save();
            Eisdiele.crc2.translate(this.x, this.y);
            Eisdiele.crc2.scale(0.5, 0.5);
            // Gesicht zeichnen
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.fillStyle = this.color;
            Eisdiele.crc2.arc(55, 10, 90, 0, 2 * Math.PI);
            Eisdiele.crc2.fill();
            Eisdiele.crc2.closePath();
            // Linkes Auge zeichnen
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.fillStyle = 'black';
            Eisdiele.crc2.arc(30, -20, 10, 0, 2 * Math.PI);
            Eisdiele.crc2.fill();
            Eisdiele.crc2.closePath();
            // Rechtes Auge zeichnen
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.fillStyle = 'black';
            Eisdiele.crc2.arc(80, -20, 10, 0, 2 * Math.PI);
            Eisdiele.crc2.fill();
            Eisdiele.crc2.closePath();
            // Mund basierend auf Stimmung zeichnen
            Eisdiele.crc2.beginPath();
            Eisdiele.crc2.strokeStyle = 'black';
            Eisdiele.crc2.lineWidth = 5;
            if (this.mood === "happy") {
                Eisdiele.crc2.arc(55, 20, 50, 0, Math.PI, false); // Glücklicher Mund
            }
            else {
                Eisdiele.crc2.arc(55, 70, 50, 0, Math.PI, true); // Trauriger Mund
            }
            Eisdiele.crc2.stroke();
            Eisdiele.crc2.closePath();
            Eisdiele.crc2.restore();
            // Bestellung zeichnen, wenn der Kunde bestellt
            if (this.state === "ordering") {
                Eisdiele.crc2.save();
                Eisdiele.crc2.translate(this.x, this.y);
                Eisdiele.crc2.fillStyle = "black";
                Eisdiele.crc2.font = "20px Arial";
                Eisdiele.crc2.fillText(this.order, 120, -60); // Position der Bestelltext neben dem Kunden
                Eisdiele.crc2.restore();
            }
        }
        move() {
            if (this.state === "coming" && this.targetPositionX !== undefined && this.targetPositionY !== undefined) {
                let dx = this.targetPositionX - this.x;
                let dy = this.targetPositionY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    this.x += dx / distance * 3;
                    this.y += dy / distance * 3;
                }
                else {
                    this.setState("ordering"); // Zustand auf "ordering" setzen
                }
            }
            else if (this.state === "leaving") {
                this.x += 5; // Kunde nach rechts bewegen
                if (this.x > Eisdiele.crc2.canvas.width) {
                    this.setState("waiting"); // Kunde wieder in den Wartezustand versetzen, wenn er das Canvas verlässt
                }
            }
            this.updateMood(); // Stimmung basierend auf Inaktivität aktualisieren
            this.draw(); // Kunde zeichnen
        }
        updateMood() {
            const currentTime = Date.now();
            if (this.state !== "waiting" && currentTime - this.lastStateChangeTime > this.moodChangeDelay) {
                this.mood = "sad";
            }
            if (this.state !== "ordering" && currentTime - this.lastStateChangeTime > this.moodChangeDelay) {
                this.mood = "sad";
            }
            if (this.state !== "paying" && currentTime - this.lastStateChangeTime > this.moodChangeDelay) {
                this.mood = "sad";
            }
        }
        setState(newState) {
            this.state = newState;
            this.lastStateChangeTime = Date.now(); // Zeitstempel zurücksetzen
            if (newState === "ordering") {
                this.mood = "happy"; // Stimmung auf glücklich setzen
                this.order = this.generateRandomOrder(); // Neue zufällige Bestellung zuweisen
                Eisdiele.displayCustomerOrder(this.order); // Bestellung anzeigen
            }
            if (newState === "paying") {
                this.mood = "happy"; // Stimmung auf glücklich setzen
            }
            if (newState === "leaving") {
                this.mood = "happy"; // Stimmung auf glücklich setzen
            }
        }
        generateRandomOrder() {
            const randomIndex = (arr) => Math.floor(Math.random() * arr.length);
            const randomEissorte = Eisdiele.data.eissorten[randomIndex(Eisdiele.data.eissorten)].name;
            const randomMenge = Math.floor(Math.random() * 5) + 1;
            const randomTopping = Eisdiele.data.toppings[randomIndex(Eisdiele.data.toppings)].name;
            const randomSauce = Eisdiele.data.saucen[randomIndex(Eisdiele.data.saucen)].name;
            return `Order:\n${randomMenge}x ${randomEissorte}\n${randomTopping}\n${randomSauce}`;
        }
    }
    Eisdiele.Customer = Customer;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Customer.js.map