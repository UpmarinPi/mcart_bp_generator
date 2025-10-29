import {ThresholdDitherer} from "../ThresholdDitherer";
import {RGBColor} from "../../Cores/Color";
import * as Comlink from "comlink";
import type {FindColor} from './OrderedDitherWorker';

export abstract class OrderedDithererBase extends ThresholdDitherer {
    // width, height, threshold map
    GetThresholdMap(): [number, number, number[][]] {
        return [
            1, 1,
            [
                [0],
            ]
        ];
    }

    override async GetNearestColorId(cords: [number, number], baseColor: RGBColor, colorList: RGBColor[]): Promise<number> {
        const FindColorClass
            = Comlink.wrap<typeof FindColor>(new Worker(new URL("./OrderedDitherWorker.ts", import.meta.url), {type: "module",}));

        const FindColorInstance = await new FindColorClass();
        const BestApproxPair = await FindColorInstance.FindBestApprox(baseColor, colorList);

        if (BestApproxPair.type === "pair") {
            return this.SelectNumByOrderedDither(cords, [BestApproxPair.i, BestApproxPair.j], [BestApproxPair.dist_i, BestApproxPair.dist_j]);
        }
        return BestApproxPair.i;
    }

    private SelectNumByOrderedDither(cords: [number, number], selections: [number, number], distances: [number, number]): number {
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
}
