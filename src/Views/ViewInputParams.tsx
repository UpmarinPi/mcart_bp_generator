import {IViewBase} from "./ViewBase";
import React, {JSX} from "react";

export class ViewInputParams implements IViewBase {
    renderSelectImageBox(): React.ReactNode {
        return <input id={"SelectImage"} type={"file"} accept={"image/*"}/>;
    }

    Render(): React.JSX.Element {
        return (
            <>
                {this.renderSelectImageBox()}
            </>
        );
    }
}