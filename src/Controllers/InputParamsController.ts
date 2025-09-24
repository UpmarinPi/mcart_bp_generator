import {ViewInputParams} from "../Views/ViewInputParams";
import {ControllerBase} from "./ControllerBase";
import {ConstObjectToOption} from "../Views/Components/DropdownComponent";
import {ConvertModes} from "../Cores/Types";

export class InputParamsController extends ControllerBase{

    OnInputParamChange(value: string) : void {
        console.log(value);
    }
    constructor(viewInputParams: ViewInputParams) {
        super();
        if(!viewInputParams) {
            console.error("ViewInputParams must be defined");
            return;
        }
        viewInputParams.convertModeDropdown.options = ConstObjectToOption(ConvertModes);
        viewInputParams.convertModeDropdown.changeHandler = (value: string)=>{
            this.OnInputParamChange(value);
        }
    }
}