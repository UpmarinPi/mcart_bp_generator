import {ViewInputParams} from "../Views/ViewInputParams";
import {ControllerBase} from "./ControllerBase";

export class InputParamsController extends ControllerBase{
    viewInputParams : ViewInputParams = new ViewInputParams();

    OnInputParamChange(value: string) : void {

    }
    constructor(){
        super();
        this.viewInputParams.convertModeDropdown.options =
            [
                {value: "Default", label: "Default"},
            ];
        this.viewInputParams.convertModeDropdown.changeHandler = (value: string)=>{
            this.OnInputParamChange(value);
        }
    }
}