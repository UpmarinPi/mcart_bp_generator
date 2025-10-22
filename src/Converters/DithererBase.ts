import {MCMapData} from "../Outputs/MCMapData";
import {RGBColor} from "../Cores/Color";
import {OptionData} from "../Options/OptionData";

export class DithererBase {
    static async Convert(optionData: OptionData): Promise<MCMapData>{
        return new MCMapData();
    }
}
