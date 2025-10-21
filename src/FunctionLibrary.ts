import {RGBColor} from "./Cores/Color";

export class FunctionLibrary {
    static ReverseMap(toReverseMap: Map<any, any>): Map<any, any> {
        return Object.fromEntries(Object.entries(toReverseMap).map(a => a.reverse()));
    }

    // sRGB → CIE Lab 変換
// 入力: RGB値（0–255）
// 出力: L*, a*, b* （数値）

    static rgbToLab(color: RGBColor): [number, number, number] {
        let [r,g,b] = [color.r, color.g, color.b];
        // 0–1 に正規化
        r /= 255;
        g /= 255;
        b /= 255;

        // ガンマ補正（sRGB → 線形RGB）
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        // RGB → XYZ 変換（D65参照白）
        const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
        const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
        const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

        // XYZ → Lab 変換
        const f = (t: number) =>
            t > 0.008856 ? Math.cbrt(t) : (t * 903.3 + 16) / 116;

        const fx = f(x);
        const fy = f(y);
        const fz = f(z);

        const L = 116 * fy - 16;
        const a = 500 * (fx - fy);
        const bVal = 200 * (fy - fz);

        return [L, a, bVal];
    }
}
