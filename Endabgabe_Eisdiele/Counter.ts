namespace Eisdiele {
    export class Counter {
        public x: number;
        public y: number;
        public color: string


        constructor(_x: number, _y: number, _color: string) {
            this.x = _x;
            this.y = _y;
            this.color = _color

        }

        public draw(): void {
            crc2.fillStyle = this.color ;
            crc2.fillRect(this.x, this.y, 950, 250);

        }


    }

}