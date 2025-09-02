import {EDimensionalMode} from "../Cores/Types";
import {FunctionLibrary} from "../FunctionLibrary";
import {RGBColor} from "../Cores/Color";

export class MCMapData {
    dimensionalMode: EDimensionalMode = EDimensionalMode.Flat;
    width: number = 0;
    height: number = 0;
    map: number[][] = [];
    dimensionalMap: number[][] = [];
    mapToColor: Map<number, RGBColor> = new Map();
    mapToBlock: Map<number, string> = new Map();

    public ConvertImgToMCMapData(img: HTMLImageElement, mapToColor: Map<number, RGBColor>): MCMapData {

        const colorToMap: Map<RGBColor, number> = FunctionLibrary.ReverseMap(mapToColor);

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
        for (let y = 0; y < img.height; ++y) {
            let row: number[] = [];
            for (let x = 0; x < img.width; ++x) {
                const index = (y * img.width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const Color = new RGBColor(r, g, b);
                const colorToInt = colorToMap.get(Color);

                if (colorToInt) {
                    row.push(colorToInt);
                }
                else{
                    // 引数mapToColorに該当色がない
                    row.push(-1);

                }
            }
            map.push(row);
        }
        ReturnData.map = map;
        ReturnData.width = img.width;
        ReturnData.height = img.height;
        ReturnData.mapToColor = mapToColor;

        return ReturnData;
    }
}