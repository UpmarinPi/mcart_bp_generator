import {MCMapData} from "../Datas/MapData/MCMapData";
import {OptionData} from "../Datas/Options/OptionData";
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
        this.onProgressChange = new ObserverSubject();
        this._canvas = document.createElement('canvas');
    }

    //
    protected SetCurrentProgress(currentProgress: number, maxProgress: number) {
        this.onProgressChange.notify([currentProgress, maxProgress]);
    }

    onProgressChange: ObserverSubject<[number, number]>;

}
