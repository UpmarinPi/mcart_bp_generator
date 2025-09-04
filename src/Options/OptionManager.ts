import {Singleton} from "../Cores/Singleton";
import {OptionData} from "./OptionData";

class OptionManager extends Singleton {
    optionData : OptionData = new OptionData();

    SetImage(img : HTMLImageElement) : void {
        this.optionData.img = img;
    }
}