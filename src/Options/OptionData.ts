import {ConvertModes, EDimensionalMode} from "../Cores/Types";
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
    private _convertMode : string = ConvertModes.Default;
    get convertMode(): string {
        return this._convertMode;
    }

    set convertMode(value: string) {
        this._convertMode = value;
    }

    // 明暗モード
    private _bIsDimensionalMode : boolean = false;
    get bIsDimensionalMode(): boolean {
        return this._bIsDimensionalMode;
    }

    set bIsDimensionalMode(value: boolean) {
        this._bIsDimensionalMode = value;
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
