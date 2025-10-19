import {DithererBase} from "./DithererBase";
import {OptionData} from "../Options/OptionData";
import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";
import {FunctionLibrary} from "../FunctionLibrary";

export class RawDitherer extends DithererBase {
    static Convert(optionData: OptionData): MCMapData {
        return this.ConvertImgToMCMapData(optionData.baseImage);
    }

    private static ConvertImgToMCMapData(img: HTMLImageElement): MCMapData {
        let ReturnData: MCMapData = new MCMapData();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return ReturnData;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        if (!imageData) {
            return ReturnData;
        }

        const data = imageData?.data;
        if (!data) {
            return ReturnData;
        }
        let map: number[][] = [];

        let colorToMapColor: Map<number, RGBColor> = new Map();
        for (let y = 0; y < img.height; ++y) {
            let row: number[] = [];
            for (let x = 0; x < img.width; ++x) {
                const index = (y * img.width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const color = new RGBColor(r, g, b);

                // 色に対応する数字取得, 新規色登録
                const colorId = RGBColor.CreateColorId(color);
                const mapColor = colorToMapColor.get(colorId);
                if (!mapColor) {
                    colorToMapColor.set(colorId, color);
                }
                row.push(colorId);
            }
            map.push(row);
        }
        ReturnData.map = map;
        ReturnData.width = img.width;
        ReturnData.height = img.height;
        ReturnData.mapToColor = FunctionLibrary.ReverseMap(colorToMapColor);

        return ReturnData;
    }
}
