import {ViewBase} from "./ViewBase";
import React from "react";
import {DropdownComponent} from "./Components/DropdownComponent";

export namespace ViewInputParamIds{
    export const convertModeDropdownId : string = "convertModeDropdown";
}

export class ViewInputParams extends ViewBase {
    renderSelectImageBox(): React.ReactNode {
        return <input id={"SelectImage"} type={"file"} accept={"image/*"}/>;
    }

    convertModeDropdown : DropdownComponent;

    constructor() {
        super();
        this.convertModeDropdown = this.CreateView(DropdownComponent, ViewInputParamIds.convertModeDropdownId);
    }

    Render(): React.JSX.Element {

        return (
            <>
                {this.convertModeDropdown.Render()}
                {this.renderSelectImageBox()}
            </>
        );
    }
}