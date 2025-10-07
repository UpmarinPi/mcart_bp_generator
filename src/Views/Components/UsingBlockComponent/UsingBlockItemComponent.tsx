import {ComponentBase} from "../ComponentBase";
import React from "react";
import {ColorPreviewComponent} from "./ColorPreviewComponent";
import {RGBColor} from "../../../Cores/Color";

export class UsingBlockItemComponent extends ComponentBase {
    colorId: string = "#000000";
    colorPreviewComponent: ColorPreviewComponent;
    constructor(id: string, colorId: string) {
        const actualId: string = `${id}${colorId}`;
        super(actualId);

        this.colorId = colorId;
        this.colorPreviewComponent = new ColorPreviewComponent(actualId, RGBColor.ColorCodeToRGB(colorId));
    }
    Render(): React.JSX.Element {
        return (
            <div className={this.id}>
                {this.colorPreviewComponent.Render()}
            </div>
        );
    }
}