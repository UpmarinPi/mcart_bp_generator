import {ViewInputParams} from "../Views/ViewInputParams";

export class InputParamsController {
    viewInputParams : ViewInputParams = new ViewInputParams();

    OnInputParamChange(value: string) : void {

    }
    constructor(){
        this.viewInputParams.convertModeDropdown.options =
            [
                {value: "Default", label: "Default"},
            ];
        this.viewInputParams.convertModeDropdown.changeHandler = (value: string)=>{
            this.OnInputParamChange(value);
        }
    }
}