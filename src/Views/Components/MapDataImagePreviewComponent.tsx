import {ComponentBase} from "./ComponentBase";
import {MCMapData} from "../../Outputs/MCMapData";
import React from "react";
import {RGBColor} from "../../Cores/Color";

export class MapDataImagePreviewComponent extends ComponentBase {
    mapData: MCMapData = new MCMapData();

    constructor(id: string) {
        super(id);

        this.onUpdateRender.Subscribe(() => {
            this.UpdateCanvas();
        })


    }

    SetMapData(data: MCMapData): void {
        this.mapData = data;
        this.onUpdateRender.notify();
    }

    UpdateCanvas() {
        const canvas = this.GetMyRender() as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        const width = this.mapData.width;
        const height = this.mapData.height;
        canvas.width = width;
        canvas.height = height;

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dataNumber = this.mapData.map[y][x];
                const index = (y * width + x) * 4;
                let color = this.mapData.mapToColor.get(index);
                if (!color) {
                    color = new RGBColor();
                }
                data[index] = color.r;      // r
                data[index + 1] = color.g;  // g
                data[index + 2] = color.b;  // b
                data[index + 3] = 255;      // a
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    Render(): React.JSX.Element {
        return (
            <canvas id={this.id} width="100%" height="100%"/>
        );
    }
}
