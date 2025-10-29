import {DithererBase} from "./DithererBase";
import {MCMapData} from "../Outputs/MCMapData";
import {OptionData} from "../Options/OptionData";
import {RGBColor} from "../Cores/Color";
import * as Comlink from "comlink";
import type {ThresholdDithererWorker} from "./ThresholdDithererWorker";
import {GetCanvas} from "../FunctionLIbraries/FunctionLibrary";

export class ThresholdDitherer extends DithererBase {
    override async Convert(optionData: OptionData): Promise<MCMapData> {
        const img = optionData.baseImage;
        const canvas = GetCanvas();
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return new MCMapData();
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.putImageData(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        if (!imageData) {
            return new MCMapData();
        }

        const data = imageData?.data;
        if (!data) {
            return new MCMapData();
        }

        const ThresholdDithererWorkerClass
            = Comlink.wrap<typeof ThresholdDithererWorker>(new Worker(new URL("./ThresholdDithererWorker.ts", import.meta.url), {type: "module",}));

        const ThresholdDithererWorkerInstance = await new ThresholdDithererWorkerClass();
        return await ThresholdDithererWorkerInstance.Convert(optionData, img.width, img.height, data, Comlink.proxy(this.GetNearestColorId));
    }

    async GetNearestColorId(cords: [number, number], baseColor: RGBColor, colorList: RGBColor[]): Promise<number> {
        let nearsetColorNum: number = 0;
        let shortestDistance: number = -1;
        for (let i = 0; i < colorList.length; i++) {
            const color = colorList[i];
            const distance = (baseColor.r - color.r) * (baseColor.r - color.r)
                + (baseColor.g - color.g) * (baseColor.g - color.g)
                + (baseColor.b - color.b) * (baseColor.b - color.b);

            if (shortestDistance === -1 || distance < shortestDistance) {
                shortestDistance = distance;
                nearsetColorNum = i;
            }
        }

        return nearsetColorNum;
    }
}
