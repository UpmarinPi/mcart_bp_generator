import {IViewBase} from "../ViewBase";
import React from "react";

interface Option{
    value : string;
    label : string;
}

export class DropdownComponent implements IViewBase{

    constructor(dropdownId: string = "", options: Option[] = []){
        this.dropdownId = dropdownId;
        this.options = options;
    }

    // ドロップダウン
    private _dropdownId : string = "";
    set dropdownId(value: string) {
        this._dropdownId = value;
    }

    // 選択候補
    private _options : Option[] = [];
    set options(value: Option[]) {
        this._options = value;
    }

    // on change
    private _changeHandler = (value: string) => {};
    set changeHandler(value: (value: string) => void) {
        this._changeHandler = value;
    }

    Render(): React.JSX.Element {
        return (
            <div className={this._dropdownId}>
                <select
                    onChange={(event) => this._changeHandler(event.target.value)}
                >
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