import {ThresholdDither} from "../ThresholdDitherer";
import {RGBColor} from "../../Cores/Color";
import {FunctionLibrary} from "../../FunctionLibrary";

export abstract class OrderedDitherBase extends ThresholdDither {
    // width, height, threshold map
    static GetThresholdMap(): [number, number, number[][]] {
        return [
            0, 0,
            []
        ];
    }

    static override GetNearestColorId(cords: [number, number], baseColor: RGBColor, colorList: RGBColor[]): number {
        let nearsetColorNum: number = 0;
        let secondNearsetColorNum: number = 0;
        let shortestDistance: number = -1;
        let secondShortestDistance: number = -1;
        for (let i = 0; i < colorList.length; i++) {

            // lab値変換後 量子化
            const baseLabColor = FunctionLibrary.rgbToLab(baseColor);
            const toCompareColor = colorList[i];
            const ToCompareLabColor = FunctionLibrary.rgbToLab(toCompareColor);
            const colorBuff = 1; // 3種の数値の中で優位性を持たせるための乗算
            baseLabColor[0] *= colorBuff;
            ToCompareLabColor[0] *= colorBuff;

            const distance = this.GetTwoColorDistance(baseColor, toCompareColor);


            if (secondShortestDistance == -1 || distance < secondShortestDistance) {
                if (shortestDistance == -1 || distance < shortestDistance) {
                    secondShortestDistance = shortestDistance; // 2番目更新
                    secondNearsetColorNum = nearsetColorNum;

                    shortestDistance = distance; // 現状最も近い色
                    nearsetColorNum = i;
                } else {
                    secondShortestDistance = distance; // 現状2番目に近い色
                    secondNearsetColorNum = i;
                }

            }
        }
        return this.SelectNumByOrderedDither(cords, [nearsetColorNum, secondNearsetColorNum], [shortestDistance, secondShortestDistance]);
    }

    private static SelectNumByOrderedDither(cords: [number, number], selections: [number, number], distances: [number, number]): number {
        const [x, y] = cords;
        const [shorterNum, longerNum] = selections;
        const [shorterDistance, longerDistance] = distances;
        if ((shorterDistance + longerDistance) <= 0) {
            return shorterNum;
        }

        const [layerWidth, layerHeight, layer] = this.GetThresholdMap();
        if (layerHeight <= 0 || layerWidth <= 0) {
            return shorterNum;
        }
        const layerSize = layerWidth * layerHeight;
        const layerIndex = layer[y % layerHeight][x % layerWidth];

        if (shorterDistance / (shorterDistance + longerDistance) < layerIndex / layerSize) {
            return shorterNum;
        }

        return longerNum;
    }

    private static GetTwoColorDistance(rgb1: RGBColor, rgb2: RGBColor): number {
        const [L1, a1, b1] = FunctionLibrary.rgbToLab(rgb1);
        const [L2, a2, b2] = FunctionLibrary.rgbToLab(rgb2);

        const avgLp = (L1 + L2) / 2.0;
        const C1 = Math.sqrt(a1 * a1 + b1 * b1);
        const C2 = Math.sqrt(a2 * a2 + b2 * b2);
        const avgC = (C1 + C2) / 2.0;

        const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7.0) / (Math.pow(avgC, 7.0) + Math.pow(25.0, 7.0))));
        const a1p = (1 + G) * a1;
        const a2p = (1 + G) * a2;
        const C1p = Math.sqrt(a1p * a1p + b1 * b1);
        const C2p = Math.sqrt(a2p * a2p + b2 * b2);

        const avgCp = (C1p + C2p) / 2.0;
        const h1p = Math.atan2(b1, a1p) * 180 / Math.PI + (Math.atan2(b1, a1p) < 0 ? 360 : 0);
        const h2p = Math.atan2(b2, a2p) * 180 / Math.PI + (Math.atan2(b2, a2p) < 0 ? 360 : 0);

        let dhp = h2p - h1p;
        if (Math.abs(dhp) > 180) dhp -= Math.sign(dhp) * 360;
        const dLp = L2 - L1;
        const dCp = C2p - C1p;
        const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI / 180) / 2);

        const avgHp = Math.abs(h1p - h2p) > 180
            ? (h1p + h2p + 360) / 2
            : (h1p + h2p) / 2;

        const T =
            1 -
            0.17 * Math.cos((avgHp - 30) * Math.PI / 180) +
            0.24 * Math.cos((2 * avgHp) * Math.PI / 180) +
            0.32 * Math.cos((3 * avgHp + 6) * Math.PI / 180) -
            0.20 * Math.cos((4 * avgHp - 63) * Math.PI / 180);

        const SL = 1 + (0.015 * Math.pow(avgLp - 50, 2)) / Math.sqrt(20 + Math.pow(avgLp - 50, 2));
        const SC = 1 + 0.045 * avgCp;
        const SH = 1 + 0.015 * avgCp * T;
        const RT = -2 * Math.sqrt(Math.pow(avgCp, 7.0) / (Math.pow(avgCp, 7.0) + Math.pow(25.0, 7.0))) *
            Math.sin((60 * Math.exp(-Math.pow((avgHp - 275) / 25, 2))) * Math.PI / 180);

        return Math.sqrt(
            Math.pow(dLp / SL, 2) +
            Math.pow(dCp / SC, 2) +
            Math.pow(dHp / SH, 2) +
            RT * (dCp / SC) * (dHp / SH)
        );
    }

    private static GetTwoColorByRGB(rgb1: RGBColor, rgb2: RGBColor): number {
        return (rgb1.r - rgb2.r) * (rgb1.r - rgb2.r)
            + (rgb1.g - rgb2.g) * (rgb1.g - rgb2.g)
            + (rgb1.b - rgb2.b) * (rgb1.b - rgb2.b);
    }

    // lab色を基に距離を計算
    private static GetTwoColorByLab(rgb1: RGBColor, rgb2: RGBColor) {
        // lab値変換後 量子化
        const lab1 = FunctionLibrary.rgbToLab(rgb1);
        const lab2 = FunctionLibrary.rgbToLab(rgb2);
        const colorBuff = 1; // 3種の数値の中で優位性を持たせるための乗算
        lab1[0] *= colorBuff;
        lab2[0] *= colorBuff;
        return (lab1[0] - lab2[0]) * (lab1[0] - lab2[0])
            + (lab1[1] - lab2[1]) * (lab1[1] - lab2[1])
            + (lab1[2] - lab2[2]) * (lab1[2] - lab2[2]);
    }
}
