import {IViewBase} from "../ViewBase";
import React from "react";

interface Option{
    value : string;
    label : string;
}

export class DropdownComponent implements IViewBase{
    constructor(dropdownId: string, options: Option[]){
        this.dropdownId = dropdownId;
        this.options = options;
    }
    private _dropdownId : string = "";
    set dropdownId(value: string) {
        this._dropdownId = value;
    }
    private _options : Option[] = [];
    set options(value: Option[]) {
        this._options = value;
    }
    Render(): React.JSX.Element {
        return (
            <div className={this._dropdownId + "dropdown"}>
                <select>
                    {this._options.map((option: Option) => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}