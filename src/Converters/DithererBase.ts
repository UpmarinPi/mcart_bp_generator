import {MCMapData} from "../Outputs/MCMapData";
import {OptionData} from "../Options/OptionData";
import {ObserverSubject} from "../Cores/Observer";
import {wrap} from 'comlink';

export abstract class DithererBase {
    Convert(optionData: OptionData): MCMapData {
        return new MCMapData();
    }

    async RequestConvert(optionData: OptionData, onFinished: (mapData: MCMapData) => void) {
        const DithererWebWorker  = wrap(new Worker(new URL('./DithererWebWorker.ts', import.meta.url), {type: 'module'}));
        // const result = await DithererWebWorker.Convert(this.Convert, optionData);
        // return result;
    }

    constructor() {
        this.onCurrentProgressChange = new ObserverSubject();
        this.onMaxProgressChange = new ObserverSubject();
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
