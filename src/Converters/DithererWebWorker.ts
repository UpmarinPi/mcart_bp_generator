import {DithererBase} from "./DithererBase";
import {expose} from 'comlink';
import {OptionData} from "../Options/OptionData";
import {MCMapData} from "../Outputs/MCMapData";

function Convert(ditherSystem: DithererBase, optionData: OptionData): MCMapData {
    return ditherSystem.Convert(optionData);
}


expose(Convert);
