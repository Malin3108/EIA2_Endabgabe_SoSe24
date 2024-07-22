namespace Eisdiele {
    export class Table {
        public x: number;
        public y: number;
        public color: string
        public state: "free" | "occupied" = "free";
        

        constructor(_x: number, _y: number, _color: string,) {
            this.x = _x;
            this.y = _y;
            this.color = _color
           
            
        }

        public draw(): void {
            crc2.fillStyle = this.color ;
            crc2.fillRect(this.x , this.y , 200, 100);
        }


    }

}