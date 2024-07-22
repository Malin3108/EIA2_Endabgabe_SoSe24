namespace Eisdiele {

    export interface Item{
        eissorte : string;
        toppings: string;
        saucen: string;
        price: number;
    }
    
    export interface Data{
        [category: string]: Item[];
    }

    export let data = {
        eissorten: [
            { name: 'Vanille', price: 1.0 },
            { name: 'Schokolade', price: 1.0 },
            { name: 'Erdbeere', price : 1.0 }
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
    }

    export let iceCreamColors: { [key: string]: string } = {
        'Vanille': 'yellow',
        'Schokolade': 'darkbrown',
        'Erdbeere': 'red'
    };

    export let toppingColors: { [key: string]: string } = {
        'Kokosstreusel': 'white',
        'Schokostreusel': 'black'
    };

    export let sauceColors: { [key: string]: string } = {
        'Schokoladensauce': 'brown',
        'Erdbeersauce': 'red'
    };
}
