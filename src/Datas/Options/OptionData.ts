import {ConvertModes, EDimensionalMode} from "../../Cores/Types";
import {RGBColor} from "../../Cores/Color";

export class OptionData {
    // 元画像
    baseImage : ImageData = new ImageData(1,1);

    // 変換モード
    convertMode : string = ConvertModes.Default;

    // 明暗モード
    bIsDimensionalMode : boolean = false;

    // 使用する色群
    usingColors : RGBColor[] = [];

    // 使用するブロック群
    usingBlocks : string[] = [];

    // その他パラメータ
    params : any = 1;

}
