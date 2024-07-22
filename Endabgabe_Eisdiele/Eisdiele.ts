namespace Eisdiele {
    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerdown", tableClicked);

    export let crc2: CanvasRenderingContext2D;
    export let customers: Customer[] = [];
    export let customerRadius = 90 * 0.5;
    export let tables: Table[] = [];
    export let foods: Food[] = [];

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


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        // Tische initialisieren
        tables.push(new Table(200, 200, "lightblue"));
        tables.push(new Table(900, 200, "lightblue"));


        setInterval(createCustomer, 10000);

        animate();

    }

    function animate(): void {
        drawBackground();
        for (let i: number = 0; i < customers.length; i++) {
            customers[i].move();
            customers[i].draw();
        }
        foods.forEach(food => food.draw());
        checkCustomerState(); 

        requestAnimationFrame(animate);
    }
    function createCustomer(): void {
        let minX = 10;
        let maxX = 600;
        let minY = 400;
        let maxY = 850;

        let x: number = 10;
        let y: number = 50;
        let validPosition = false;

        while (!validPosition) {
            x = Math.random() * (maxX - minX) + minX;
            y = Math.random() * (maxY - minY) + minY;

            validPosition = true;
            for (let customer of customers) {
                const distance = Math.sqrt((x - customer.x) ** 2 + (y - customer.y) ** 2);
                if (distance < customerRadius * 2) {
                    validPosition = false;
                    break;
                }
            }
        }
        let color = "yellow";
        let customer: Customer = new Customer(x, y, color, "happy", "waiting");
        customers.push(customer);
    }

    function drawBackground(): void {
        crc2.fillStyle = "beige";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        drawCounter();
        drawTables();
        drawStools();
    }

    function drawCounter(): void {
        let counter: Counter = new Counter(800, 500, "darkblue");
        counter.draw();
    }

    function drawTables(): void {
        for (let table of tables) {
            table.draw();
        }
    }

    function drawStools(): void {
        let stoolPositions = [
            { x: 1150, y: 240 },
            { x: 100, y: 240 },
            { x: 800, y: 240 },
            { x: 450, y: 240 }
        ];

        stoolPositions.forEach(pos => new Stool(pos.x, pos.y, "lightblue").draw());
    }

    function tableClicked(event: PointerEvent): void {
        let clickX = event.clientX;
        let clickY = event.clientY;
    
        for (let table of tables) {
            if (table.state === "free" && clickX >= table.x && clickX <= table.x + 200 && clickY >= table.y && clickY <= table.y + 100) {
                for (let customer of customers) {
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

    function checkCustomerState(): void {
        for (let customer of customers) {
            if (customer.state === "leaving" && customer.table) {
                customer.table.state = "free"; // Setzen Sie den Zustand des Tisches wieder auf "free"
                customer.table = null; // Entfernen Sie den Bezug zum Tisch aus dem Kundenobjekt
            }
        }
    }

    export function displayCustomerOrder(order: string): void {
        let orderDisplayElement = document.getElementById("orderDisplay");
        if (orderDisplayElement) {
            orderDisplayElement.textContent = order;
        }
    }

    function populateSelectOptions(): void {
        let selectElements = {
            eissorten: document.getElementById("eissorten") as HTMLSelectElement,
            menge: document.getElementById("menge") as HTMLSelectElement,
            toppings: document.getElementById("toppings") as HTMLSelectElement,
            saucen: document.getElementById("saucen") as HTMLSelectElement
        };
    
        populateOptions(selectElements.eissorten, data.eissorten.map(item => item.name));
        populateOptions(selectElements.menge, Array.from({ length: 5 }, (_, i) => (i + 1).toString()));
        populateOptions(selectElements.toppings, data.toppings.map(item => item.name));
        populateOptions(selectElements.saucen, data.saucen.map(item => item.name));
    }
    
    function populateOptions(selectElement: HTMLSelectElement, options: string[]): void {
        options.forEach(optionText => {
            let option = document.createElement("option");
            option.text = optionText;
            option.value = optionText;
            selectElement.add(option);
        });
    }

    export function calculatePriceAndAddOrder() {
        let eissortenSelect = document.getElementById("eissorten") as HTMLSelectElement;
        let mengeSelect = document.getElementById("menge") as HTMLSelectElement;
        let toppingsSelect = document.getElementById("toppings") as HTMLSelectElement;
        let saucenSelect = document.getElementById("saucen") as HTMLSelectElement;
    
        let selectedEissorte = eissortenSelect.value;
        let selectedMenge = parseInt(mengeSelect.value);
        let selectedTopping = toppingsSelect.value;
        let selectedSauce = saucenSelect.value;
    
        let total = 0;
    
        // Preis der Eissorte (einheitlich)
        for (let eissorte of data.eissorten) {
            if (eissorte.name === selectedEissorte) {
                total += eissorte.price;
                break;
            }
        }
    
        // Preis pro Kugel
        total += data.iceCreamPricePerScoop * selectedMenge;
    
        // Preis des ausgewählten Toppings
        for (let topping of data.toppings) {
            if (topping.name === selectedTopping) {
                total += topping.price;
                break;
            }
        }
    
        // Preis der ausgewählten Sauce
        for (let sauce of data.saucen) {
            if (sauce.name === selectedSauce) {
                total += sauce.price;
                break;
            }
        }
    
        let einnahmenElement = document.getElementById("einnahmen") as HTMLSpanElement;
        let currentEinnahmen = parseFloat(einnahmenElement.textContent || "0"); // Default to 0 if empty
        einnahmenElement.textContent = (currentEinnahmen + total).toFixed(2);
    
        // Find the first customer with the "ordering" state
        let orderingCustomer = customers.find(customer => customer.state === "ordering");
    
        if (orderingCustomer) {
            let iceCreamX = orderingCustomer.x;
            let iceCreamY = orderingCustomer.y;
    
            let iceCreamColor = iceCreamColors[selectedEissorte];
            let toppingColor = toppingColors[selectedTopping];
            let sauceColor = sauceColors[selectedSauce];
    
            // Create and add the ice cream
            let icecream = new Icecream(iceCreamX, iceCreamY, iceCreamColor, 'brown', selectedMenge);
            foods.push(icecream);
    
            // Optionally create and add the topping if selected
            if (selectedTopping) {
                let topping = new Topping(iceCreamX + 90, iceCreamY - (selectedMenge * 10), 20, toppingColor);
                foods.push(topping);
            }
    
            // Optionally create and add the sauce if selected
            if (selectedSauce) {
                let sauce = new Sauce(iceCreamX + 55, iceCreamY + 55 - (selectedMenge * 10) - 30, sauceColor);
                foods.push(sauce);

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
                foods = foods.filter(food => {
                    if (food instanceof Icecream && food.x === iceCreamX && food.y === iceCreamY) {
                        return false; // Remove this ice cream
                    }
                    if (food instanceof Topping && food.x === iceCreamX + 90 && food.y === iceCreamY - (selectedMenge * 10)) {
                        return false; // Remove this topping
                    }
                    if (food instanceof Sauce && food.x === iceCreamX + 55 && food.y === iceCreamY + 55 - (selectedMenge * 10) - 30) {
                        return false; // Remove this sauce
                    }
                    return true;
                });
    
                // Move the customer to the right out of the canvas
                orderingCustomer.state = "leaving";
    
                let interval = setInterval(() => {
                    orderingCustomer.x += 5; // Move customer to the right
                    if (orderingCustomer.x > crc2.canvas.width) {
                        // Remove customer from the array when they move out of the canvas
                        customers = customers.filter(c => c !== orderingCustomer);
                        clearInterval(interval);
                    }
                }, 20);
            });
        } else {
            console.log("No ordering customer found.");
        }
    }
}
