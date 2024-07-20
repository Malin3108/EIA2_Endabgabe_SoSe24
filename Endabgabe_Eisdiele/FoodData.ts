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
            { name: 'Vanille', price: 1.5 },
            { name: 'Schokolade', price: 1.5 },
            { name: 'Erdbeere', price : 1.5 }
        ],
        toppings: [
            { name: 'Kokosstreusel', price: 0.5 },
            { name: 'Schokostreusel', price: 0.5 }
        ],
        saucen: [
            { name: 'Schokoladensauce', price: 1.0 },
            { name: 'Erdbeersauce', price: 1.0 }
        ]
    }

}
