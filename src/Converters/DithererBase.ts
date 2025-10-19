import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";
import {OptionData} from "../Options/OptionData";

export class DithererBase {
    static Convert(optionData: OptionData): MCMapData{
        return new MCMapData();
    }
}
