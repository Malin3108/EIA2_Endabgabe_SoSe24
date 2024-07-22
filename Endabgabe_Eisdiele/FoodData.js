"use strict";
var Eisdiele;
(function (Eisdiele) {
    Eisdiele.data = {
        eissorten: [
            { name: 'Vanille', price: 1.0 },
            { name: 'Schokolade', price: 1.0 },
            { name: 'Erdbeere', price: 1.0 }
        ],
        toppings: [
            { name: 'Kokosstreusel', price: 0.2 },
            { name: 'Schokostreusel', price: 0.2 }
        ],
        saucen: [
            { name: 'Schokoladensauce', price: 0.3 },
            { name: 'Erdbeersauce', price: 0.3 }
        ],
        iceCreamPricePerScoop: 1
    };
    Eisdiele.iceCreamColors = {
        'Vanille': 'yellow',
        'Schokolade': 'darkbrown',
        'Erdbeere': 'red'
    };
    Eisdiele.toppingColors = {
        'Kokosstreusel': 'white',
        'Schokostreusel': 'black'
    };
    Eisdiele.sauceColors = {
        'Schokoladensauce': 'brown',
        'Erdbeersauce': 'red'
    };
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=FoodData.js.map