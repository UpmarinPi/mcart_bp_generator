import {IDithererBase} from "./DithererBase";
import {MCMapData} from "../Outputs/MCMapData";
import {OptionData} from "../Options/OptionData";

export class ThresholdDither implements IDithererBase {
    Convert(optionData: OptionData): MCMapData {
        return new MCMapData();
    }
}