import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";
import {OptionData} from "../Options/OptionData";

export interface IDithererBase {
    Convert(optionData: OptionData): MCMapData;
}