import {ThresholdDither} from "../ThresholdDitherer";
import {RGBColor} from "../../Cores/Color";
import {addScaled, dot, FunctionLibrary, labDistSq, norm2, sub} from "../../FunctionLibrary";

export abstract class OrderedDitherBase extends ThresholdDither {
    // width, height, threshold map
    GetThresholdMap(): [number, number, number[][]] {
        return [
            0, 0,
            []
        ];
    }

    override async GetNearestColorId(cords: [number, number], baseColor: RGBColor, colorList: RGBColor[]): Promise<number> {
        let nearsetColorNum: number = 0;
        let secondNearsetColorNum: number = 0;
        let shortestDistance: number = -1;
        let secondShortestDistance: number = -1;
        const BestApproxPair = await this.FindBestApprox(baseColor, colorList);
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

    // 単に近い二色ではなく、ある程度近い色から、市松模様にしたときに最も色が近くなる組み合わせを取得
    async FindBestApprox(target: RGBColor, paletteColor: RGBColor[], kNearest = 12) {
        const targetLab = FunctionLibrary.rgbToLab(target);
        // 1) まず単色での最近傍を kNearest 個取得（ここは線形走査だが k-d tree 等で加速）
        const dists = paletteColor.map((p, i) => ({
            i, d: labDistSq(targetLab, FunctionLibrary.rgbToLab(p))
        }));
        dists.sort((a, b) => a.d - b.d);
        const nearest = dists.slice(0, Math.min(kNearest, dists.length)).map(x => x.i);

        // 2) 単色候補（最良）
        let best = {
            type: 'single',
            i: nearest[0],
            j: -1,
            alpha: 1,
            dist: dists[0].d,
            dist_i: dists[0].d,
            dist_j: Infinity,
        };

        // 3) 近傍同士のペアを試す（O(k^2)）
        for (let a = 0; a < nearest.length; a++) {
            const i = nearest[a];
            for (let b = a + 1; b < nearest.length; b++) {
                const j = nearest[b];
                const c1 = FunctionLibrary.rgbToLab(paletteColor[i]), c2 = FunctionLibrary.rgbToLab(paletteColor[j]);
                const diff = sub(c1, c2);
                const denom = norm2(diff);

                if (denom < 1e-6) { // ほぼ同色
                    continue;
                }

                // closed-form alpha*
                const alphaStar = dot(sub(targetLab, c2), diff) / denom;
                const alpha = Math.max(0, Math.min(1, alphaStar));
                const mix = addScaled(c1, c2, alpha);
                const d = labDistSq(targetLab, mix);

                if (d < best.dist) {
                    best = {
                        type: 'pair',
                        i,
                        j,
                        alpha,
                        dist: d,
                        dist_i: labDistSq(targetLab, c1),
                        dist_j: labDistSq(targetLab, c2),
                    };
                }
            }
        }
        return best;
    }

    //////////////// 以下 色取得方法 過去に使用していた履歴

    // 二色の距離をlab値から変換
    private static async GetTwoColorDistance(rgb1: RGBColor, rgb2: RGBColor): Promise<number> {
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

    // 単純な座標変換による距離取得
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
