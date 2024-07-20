namespace Eisdiele {
    export abstract class Food {
        public x: number;
        public y: number;
        public color: string;

        constructor(_x: number, _y: number, _color: string) {
            this.x = _x;
            this.y = _y;
            this.color = _color;
        }
        
        abstract draw(): void;
    }
}