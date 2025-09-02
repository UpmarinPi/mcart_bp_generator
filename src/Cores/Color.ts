export class RGBColor {
    r: number = -1;
    g: number = -1;
    b: number = -1;

    constructor(r: number = -1, g: number = -1, b: number = -1) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public ToString(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}