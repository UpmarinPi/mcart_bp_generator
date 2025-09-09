import {IViewBase} from "./ViewBase";
import React from "react";
import {DropdownComponent} from "./Components/DropdownComponent";

export namespace ViewInputParamIds{
    export const convertModeDropdown : string = "convertModeDropdown";
}

export class ViewInputParams implements IViewBase {
    renderSelectImageBox(): React.ReactNode {
        return <input id={"SelectImage"} type={"file"} accept={"image/*"}/>;
    }

    convertModeDropdown : DropdownComponent = new DropdownComponent(ViewInputParamIds.convertModeDropdown);

    Render(): React.JSX.Element {

        return (
            <>
                {this.convertModeDropdown.Render()}
                {this.renderSelectImageBox()}
            </>
        );
    }
}