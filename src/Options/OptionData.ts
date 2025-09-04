import {EConvertMode, EDimensionalMode} from "../Cores/Types";
import {RGBColor} from "../Cores/Color";

export class OptionData {
    // 元画像
    private _img : HTMLImageElement = new Image();
    get img(): HTMLImageElement {
        return this._img;
    }

    set img(value: HTMLImageElement) {
        this._img = value;
    }

    // 変換モード
    private _convertMode : EConvertMode = 0;
    get convertMode(): EConvertMode {
        return this._convertMode;
    }

    set convertMode(value: EConvertMode) {
        this._convertMode = value;
    }

    // 明暗モード
    private _dimensionalMode : EDimensionalMode = 0;
    get dimensionalMode(): EDimensionalMode {
        return this._dimensionalMode;
    }

    set dimensionalMode(value: EDimensionalMode) {
        this._dimensionalMode = value;
    }

    // 使用する色群
    private _usingColors : RGBColor[] = [];
    get usingColors(): RGBColor[] {
        return this._usingColors;
    }

    set usingColors(value: RGBColor[]) {
        this._usingColors = value;
    }

    // 使用するブロック群
    private _usingBlocks : string[] = [];
    get usingBlocks(): string[] {
        return this._usingBlocks;
    }

    set usingBlocks(value: string[]) {
        this._usingBlocks = value;
    }

    // その他パラメータ
    private _params : any = 1;
    get params(): any {
        return this._params;
    }

    set params(value: any) {
        this._params = value;
    }

}
