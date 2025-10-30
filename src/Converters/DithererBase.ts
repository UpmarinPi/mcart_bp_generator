import {MCMapData} from "../Outputs/MCMapData";
import {OptionData} from "../Options/OptionData";
import {ObserverSubject} from "../Cores/Observer";
import {wrap} from 'comlink';

export abstract class DithererBase {
    protected get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private readonly _canvas: HTMLCanvasElement;
    async Convert(optionData: OptionData): Promise<MCMapData> {
        return new MCMapData();
    }

    constructor() {
        this.onCurrentProgressChange = new ObserverSubject();
        this.onMaxProgressChange = new ObserverSubject();
        this._canvas = document.createElement('canvas');
    }

    private _currentProgress: number = 0;
    public get currentProgress(): number {
        return this._currentProgress;
    }

    private set currentProgress(value: number) {
        this._currentProgress = value;

    }

    private _maxProgress: number = 0;
    public get maxProgress(): number {
        return this._maxProgress;
    }

    private set maxProgress(value: number) {
        this._maxProgress = value;
    }

    protected StartProgress(maxProgress: number = 1) {
        this.maxProgress = maxProgress;
        this.currentProgress = 0;
        this.onCurrentProgressChange.notify(this.currentProgress);
        this.onMaxProgressChange.notify(this.maxProgress);
    }

    //
    protected AddCurrentProgress(addedProgress: number = 1) {
        this.currentProgress += addedProgress;
        this.onCurrentProgressChange.notify(this.currentProgress);
    }

    onCurrentProgressChange: ObserverSubject<number>;
    onMaxProgressChange: ObserverSubject<number>;


}
