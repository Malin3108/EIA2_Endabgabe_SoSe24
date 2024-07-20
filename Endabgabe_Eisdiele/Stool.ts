namespace Eisdiele {
    export class Stool {
        x: number;
        y: number;
        color: string
        
        

        constructor(_x: number, _y: number, _color: string) {
            this.x = _x;
            this.y = _y;
            this.color = _color
            
        }

        draw(): void{
            crc2.save();
            crc2.beginPath();
            crc2.translate(this.x, this.y);
            crc2.scale(0.5, 0.5);

            crc2.fillStyle = this.color;
            crc2.arc(55, 10, 70, 0, 2* Math.PI);
            crc2.fill();

            
            crc2.closePath();
            crc2.restore();
            
        }


    }

}