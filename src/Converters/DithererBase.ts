import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";

export interface IDithererBase {
    Convert(img: HTMLImageElement, colorsToUse?: RGBColor[]): MCMapData;
}