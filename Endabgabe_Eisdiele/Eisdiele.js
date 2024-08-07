"use strict";
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerdown", tableClicked);
    Eisdiele.customers = [];
    Eisdiele.customerRadius = 90 * 0.5;
    Eisdiele.tables = [];
    Eisdiele.foods = [];
    document.addEventListener("DOMContentLoaded", function () {
        populateSelectOptions();
        let orderButton = document.querySelector("button");
        if (orderButton) {
            orderButton.addEventListener("click", calculatePriceAndAddOrder);
        }
        // Create an element to display the order
        let controlPanel = document.querySelector(".control-panel");
        if (controlPanel) {
            let orderDisplayElement = document.createElement("div");
            orderDisplayElement.id = "orderDisplay";
            controlPanel.appendChild(orderDisplayElement);
        }
    });
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdiele.crc2 = canvas.getContext("2d");
        // Tische initialisieren
        Eisdiele.tables.push(new Eisdiele.Table(200, 200, "lightblue"));
        Eisdiele.tables.push(new Eisdiele.Table(900, 200, "lightblue"));
        setInterval(createCustomer, 10000);
        animate();
    }
    function animate() {
        drawBackground();
        for (let i = 0; i < Eisdiele.customers.length; i++) {
            Eisdiele.customers[i].move();
            Eisdiele.customers[i].draw();
        }
        Eisdiele.foods.forEach(food => food.draw());
        checkCustomerState();
        requestAnimationFrame(animate);
    }
    function createCustomer() {
        let minX = 10;
        let maxX = 600;
        let minY = 400;
        let maxY = 850;
        let x = 10;
        let y = 50;
        let validPosition = false;
        while (!validPosition) {
            x = Math.random() * (maxX - minX) + minX;
            y = Math.random() * (maxY - minY) + minY;
            validPosition = true;
            for (let customer of Eisdiele.customers) {
                const distance = Math.sqrt((x - customer.x) ** 2 + (y - customer.y) ** 2);
                if (distance < Eisdiele.customerRadius * 2) {
                    validPosition = false;
                    break;
                }
            }
        }
        let color = "yellow";
        let customer = new Eisdiele.Customer(x, y, color, "happy", "waiting");
        Eisdiele.customers.push(customer);
    }
    function drawBackground() {
        Eisdiele.crc2.fillStyle = "beige";
        Eisdiele.crc2.fillRect(0, 0, Eisdiele.crc2.canvas.width, Eisdiele.crc2.canvas.height);
        drawCounter();
        drawTables();
        drawStools();
    }
    function drawCounter() {
        let counter = new Eisdiele.Counter(800, 500, "darkblue");
        counter.draw();
    }
    function drawTables() {
        for (let table of Eisdiele.tables) {
            table.draw();
        }
    }
    function drawStools() {
        let stoolPositions = [
            { x: 1150, y: 240 },
            { x: 100, y: 240 },
            { x: 800, y: 240 },
            { x: 450, y: 240 }
        ];
        stoolPositions.forEach(pos => new Eisdiele.Stool(pos.x, pos.y, "lightblue").draw());
    }
    function tableClicked(event) {
        let clickX = event.clientX;
        let clickY = event.clientY;
        for (let table of Eisdiele.tables) {
            if (table.state === "free" && clickX >= table.x && clickX <= table.x + 200 && clickY >= table.y && clickY <= table.y + 100) {
                for (let customer of Eisdiele.customers) {
                    if (customer.state === "waiting") {
                        displayCustomerOrder(customer.order);
                        customer.state = "coming";
                        customer.targetPositionX = table.x;
                        customer.targetPositionY = table.y;
                        customer.table = table; // Speichern Sie den Bezug zum Tisch im Kundenobjekt
                        table.state = "occupied";
                        break;
                    }
                }
                break;
            }
        }
    }
    function checkCustomerState() {
        for (let customer of Eisdiele.customers) {
            if (customer.state === "leaving" && customer.table) {
                customer.table.state = "free"; // Setzen Sie den Zustand des Tisches wieder auf "free"
                customer.table = null; // Entfernen Sie den Bezug zum Tisch aus dem Kundenobjekt
            }
        }
    }
    function displayCustomerOrder(order) {
        let orderDisplayElement = document.getElementById("orderDisplay");
        if (orderDisplayElement) {
            orderDisplayElement.textContent = order;
        }
    }
    Eisdiele.displayCustomerOrder = displayCustomerOrder;
    function populateSelectOptions() {
        let selectElements = {
            eissorten: document.getElementById("eissorten"),
            menge: document.getElementById("menge"),
            toppings: document.getElementById("toppings"),
            saucen: document.getElementById("saucen")
        };
        populateOptions(selectElements.eissorten, Eisdiele.data.eissorten.map(item => item.name));
        populateOptions(selectElements.menge, Array.from({ length: 5 }, (_, i) => (i + 1).toString()));
        populateOptions(selectElements.toppings, Eisdiele.data.toppings.map(item => item.name));
        populateOptions(selectElements.saucen, Eisdiele.data.saucen.map(item => item.name));
    }
    function populateOptions(selectElement, options) {
        options.forEach(optionText => {
            let option = document.createElement("option");
            option.text = optionText;
            option.value = optionText;
            selectElement.add(option);
        });
    }
    function calculatePriceAndAddOrder() {
        let eissortenSelect = document.getElementById("eissorten");
        let mengeSelect = document.getElementById("menge");
        let toppingsSelect = document.getElementById("toppings");
        let saucenSelect = document.getElementById("saucen");
        let selectedEissorte = eissortenSelect.value;
        let selectedMenge = parseInt(mengeSelect.value);
        let selectedTopping = toppingsSelect.value;
        let selectedSauce = saucenSelect.value;
        let total = 0;
        // Preis der Eissorte (einheitlich)
        for (let eissorte of Eisdiele.data.eissorten) {
            if (eissorte.name === selectedEissorte) {
                total += eissorte.price;
                break;
            }
        }
        // Preis pro Kugel
        total += Eisdiele.data.iceCreamPricePerScoop * selectedMenge;
        // Preis des ausgewählten Toppings
        for (let topping of Eisdiele.data.toppings) {
            if (topping.name === selectedTopping) {
                total += topping.price;
                break;
            }
        }
        // Preis der ausgewählten Sauce
        for (let sauce of Eisdiele.data.saucen) {
            if (sauce.name === selectedSauce) {
                total += sauce.price;
                break;
            }
        }
        let einnahmenElement = document.getElementById("einnahmen");
        let currentEinnahmen = parseFloat(einnahmenElement.textContent || "0"); // Default to 0 if empty
        einnahmenElement.textContent = (currentEinnahmen + total).toFixed(2);
        // Find the first customer with the "ordering" state
        let orderingCustomer = Eisdiele.customers.find(customer => customer.state === "ordering");
        if (orderingCustomer) {
            let iceCreamX = orderingCustomer.x;
            let iceCreamY = orderingCustomer.y;
            let iceCreamColor = Eisdiele.iceCreamColors[selectedEissorte];
            let toppingColor = Eisdiele.toppingColors[selectedTopping];
            let sauceColor = Eisdiele.sauceColors[selectedSauce];
            // Create and add the ice cream
            let icecream = new Eisdiele.Icecream(iceCreamX, iceCreamY, iceCreamColor, 'brown', selectedMenge);
            Eisdiele.foods.push(icecream);
            // Optionally create and add the topping if selected
            if (selectedTopping) {
                let topping = new Eisdiele.Topping(iceCreamX + 90, iceCreamY - (selectedMenge * 10), 20, toppingColor);
                Eisdiele.foods.push(topping);
            }
            // Optionally create and add the sauce if selected
            if (selectedSauce) {
                let sauce = new Eisdiele.Sauce(iceCreamX + 55, iceCreamY + 55 - (selectedMenge * 10) - 30, sauceColor);
                Eisdiele.foods.push(sauce);
                let currentOrder = `Order:\n${selectedMenge}x ${selectedEissorte}\n${selectedTopping}\n${selectedSauce}`;
                if (orderingCustomer.actualOrder !== currentOrder) {
                    orderingCustomer.color = 'red'; // Change color to red
                }
            }
            // Optionally, update the customer's state to "paying"
            orderingCustomer.state = "paying";
            // Create a div element to display the price
            let priceDisplayDiv = document.createElement("div");
            priceDisplayDiv.className = "price-display";
            priceDisplayDiv.textContent = `Price: $${total.toFixed(2)}`;
            // Set the position of the price display above the customer
            priceDisplayDiv.style.position = 'absolute';
            priceDisplayDiv.style.left = `${iceCreamX}px`;
            priceDisplayDiv.style.top = `${iceCreamY - 50}px`; // Adjust as needed
            // Append the price display to the body or a specific container
            document.body.appendChild(priceDisplayDiv);
            // Add event listener to remove the price display, remove the ice cream, and move the customer when clicked
            priceDisplayDiv.addEventListener('click', () => {
                // Remove the price display
                if (priceDisplayDiv.parentNode) {
                    priceDisplayDiv.parentNode.removeChild(priceDisplayDiv);
                }
                // Remove the ice cream and related items
                Eisdiele.foods = Eisdiele.foods.filter(food => {
                    if (food instanceof Eisdiele.Icecream && food.x === iceCreamX && food.y === iceCreamY) {
                        return false; // Remove this ice cream
                    }
                    if (food instanceof Eisdiele.Topping && food.x === iceCreamX + 90 && food.y === iceCreamY - (selectedMenge * 10)) {
                        return false; // Remove this topping
                    }
                    if (food instanceof Eisdiele.Sauce && food.x === iceCreamX + 55 && food.y === iceCreamY + 55 - (selectedMenge * 10) - 30) {
                        return false; // Remove this sauce
                    }
                    return true;
                });
                // Move the customer to the right out of the canvas
                orderingCustomer.state = "leaving";
                let interval = setInterval(() => {
                    orderingCustomer.x += 5; // Move customer to the right
                    if (orderingCustomer.x > Eisdiele.crc2.canvas.width) {
                        // Remove customer from the array when they move out of the canvas
                        Eisdiele.customers = Eisdiele.customers.filter(c => c !== orderingCustomer);
                        clearInterval(interval);
                    }
                }, 20);
            });
        }
        else {
            console.log("No ordering customer found.");
        }
    }
    Eisdiele.calculatePriceAndAddOrder = calculatePriceAndAddOrder;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Eisdiele.js.map