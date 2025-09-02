import {IDithererBase} from "./DithererBase";
import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";

export class ThresholdDither implements IDithererBase {
    Convert(img: HTMLImageElement, colorsToUse: RGBColor[]): MCMapData {
        return new MCMapData();
    }
}