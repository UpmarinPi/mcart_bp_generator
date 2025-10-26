import {DithererBase} from "./DithererBase";
import {MCMapData} from "../Outputs/MCMapData";
import {OptionData} from "../Options/OptionData";
import {RGBColor} from "../Cores/Color";

export class ThresholdDither extends DithererBase {
    override Convert(optionData: OptionData): MCMapData {
        let returnData: MCMapData = new MCMapData();

        const img = optionData.baseImage;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return returnData;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        if (!imageData) {
            return returnData;
        }

        const data = imageData?.data;
        if (!data) {
            return returnData;
        }

        let map: number[][] = [];
        let colorToMapColor: Map<number, RGBColor> = new Map();
        this.StartProgress(img.width * img.height);
        for (let y = 0; y < img.height; ++y) {
            let row: number[] = [];
            for (let x = 0; x < img.width; ++x) {
                const index = (y * img.width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const colorKey: number = this.GetNearestColorId([x, y], new RGBColor(r, g, b), optionData.usingColors);
                let color = new RGBColor();
                if (colorKey < optionData.usingColors.length) {
                    color = optionData.usingColors[colorKey];
                }

                // 色に対応する数字取得, 新規色登録
                const colorId = RGBColor.CreateColorId(color);
                const mapColor = colorToMapColor.get(colorId);
                if (!mapColor) {
                    colorToMapColor.set(colorId, color);
                }
                row.push(colorId);
                this.AddCurrentProgress();

                // 描画更新(進捗率用) なんかエラー起こるので一旦停止
                // await AsynchronousSystem.get().RequestUpdatingRender(y * img.width + x);
            }
            map.push(row);
        }

        returnData.map = map;
        returnData.width = img.width;
        returnData.height = img.height;
        returnData.mapToColor = colorToMapColor;

        return returnData;
    }

    GetNearestColorId(cords: [number, number], baseColor: RGBColor, colorList: RGBColor[]): number {
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
