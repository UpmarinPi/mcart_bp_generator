import React from "react";
import {ComponentBase} from "./ComponentBase";

interface Option {
    value: string;
    label: string;
}

export function ConstObjectToOption<T extends Record<string, string>>(obj: T): Option[] {
    return Object.values(obj).map((v) => ({value: v, label: v}));
}

export class DropdownComponent extends ComponentBase {

    constructor(id: string = "", options: Option[] = []) {
        super(id);
        this.options = options;
    }

    // 選択候補
    private _options: Option[] = [];
    set options(value: Option[]) {
        this._options = value;
        this.onUpdateRender.notify();
    }

    Render(): React.JSX.Element {
        return (
            <div className={this.id}>
                <select
                    onChange={
                        (event) => this.OnComponentChange(event.target.value)
                    }
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