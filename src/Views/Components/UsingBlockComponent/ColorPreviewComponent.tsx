import {ComponentBase} from "../ComponentBase";
import React from "react";
import {RGBColor} from "../../../Cores/Color";

export class ColorPreviewComponent extends ComponentBase {
    color: RGBColor;
    width: number = 50;
    height: number = 50;
    constructor(id: string, color: RGBColor) {
        super(id);
        this.color = color;
    }

    Render(): React.JSX.Element {
        return (
            <div className={this.id}
                 style={{
                     background: this.color.ToString(),
                     width: this.width,
                     height: this.height,
                 }}>

            </div>
        );
    }
}