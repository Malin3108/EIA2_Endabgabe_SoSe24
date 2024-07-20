namespace Eisdiele {
    export class Counter {
        x: number;
        y: number;
        color: string


        constructor(_x: number, _y: number, _color: string) {
            this.x = _x;
            this.y = _y;
            this.color = _color

        }

        draw(): void {
            crc2.fillStyle = this.color ;
            crc2.fillRect(this.x, this.y, 950, 250);

        }


    }

}