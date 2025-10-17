import React from "react";
import {ComponentBase} from "./ComponentBase";

interface IOption {
    value: string;
    label: string;
}

export function ConstObjectToOption<T extends Record<string, string>>(obj: T): IOption[] {
    return Object.values(obj).map((v) => ({value: v, label: v}));
}

export function StringListToOption(list: string[]): IOption[]{
    return Object.values(list).map((v) => ({value: v, label: v}));
}

export class DropdownComponent extends ComponentBase {

    constructor(id: string = "", options: IOption[] = []) {
        super(id);
        this.options = options;
    }

    // 選択候補
    private _options: IOption[] = [];
    set options(value: IOption[]) {
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
                    {this._options.map((option: IOption) => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}