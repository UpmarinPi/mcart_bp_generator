import {Singleton} from "../Cores/Singleton";
import {OptionData} from "./OptionData";
import {ObserverSubject} from "../Cores/Observer";

export class OptionManager extends Singleton {
    optionData : OptionData = new OptionData();

    constructor() {
        super();
        this.onOptionChange = new ObserverSubject<OptionData>();
    }

    SetImage(img : HTMLImageElement) : void {
        this.optionData.img = img;
        console.debug("Set image");
        this.onOptionChange.notify(this.optionData);
    }

    SetConvertMode(value: string) : void {
        this.optionData.convertMode = value;
        console.debug("Set convert mode to " + value);
        this.onOptionChange.notify(this.optionData);
    }

    // observer
    onOptionChange : ObserverSubject<OptionData>;
}